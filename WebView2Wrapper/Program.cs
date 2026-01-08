using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;
using System.Diagnostics;
using WebView2Control = Microsoft.Web.WebView2.WinForms.WebView2;

namespace KanbanLite.WebView2;

static class Program
{
    [STAThread]
    static void Main()
    {
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);
        Application.SetHighDpiMode(HighDpiMode.SystemAware);

        var mainWindow = new MainForm();
        Application.Run(mainWindow);
    }
}

public class MainForm : Form
{
    private WebView2Control? webView;
    private readonly string _contentPath;
    private Panel? _loadingPanel;
    private ProgressBar? _progressBar;
    private Label? _loadingLabel;

    public MainForm()
    {
        Text = "KanbanLite";
        Width = 1280;
        Height = 800;
        MinimumSize = new Size(800, 600);
        StartPosition = FormStartPosition.CenterScreen;
        BackColor = Color.White;

        _contentPath = GetContentPath();

        InitializeLoadingPanel();
        InitializeWebView();
    }

    private void InitializeLoadingPanel()
    {
        _loadingPanel = new Panel
        {
            Dock = DockStyle.Fill,
            BackColor = Color.White
        };

        var centerPanel = new Panel
        {
            Size = new Size(300, 150),
            BackColor = Color.White
        };

        _loadingLabel = new Label
        {
            Text = "正在加载 KanbanLite...",
            Font = new Font("Microsoft YaHei UI", 14, FontStyle.Bold),
            ForeColor = Color.FromArgb(60, 60, 60),
            TextAlign = ContentAlignment.MiddleCenter,
            Size = new Size(300, 40),
            Location = new Point(0, 0)
        };

        _progressBar = new ProgressBar
        {
            Style = ProgressBarStyle.Marquee,
            Size = new Size(250, 8),
            Location = new Point(25, 50),
            MarqueeAnimationSpeed = 30
        };

        centerPanel.Controls.Add(_loadingLabel);
        centerPanel.Controls.Add(_progressBar);
        centerPanel.Location = new Point(
            (Width - centerPanel.Width) / 2,
            (Height - centerPanel.Height) / 2
        );

        _loadingPanel.Controls.Add(centerPanel);
        Controls.Add(_loadingPanel);
    }

    private string GetContentPath()
    {
        var baseDir = AppDomain.CurrentDomain.BaseDirectory;
        var contentPath = Path.Combine(baseDir, "wwwroot");

        if (!Directory.Exists(contentPath))
        {
            MessageBox.Show(
                $"Content folder not found: {contentPath}\nPlease run 'npm run build' first.",
                "Error",
                MessageBoxButtons.OK,
                MessageBoxIcon.Error
            );
            Application.Exit();
        }

        return contentPath;
    }

    private async void InitializeWebView()
    {
        webView = new WebView2Control
        {
            Dock = DockStyle.Fill,
            DefaultBackgroundColor = Color.Transparent
        };

        Controls.Add(webView);

        try
        {
            var environment = await CoreWebView2Environment.CreateAsync(null);

            await webView.EnsureCoreWebView2Async(environment);

            ConfigureWebView();

            webView.CoreWebView2.SetVirtualHostNameToFolderMapping(
                "app.local",
                _contentPath,
                CoreWebView2HostResourceAccessKind.Allow
            );

            webView.Source = new Uri("https://app.local/index.html");
        }
        catch (Exception ex)
        {
            MessageBox.Show(
                $"Failed to initialize WebView2: {ex.Message}",
                "Error",
                MessageBoxButtons.OK,
                MessageBoxIcon.Error
            );
            Application.Exit();
        }
    }

    private void ConfigureWebView()
    {
        if (webView?.CoreWebView2 == null) return;

        webView.CoreWebView2.Settings.AreDefaultContextMenusEnabled = true;
        webView.CoreWebView2.Settings.AreDevToolsEnabled = true;
        webView.CoreWebView2.Settings.AreHostObjectsAllowed = true;
        webView.CoreWebView2.Settings.IsZoomControlEnabled = true;

        webView.CoreWebView2.NavigationCompleted += (sender, args) =>
        {
            if (args.IsSuccess)
            {
                Console.WriteLine($"Navigation completed: {webView.CoreWebView2.Source}");
                HideLoadingPanel();
            }
        };

        webView.CoreWebView2.WebMessageReceived += (sender, args) =>
        {
            var message = args.TryGetWebMessageAsString();
            Console.WriteLine($"Web message received: {message}");
        };
    }

    private void HideLoadingPanel()
    {
        if (_loadingPanel != null && !_loadingPanel.IsDisposed)
        {
            _loadingPanel.BeginInvoke(() =>
            {
                _loadingPanel.Visible = false;
                _loadingPanel.Dispose();
            });
        }
    }

    protected override void OnResize(EventArgs e)
    {
        base.OnResize(e);
        Text = $"KanbanLite - {Width}x{Height}";
    }

    protected override void OnFormClosing(FormClosingEventArgs e)
    {
        webView?.Dispose();
        base.OnFormClosing(e);
    }
}
