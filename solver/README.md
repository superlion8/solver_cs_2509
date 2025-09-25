# Solver

**Verified answers. Actionable steps.**

A Vue.js chatbot application powered by Google's Gemini AI model, designed to provide verified answers with actionable steps.

## Features

- 🤖 **AI-Powered Chat**: Integrated with Google Gemini API for intelligent responses
- 🔍 **Double Check**: Verify answers with expert validation
- 👨‍💼 **Expert Consultation**: Find experts for specialized consultancy
- 💬 **Modern UI**: Clean, responsive chat interface
- ⚡ **Real-time**: Instant responses with typing indicators

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd /Users/$(whoami)/Desktop/solver
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   - Local access: `http://localhost:8080`
   - Network access: `http://192.168.1.148:8080` (replace with your actual IP)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Ask Questions**: Type your questions in the input field and press Enter or click Send
2. **Get AI Responses**: Receive intelligent answers powered by Gemini AI
3. **Double Check**: Click "Double check the answer with an expert" to verify responses
4. **Find Experts**: Click "Find an expert for consultancy" to get expert recommendations

## API Configuration

The application uses Google's Gemini API with the provided API key. The key is configured in `src/App.vue`.

## Project Structure

```
solver/
├── src/
│   ├── App.vue          # Main application component
│   ├── main.js          # Application entry point
│   └── style.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## Technologies Used

- **Vue 3**: Progressive JavaScript framework
- **Vite**: Fast build tool and development server
- **Google Generative AI**: Gemini API integration
- **CSS3**: Modern styling with gradients and animations

## License

This project is for educational and personal use.