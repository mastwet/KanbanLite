<div align="center">
  <h1>
    <img width="1249" height="348" alt="image" src="https://github.com/user-attachments/assets/c5059fda-068c-4ae8-8f71-1f58a478b6c8" />
    <br />
    <strong>KanbanLite</strong>
  </h1>
  
  <p>
    <strong>A Lightweight, Modern Kanban System</strong>
    <br />
    <em>Simple & Efficient · Ready to Use · Available Everywhere</em>
  </p>
  
  <p>
    <a href="#features">✨ Features</a> •
    <a href="#quick-start">🚀 Quick Start</a> •
    <a href="#screenshot">📸 Screenshots</a> •
    <a href="#desktop-app">💻 Desktop App</a> •
    <a href="#license">📄 License</a> •
    <a href="README_ZH.md">🇨🇳 中文文档</a>
  </p>
  
  <div>
    <a href="https://github.com/yourusername/kanbanlite/stargazers">
      <img src="https://img.shields.io/github/stars/yourusername/kanbanlite?style=social" alt="GitHub Stars" />
    </a>
    <a href="https://github.com/yourusername/kanbanlite/forks">
      <img src="https://img.shields.io/github/forks/yourusername/kanbanlite?style=social" alt="GitHub Forks" />
    </a>
    <a href="https://github.com/yourusername/kanbanlite/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/yourusername/kanbanlite" alt="License" />
    </a>
    <a href="https://github.com/yourusername/kanbanlite/releases">
      <img src="https://img.shields.io/github/v/release/yourusername/kanbanlite" alt="Release" />
    </a>
  </div>
</div>

---

## 🌟 About KanbanLite

**KanbanLite** is an ultra-lightweight kanban board management system, designed for developers who pursue efficiency and simplicity. No complex configurations, no tedious setup - just open and use.

### 💡 Why Choose KanbanLite?

- 🎯 **Extremely Lightweight** - No database needed, zero configuration startup
- ⚡ **Blazing Fast** - Built with React + Vite, instant loading and response
- 📦 **Ready to Use** - No registration, no login required, start immediately
- 💾 **Local Storage** - All data saved locally in browser, privacy guaranteed
- 🌍 **Multi-language Support** - Built-in i18n, easy language switching
- 🎨 **Modern Design** - Beautiful UI with smooth animations
- 🖱️ **Drag & Drop** - Intuitive drag-and-drop experience
- 💻 **Desktop App** - Packable as a Windows desktop application

### 🎯 Use Cases

- Personal task management
- Small team collaboration
- Project progress tracking
- Study plan organization
- Creative idea collection

---

## ✨ Features

### Core Features
- ✅ **Multiple Boards** - Create and manage multiple independent kanban boards
- ✅ **Custom Lists** - Freely add, edit, and delete board lists
- ✅ **Task Cards** - Create task cards with title and description
- ✅ **Drag & Drop** - Move cards between lists via drag and drop
- ✅ **Auto Save** - All changes automatically saved to local storage
- ✅ **Multi-language** - Support for Chinese, English, and more

### User Experience
- 🎨 **Modern Interface** - Clean and beautiful UI design
- 📱 **Responsive Layout** - Perfect adaptation to various screen sizes
- 🌙 **Comfortable Colors** - Eye-friendly color scheme
- ✨ **Smooth Animations** - Silky smooth transition effects
- ⌨️ **Keyboard Shortcuts** - Efficient keyboard operation support

### Technical Features
- ⚡ **Vite Powered** - Extremely fast development experience and build speed
- 🔧 **TypeScript** - Type safe, fewer errors
- 🎯 **React 19** - Latest React features
- 📦 **Zero Dependencies** - Only depends on necessary React and Lucide Icons
- 🚀 **Lightweight** - Small and refined build output

---

## 🚀 Quick Start

### Online Preview

Visit the [Online Demo](https://your-demo-url.com) to experience the full features.

### Local Development

**Prerequisites:**

- Node.js >= 18.0.0

**Installation Steps:**

1. Clone the repository
```bash
git clone https://github.com/yourusername/kanbanlite.git
cd kanbanlite
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open browser and visit `http://localhost:5173`

That's it! 🎉

### Build for Production

```bash
npm run build
```

Build output will be in the `dist` directory.

---

## 📸 Screenshots

<div align="center">
  <img width="2240" height="1328" alt="QQ_1767899382858" src="https://github.com/user-attachments/assets/6f87769a-bbd6-4452-a3c5-5d938c2c28c1" />
  <p><em>Main Interface - Simple and Efficient Kanban Management</em></p>
</div>

---

## 💻 Desktop Application

KanbanLite supports packaging as a Windows desktop application using Microsoft WebView2 technology.

### Build Desktop App

**Prerequisites:**

- .NET 8.0 SDK
- WebView2 Runtime (Windows 11 includes it by default)

### Build Steps

1. Build frontend application
```bash
npm run build
```

2. Build desktop application
```bash
npm run build:webview2
```

Or use the batch file:
```bash
build-webview2.bat
```

3. Run desktop application
```bash
cd publish
.\KanbanLite.exe
```

### Desktop App Features

- 🚀 **Standalone** - Run without browser, direct execution
- 📦 **Single File Distribution** - All dependencies packaged in one executable
- 🖥️ **System Integration** - Supports window minimization, fullscreen, and other native features
- 🎨 **Native Experience** - Desktop application level user experience

For detailed documentation, see [WEBVIEW2.md](WEBVIEW2.md)

---

## 📖 Usage Guide

### Create a Board

Click the board name in the top-left corner, select "Create New Board", and enter a title to create it.

### Manage Lists

- **Add List** - Click the "Add another list" button on the right
- **Edit List** - Click the list title to edit directly
- **Delete List** - Hover over the list and click the delete icon

### Manage Task Cards

- **Add Card** - Enter a title at the bottom of the list and press Enter or click the add button
- **Edit Card** - Click the card to open the edit dialog
- **Delete Card** - Click the delete button in the edit dialog
- **Move Card** - Drag the card directly to the target list

### Keyboard Shortcuts

- `Enter` - Submit input
- `Escape` - Close dialog

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI Framework
- **TypeScript** - Type System
- **Vite** - Build Tool
- **Lucide React** - Icon Library

### Desktop App
- **.NET 8.0** - Runtime
- **WebView2** - Embedded Browser
- **WinForms** - Desktop Framework

---

## 📁 Project Structure

```
kanbanlite/
├── App.tsx                 # Main app component
├── index.tsx              # App entry point
├── components/            # Components directory
│   └── LanguageSelector.tsx
├── types/                 # Type definitions
├── i18n/                  # Internationalization config
├── WebView2Wrapper/       # Desktop app project
│   ├── Program.cs        # Main program entry
│   └── KanbanLite.WebView2.csproj
├── dist/                 # Build output
├── publish/              # Desktop app publish directory
└── package.json          # Project config
```

---

## 🤝 Contributing

Contributions, issue reports, and suggestions are welcome!

### How to Contribute

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add necessary comments
- Update relevant documentation
- Ensure all features work properly

---

## 🐛 Issue Reporting

If you find any issues or have feature suggestions, please submit them at [GitHub Issues](https://github.com/yourusername/kanbanlite/issues).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Powerful UI Framework
- [Vite](https://vitejs.dev/) - Extremely Fast Build Tool
- [Lucide](https://lucide.dev/) - Beautiful Icon Library
- [Microsoft WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) - Powerful Embedded Browser

---

<div align="center">
  <p>
    <strong>If this project helps you, please give it a ⭐️!</strong>
  </p>
  <p>
    <em>Made with ❤️ by KanbanLite Team</em>
  </p>
</div>
