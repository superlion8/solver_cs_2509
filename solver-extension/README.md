# Solver Browser Extension

A Chrome extension that allows you to verify AI answers with experts and find expert consultancy directly from ChatGPT, Gemini, Claude, and other AI platforms.

## Features

- 🔍 **Double Check**: Verify AI answers with expert validation
- 👨‍💼 **Find Expert**: Get expert consultancy recommendations
- ⚡ **Universal**: Works on ChatGPT, Gemini, Claude, Perplexity
- 🎯 **Smart Selection**: Automatically detects meaningful text selections
- 🚀 **Quick Access**: Floating buttons appear on text selection

## Installation

### Method 1: Load Unpacked Extension (Development)

1. Download or clone this extension folder
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The Solver extension will appear in your extensions list

### Method 2: Pack Extension (Distribution)

1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Pack extension"
4. Select the extension folder
5. This will create a `.crx` file for distribution

## Usage

1. **Install the extension** using one of the methods above
2. **Visit any supported AI platform**:
   - ChatGPT (chat.openai.com)
   - Gemini (gemini.google.com)
   - Claude (claude.ai)
   - Perplexity (perplexity.ai)
3. **Select any text** from AI responses (minimum 10 characters)
4. **Click the floating buttons** that appear:
   - 🔍 "Double check with expert"
   - 👨‍💼 "Find expert consultancy"
5. **Get redirected** to Solver with your selected text

## Supported Platforms

- ✅ ChatGPT (OpenAI)
- ✅ Google Gemini
- ✅ Claude (Anthropic)
- ✅ Perplexity AI
- ✅ Bard (Google)

## Technical Details

- **Manifest Version**: 3
- **Permissions**: activeTab, scripting
- **Content Scripts**: Injected into AI platform pages
- **Host Permissions**: Limited to AI platform domains

## Development

To modify the extension:

1. Edit the files in this directory
2. Go to `chrome://extensions/`
3. Click the refresh button on the Solver extension
4. Test your changes

## File Structure

```
solver-extension/
├── manifest.json          # Extension configuration
├── content.js            # Main content script
├── styles.css            # Extension styles
├── popup.html            # Extension popup
├── icons/
│   └── icon.svg          # Extension icon
└── README.md             # This file
```

## Troubleshooting

- **Buttons not appearing**: Make sure you're on a supported platform and select at least 10 characters
- **Extension not loading**: Check that Developer mode is enabled in Chrome
- **Permissions denied**: Ensure the extension has access to the current tab

## Support

For issues or questions, please contact the Solver team or visit the main Solver website.
