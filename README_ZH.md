<div align="center">
  <h1>
    <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/assets/kanban.svg" alt="KanbanLite" width="80" height="80" />
    <br />
    <strong>KanbanLite</strong>
  </h1>
  
  <p>
    <strong>一个轻量级、现代化的看板系统</strong>
    <br />
    <em>简洁高效 · 开箱即用 · 随处可用</em>
  </p>
  
  <p>
    <a href="#features">✨ 特性</a> •
    <a href="#quick-start">🚀 快速开始</a> •
    <a href="#screenshot">📸 截图</a> •
    <a href="#desktop-app">💻 桌面应用</a> •
    <a href="#license">📄 许可证</a>
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

## 🌟 关于 KanbanLite

**KanbanLite** 是一个超轻量级的看板管理系统,专为追求效率和简洁的开发者设计。没有复杂的配置,没有繁琐的设置,打开即用。

### 💡 为什么选择 KanbanLite?

- 🎯 **极致轻量** - 无需数据库,零配置启动
- ⚡ **极速响应** - 基于 React + Vite 构建,秒开秒用
- 📦 **开箱即用** - 无需注册,无需登录,立即开始
- 💾 **本地存储** - 所有数据保存在浏览器本地,隐私无忧
- 🌍 **多语言支持** - 内置国际化,轻松切换语言
- 🎨 **现代化设计** - 精美的 UI,流畅的动画
- 🖱️ **拖拽操作** - 直观的拖放体验
- 💻 **桌面应用** - 支持打包为 Windows 桌面应用

### 🎯 适用场景

- 个人任务管理
- 小团队协作
- 项目进度跟踪
- 学习计划安排
- 创意灵感收集

---

## ✨ 特性

### 核心功能
- ✅ **多看板管理** - 创建和管理多个独立的看板
- ✅ **自定义列表** - 自由添加、编辑、删除看板列表
- ✅ **任务卡片** - 创建包含标题和描述的任务卡片
- ✅ **拖拽排序** - 通过拖拽在不同列表间移动卡片
- ✅ **实时保存** - 所有更改自动保存到本地存储
- ✅ **多语言** - 支持中文、英文等多种语言

### 用户体验
- 🎨 **现代化界面** - 简洁美观的 UI 设计
- 📱 **响应式布局** - 完美适配各种屏幕尺寸
- 🌙 **舒适配色** - 护眼的配色方案
- ✨ **流畅动画** - 丝滑的过渡效果
- ⌨️ **键盘快捷键** - 高效的键盘操作支持

### 技术特点
- ⚡ **Vite 驱动** - 极快的开发体验和构建速度
- 🔧 **TypeScript** - 类型安全,减少错误
- 🎯 **React 19** - 最新的 React 特性
- 📦 **零依赖** - 仅依赖必要的 React 和 Lucide Icons
- 🚀 **轻量化** - 构建产物小巧精悍

---

## 🚀 快速开始

### 在线预览

访问 [在线演示地址](https://your-demo-url.com) 体验完整功能。

### 本地运行

**前置要求:**

- Node.js >= 18.0.0

**安装步骤:**

1. 克隆仓库
```bash
git clone https://github.com/yourusername/kanbanlite.git
cd kanbanlite
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 `http://localhost:5173`

就这么简单! 🎉

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

---

## 📸 截图

<div align="center">
  <img src="https://via.placeholder.com/800x450/f0f2f5/64748b?text=KanbanLite+界面预览" alt="KanbanLite 界面预览" width="800" />
  <p><em>主界面 - 简洁高效的看板管理</em></p>
</div>

---

## 💻 桌面应用

KanbanLite 支持打包为 Windows 桌面应用,使用 Microsoft WebView2 技术实现。

### 构建桌面应用

**前置要求:**

- .NET 8.0 SDK
- WebView2 Runtime (Windows 11 默认已安装)

### 构建步骤

1. 构建前端应用
```bash
npm run build
```

2. 构建桌面应用
```bash
npm run build:webview2
```

或者使用批处理文件:
```bash
build-webview2.bat
```

3. 运行桌面应用
```bash
cd publish
.\KanbanLite.exe
```

### 桌面应用特性

- 🚀 **独立运行** - 无需浏览器,直接运行
- 📦 **单文件发布** - 所有依赖打包在一个可执行文件中
- 🖥️ **系统集成** - 支持窗口最小化、全屏等原生功能
- 🎨 **原生体验** - 桌面应用级别的用户体验

详细文档请查看 [WEBVIEW2.md](WEBVIEW2.md)

---

## 📖 使用指南

### 创建看板

点击左上角的看板名称,选择"创建新看板",输入标题即可创建。

### 管理列表

- **添加列表** - 点击右侧的"添加另一个列表"按钮
- **编辑列表** - 点击列表标题直接编辑
- **删除列表** - 悬停在列表上,点击删除图标

### 管理任务卡片

- **添加卡片** - 在列表底部输入标题,按回车或点击添加按钮
- **编辑卡片** - 点击卡片打开编辑弹窗
- **删除卡片** - 在编辑弹窗中点击删除按钮
- **移动卡片** - 直接拖拽卡片到目标列表

### 键盘快捷键

- `Enter` - 提交输入
- `Escape` - 关闭弹窗

---

## 🛠️ 技术栈

### 前端
- **React 19** - UI 框架
- **TypeScript** - 类型系统
- **Vite** - 构建工具
- **Lucide React** - 图标库

### 桌面应用
- **.NET 8.0** - 运行时
- **WebView2** - 嵌入式浏览器
- **WinForms** - 桌面框架

---

## 📁 项目结构

```
kanbanlite/
├── App.tsx                 # 主应用组件
├── index.tsx              # 应用入口
├── components/            # 组件目录
│   └── LanguageSelector.tsx
├── types/                 # 类型定义
├── i18n/                  # 国际化配置
├── WebView2Wrapper/       # 桌面应用项目
│   ├── Program.cs        # 主程序入口
│   └── KanbanLite.WebView2.csproj
├── dist/                 # 构建输出
├── publish/              # 桌面应用发布目录
└── package.json          # 项目配置
```

---

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议!

### 如何贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 开发规范

- 遵循现有的代码风格
- 添加必要的注释
- 更新相关文档
- 确保所有功能正常工作

---

## 🐛 问题反馈

如果您发现任何问题或有功能建议,请在 [GitHub Issues](https://github.com/yourusername/kanbanlite/issues) 中提交。

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 🙏 致谢

- [React](https://reactjs.org/) - 强大的 UI 框架
- [Vite](https://vitejs.dev/) - 极速的构建工具
- [Lucide](https://lucide.dev/) - 精美的图标库
- [Microsoft WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) - 强大的嵌入式浏览器

---

<div align="center">
  <p>
    <strong>如果这个项目对您有帮助,请给个 ⭐️ 支持一下!</strong>
  </p>
  <p>
    <em>Made with ❤️ by KanbanLite Team</em>
  </p>
</div>
