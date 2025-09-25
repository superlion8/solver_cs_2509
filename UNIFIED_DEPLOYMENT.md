# Solver 统一部署方案

## 🎯 **一次部署，全部搞定！**

现在你可以通过一次Vercel部署同时获得：
- ✅ **主网站** (营销页面)
- ✅ **Chat应用** (AI聊天功能)
- ✅ **专家招募页面**

## 📁 **项目结构**

```
solver-project/
├── public/                 # Vercel部署目录
│   ├── home.html          # 主网站首页 (/)
│   ├── index.html         # Chat应用 (/chat)
│   ├── expert.html        # 专家招募页 (/expert)
│   ├── styles.css         # 样式文件
│   ├── script.js          # JavaScript
│   └── assets/            # Chat应用资源
├── solver/                # Chat应用源码
├── solver-extension/       # 浏览器插件
├── vercel.json           # Vercel配置
├── build.sh              # 构建脚本
└── package.json          # 项目配置
```

## 🚀 **部署步骤**

### 1. 在Vercel中配置项目
- **Framework Preset**: `Other`
- **Root Directory**: `.` (根目录)
- **Build Command**: `npm run build`
- **Output Directory**: `public`
- **Install Command**: `npm install`

### 2. 部署
点击 "Deploy" 开始部署

## 🔗 **访问链接**

部署成功后，你将获得一个域名，可以访问：

- **主网站**: `https://your-domain.vercel.app/` (home.html)
- **Chat应用**: `https://your-domain.vercel.app/chat` (index.html)
- **专家页**: `https://your-domain.vercel.app/expert` (expert.html)

## 🛠️ **构建过程**

部署时Vercel会自动执行：
1. `npm install` - 安装依赖
2. `npm run build` - 运行构建脚本
3. 构建脚本会：
   - 进入 `solver/` 目录
   - 运行 `npm run build` 构建Chat应用
   - 将构建文件复制到 `public/` 目录
   - 保持主网站文件不变

## ✨ **优势**

- 🎯 **一次部署**: 不需要分别部署多个项目
- 🔄 **自动构建**: Chat应用会自动构建并集成
- 📱 **统一域名**: 所有功能在同一个域名下
- 🚀 **简单维护**: 只需要维护一个Vercel项目

## 🔧 **本地开发**

```bash
# 构建整个项目
npm run build

# 或者单独构建Chat应用
cd solver && npm run build
```

## 📝 **注意事项**

- Chat应用的API key已硬编码在代码中
- 所有页面共享相同的样式和脚本文件
- 构建脚本会自动处理文件复制和路径配置
