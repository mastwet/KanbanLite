# KanbanLite WebView2

基于 Microsoft WebView2 的轻量级桌面应用封装。

## 前置要求

1. **.NET 8.0 SDK**
   - 下载地址: https://dotnet.microsoft.com/download/dotnet/8.0
   - 验证安装: `dotnet --version`

2. **Node.js** (已安装)
   - 项目依赖已在 package.json 中配置

3. **WebView2 Runtime**
   - Windows 11 默认已安装
   - Windows 10 可能需要安装: https://developer.microsoft.com/en-us/microsoft-edge/webview2/

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 构建应用
```bash
npm run build:webview2
```

或者使用批处理文件:
```bash
build-webview2.bat
```

### 3. 运行应用
```bash
cd publish
.\KanbanLite.exe
```

## 项目结构

```
kanbanlite/
├── WebView2Wrapper/          # C# WebView2 项目
│   ├── Program.cs           # 主程序入口
│   └── KanbanLite.WebView2.csproj  # 项目配置
├── dist/                    # React 构建输出
├── publish/                 # 最终发布目录
│   ├── KanbanLite.exe       # 可执行文件
│   └── wwwroot/            # React 应用文件
├── build-webview2.ps1      # PowerShell 构建脚本
├── build-webview2.bat      # 批处理构建脚本
└── package.json            # 项目配置
```

## 构建脚本说明

`build-webview2.ps1` 脚本会自动完成以下步骤:

1. 构建 React 应用 (`npm run build`)
2. 将构建产物复制到 `WebView2Wrapper/wwwroot/`
3. 编译 C# 项目并发布到 `publish/` 目录
4. 复制 wwwroot 到发布目录

## 开发模式

开发 React 应用时使用:
```bash
npm run dev
```

这会启动 Vite 开发服务器，支持热重载。

开发完成后运行构建命令生成桌面应用。

## 特性

- 轻量级: 仅包含必要的 WebView2 组件
- 单文件发布: 可执行文件自包含所有依赖
- 跨平台支持: 使用 .NET 8.0 (仅限 Windows)
- 开发者工具: 内置 DevTools 支持 (F12)
- 窗口可调整大小: 最小 800x600

## 常见问题

### WebView2 Runtime 未安装
如果运行时提示缺少 WebView2 Runtime, 请从以下地址下载:
https://developer.microsoft.com/en-us/microsoft-edge/webview2/

### 构建失败
确保已安装 .NET 8.0 SDK:
```bash
dotnet --version
```

### 内容文件夹未找到
确保先运行 `npm run build` 构建前端应用。

## 许可

MIT
