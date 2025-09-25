# Solver Chat App - Vercel Deployment Guide

## 🚀 独立部署Chat应用

这个目录包含Solver的Chat功能应用，需要独立部署到Vercel。

## 📋 部署步骤

### 1. 创建新的Vercel项目
1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 选择 `superlion8/solver_cs_2509` 仓库

### 2. 配置部署设置
- **Framework Preset**: Vite
- **Root Directory**: `solver`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. 环境变量（如果需要）
- 无需额外环境变量，API key已硬编码在应用中

### 4. 部署
点击 "Deploy" 开始部署

## 🔗 访问链接

部署成功后，你将获得一个类似 `https://solver-chat-xxx.vercel.app` 的链接。

## 📝 更新主网站链接

部署完成后，需要更新主网站的Chat链接：

1. 编辑 `public/index.html`
2. 将 `http://192.168.1.148:8080` 替换为新的Vercel链接
3. 重新部署主网站

## 🛠️ 本地开发

```bash
cd solver
npm install
npm run dev
```

应用将在 `http://localhost:8080` 运行

## 📁 项目结构

```
solver/
├── src/
│   ├── App.vue          # 主应用组件
│   ├── main.js          # 应用入口
│   └── style.css        # 样式文件
├── index.html           # HTML模板
├── package.json         # 依赖配置
├── vite.config.js       # Vite配置
├── vercel.json          # Vercel部署配置
└── DEPLOYMENT.md        # 部署说明
```
