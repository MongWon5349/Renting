# 个人网站项目

这是一个使用Vue.js构建的现代化个人网站，包含首页、博客和关于页面。

## 功能特性

- 🎨 现代化的响应式设计
- 🚀 基于Vue 3和Vue Router
- 📝 集成Contentful CMS的博客系统
- 📱 移动端友好
- ⚡ 使用Vite构建工具，开发体验极佳
- 🔍 SEO优化
- 🎯 简洁优雅的用户界面

## 项目结构

```
personal-site/
├── src/
│   ├── components/
│   │   ├── Home.vue          # 首页组件
│   │   ├── Blog.vue          # 博客列表页
│   │   ├── BlogPost.vue      # 博客文章详情页
│   │   └── About.vue         # 关于页面组件
│   ├── App.vue               # 主应用组件
│   └── main.js               # 应用入口文件
├── public/                   # 静态资源目录
├── .env.example             # 环境变量示例文件
├── index.html               # HTML模板
├── package.json             # 项目配置和依赖
├── vite.config.js           # Vite配置文件
├── vercel.json              # Vercel部署配置
└── README.md                # 项目说明文档
```

## 安装和运行

### 前提条件

确保你的系统已安装：
- Node.js (版本 18 或更高)
- npm 或 yarn

### 环境配置

1. 复制环境变量示例文件：
```bash
cp .env.example .env.local
```

2. 编辑 `.env.local` 文件，填入你的Contentful配置：
```
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token
VITE_CONTENTFUL_ENVIRONMENT=master
VITE_SITE_URL=https://yourdomain.com
VITE_SITE_NAME=Your Site Name
```

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 页面说明

### 首页 (Home)
- 个人简介和技能展示
- 项目作品集
- 联系方式

### 博客 (Blog)
- 博客文章列表
- 文章分类和搜索
- 响应式卡片布局

### 博客文章详情 (BlogPost)
- 文章内容展示
- SEO优化
- 社交媒体分享

## Contentful CMS配置

### 内容模型设置

在Contentful中创建以下内容类型：

**Blog Post (blog)**
- title (Short text) - 文章标题
- excerpt (Long text) - 文章摘要
- mainContent (Rich text) - 文章正文
- category (Short text) - 文章分类
- featured (Boolean) - 是否为精选文章
- featuredImage (Media) - 特色图片
- publishDate (Date & time) - 发布日期
- readTime (Short text) - 阅读时间
- author (Short text) - 作者

### API密钥获取

1. 登录Contentful控制台
2. 进入Settings > API keys
3. 创建新的API密钥或使用现有密钥
4. 复制Space ID和Content Delivery API access token

## 自定义配置

你可以通过修改以下文件来自定义网站内容：

1. **修改个人信息**：编辑 `src/components/Home.vue`
2. **修改博客样式**：编辑 `src/components/Blog.vue` 和 `src/components/BlogPost.vue`
3. **修改样式**：每个组件都有独立的样式，可以根据需要调整
4. **添加新页面**：在 `src/components/` 目录下创建新组件，并在 `src/main.js` 中添加路由

## 技术栈

- **前端框架**：Vue 3
- **路由管理**：Vue Router 4
- **构建工具**：Vite
- **CMS**：Contentful
- **富文本渲染**：@contentful/rich-text-html-renderer
- **Markdown支持**：marked
- **样式**：原生CSS（Scoped样式）

## 部署

### Vercel部署

1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 配置环境变量
4. 部署完成

### 环境变量配置

在部署平台中设置以下环境变量：
- `VITE_CONTENTFUL_SPACE_ID`
- `VITE_CONTENTFUL_ACCESS_TOKEN`
- `VITE_CONTENTFUL_ENVIRONMENT`
- `VITE_SITE_URL`
- `VITE_SITE_NAME`

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License