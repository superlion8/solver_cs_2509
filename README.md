# Solver - Verified answers. Actionable steps.

A comprehensive AI verification platform that bridges the gap between AI intelligence and human expertise.

## 🌟 Overview

Solver provides verified AI answers with expert validation and actionable consultancy services. Our platform ensures that AI responses are accurate, reliable, and backed by human expertise.

## 🚀 Features

- **⚡ Streaming AI Responses** - Real-time AI responses powered by Gemini 2.5 Flash
- **📸 Multimodal Input** - Support for images, documents, and files
- **💬 Multi-turn Conversations** - Intelligent memory and context retention
- **🔍 Expert Verification** - Double-check AI answers with domain experts
- **👨‍💼 Expert Consultancy** - Connect with verified professionals
- **🌐 Browser Extension** - Works seamlessly with ChatGPT, Gemini, Claude
- **💰 Expert Network** - Earn money by verifying AI responses

## 📁 Project Structure

```
solver-project/
├── solver/                    # Vue.js Chat Application
│   ├── src/
│   │   ├── App.vue           # Main chat component
│   │   ├── main.js           # Application entry point
│   │   └── style.css         # Global styles
│   ├── package.json          # Dependencies
│   └── vite.config.js        # Vite configuration
├── solver-website/           # Marketing Website
│   ├── index.html            # Homepage
│   ├── expert.html           # Expert recruitment page
│   ├── styles.css            # Website styles
│   ├── expert-styles.css     # Expert page styles
│   ├── script.js             # Website JavaScript
│   ├── expert-script.js      # Expert page JavaScript
│   ├── server.js             # Express server
│   └── package.json          # Website dependencies
├── solver-extension/         # Chrome Browser Extension
│   ├── manifest.json         # Extension configuration
│   ├── content.js            # Content script
│   ├── styles.css            # Extension styles
│   ├── popup.html            # Extension popup
│   └── icons/                # Extension icons
└── README.md                 # This file
```

## 🛠️ Technology Stack

- **Frontend**: Vue 3 + Vite
- **AI Model**: Google Gemini 2.5 Flash
- **Styling**: CSS3 with modern features
- **Browser Extension**: Manifest V3
- **Website**: Express.js + Static HTML
- **Deployment**: Vercel (Website) + Local (Chat App)

## 🚀 Quick Start

### 1. Chat Application (Local Development)

```bash
cd solver
npm install
npm run dev
```

Access at: `http://localhost:8080`

### 2. Website (Local Development)

```bash
cd solver-website
npm install
npm start
```

Access at: `http://localhost:4000`

### 3. Browser Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `solver-extension` folder

## 🌐 Deployment

### Website (Vercel)

The website is designed for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Set build command: `cd solver-website && npm install`
3. Set output directory: `solver-website`
4. Deploy!

### Chat Application

The chat application requires a server environment with:
- Node.js support
- Environment variables for API keys
- CORS configuration for browser extension

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `solver` directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Browser Extension

Update the API endpoints in `solver-extension/content.js` to match your deployment URLs.

## 📱 Usage

### For Users

1. **Direct Chat**: Visit the chat application for AI conversations
2. **Browser Extension**: Install the extension to verify AI answers on any platform
3. **Expert Verification**: Click "Double check with expert" for verified answers
4. **Expert Consultancy**: Click "Find expert consultancy" for personalized guidance

### For Experts

1. **Sign Up**: Visit the expert recruitment page
2. **Get Verified**: Submit your credentials and LinkedIn profile
3. **Start Earning**: Verify AI answers and get paid
4. **Build Reputation**: Establish yourself as a trusted expert

## 🎯 Key Benefits

- **For Users**: Get reliable, expert-verified AI answers
- **For Experts**: Earn money by sharing your expertise
- **For Businesses**: Ensure AI responses are accurate and trustworthy

## 🔒 Security & Privacy

- API keys are stored securely
- Expert credentials are verified through LinkedIn
- All communications are encrypted
- Privacy-first approach to data handling

## 📈 Future Roadmap

- [ ] Mobile app development
- [ ] Advanced expert matching algorithms
- [ ] Integration with more AI platforms
- [ ] Real-time expert chat functionality
- [ ] Advanced analytics and reporting

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for more information.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, please contact us through our website or create an issue in this repository.

---

**Solver** - Verified answers. Actionable steps.
