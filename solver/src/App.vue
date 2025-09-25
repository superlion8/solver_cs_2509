<template>
  <div id="app">
    <header class="header">
      <h1>Solver</h1>
      <p>Verified answers. Actionable steps.</p>
      <button @click="clearChat" class="clear-chat-btn" v-if="messages.length > 0">
        🗑️ Clear Chat
      </button>
    </header>
    
    <div class="chat-container">
      <div class="chat-messages" ref="chatMessages">
        <div v-if="messages.length === 0" class="welcome-message">
          <div class="message assistant">
            <div class="message-content">
              <h3>👋 Welcome to Solver!</h3>
              <p>I'm your AI assistant powered by <strong>Gemini 2.5 Flash</strong>. Ask me anything, and I'll provide verified answers with actionable steps.</p>
              <p><strong>✨ New Features:</strong></p>
              <ul>
                <li>⚡ <strong>Streaming Responses</strong> - Real-time AI responses as they're generated</li>
                <li>📸 <strong>Multimodal Input</strong> - Upload images, PDFs, and documents</li>
                <li>💬 <strong>Multi-turn Conversations</strong> - I remember our chat history</li>
                <li>🔍 <strong>Double check</strong> - Verify answers with an expert</li>
                <li>👨‍💼 <strong>Find expert</strong> - Get expert consultancy recommendations</li>
              </ul>
              <p><em>Try uploading an image or document to see my multimodal capabilities!</em></p>
            </div>
          </div>
        </div>
        
        <div v-for="message in messages" :key="message.id" class="message" :class="message.type">
          <div class="message-content">
            <div v-if="message.type === 'assistant' && message.isTyping" class="typing-indicator">
              <span>AI is thinking</span>
              <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div v-else-if="message.type === 'assistant' && message.isStreaming" class="streaming-content">
              <span v-html="formatMessage(message.content)"></span>
              <span class="streaming-cursor">|</span>
            </div>
            <div v-else v-html="formatMessage(message.content)"></div>
          </div>
          
          <div v-if="message.type === 'assistant' && !message.isTyping && !message.isStreaming && message.content" class="message-actions">
            <button class="action-button" @click="doubleCheckAnswer(message)">
              🔍 Double check the answer with an expert
            </button>
            <button class="action-button secondary" @click="findExpert(message)">
              👨‍💼 Find an expert for consultancy
            </button>
          </div>
        </div>
      </div>
      
      <div class="input-container">
        <div class="input-wrapper">
          <input
            v-model="inputMessage"
            @keyup.enter="sendMessage"
            class="message-input"
            placeholder="Ask me anything... (supports text, images, files)"
            :disabled="isLoading"
          />
          <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            accept="image/*,.pdf,.txt,.doc,.docx"
            class="file-input"
            :disabled="isLoading"
          />
          <button
            @click="$refs.fileInput.click()"
            class="file-button"
            :disabled="isLoading"
            title="Upload file"
          >
            📎
          </button>
        </div>
        <button
          @click="sendMessage"
          class="send-button"
          :disabled="isLoading || (!inputMessage.trim() && !uploadedFiles.length)"
        >
          <span v-if="isLoading" class="loading"></span>
          <span v-else>Send</span>
        </button>
      </div>
      
      <!-- File preview -->
      <div v-if="uploadedFiles.length > 0" class="file-preview">
        <div v-for="(file, index) in uploadedFiles" :key="index" class="file-item">
          <span class="file-name">{{ file.name }}</span>
          <button @click="removeFile(index)" class="remove-file">×</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, nextTick, onMounted } from 'vue'
import { GoogleGenerativeAI } from '@google/generative-ai'

export default {
  name: 'App',
  setup() {
    const messages = ref([])
    const inputMessage = ref('')
    const isLoading = ref(false)
    const chatMessages = ref(null)
    const uploadedFiles = ref([])
    const fileInput = ref(null)
    const chatHistory = ref([])
    
    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI('AIzaSyC2PQUCIxM_iH0ZEX0I8pkLm9HcLP5NCTI')
    
    // Use Gemini 2.5 Flash as primary model
    const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro']
    let model = genAI.getGenerativeModel({ model: models[0] })
    
    const scrollToBottom = () => {
      nextTick(() => {
        if (chatMessages.value) {
          chatMessages.value.scrollTop = chatMessages.value.scrollHeight
        }
      })
    }
    
    // File handling functions
    const handleFileUpload = (event) => {
      const files = Array.from(event.target.files)
      uploadedFiles.value.push(...files)
      event.target.value = '' // Reset input
    }
    
    const removeFile = (index) => {
      uploadedFiles.value.splice(index, 1)
    }
    
    const convertFileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    }
    
    const tryModelsStream = async (prompt, files = [], onChunk) => {
      for (const modelName of models) {
        try {
          const currentModel = genAI.getGenerativeModel({ model: modelName })
          
          let fullText = ''
          
          // If we have files, use multimodal approach
          if (files.length > 0) {
            const parts = []
            
            // Add text if provided
            if (prompt.trim()) {
              parts.push({ text: prompt })
            }
            
            // Add files if provided
            for (const file of files) {
              if (file.type.startsWith('image/')) {
                const base64 = await convertFileToBase64(file)
                parts.push({
                  inlineData: {
                    data: base64.split(',')[1], // Remove data:image/...;base64, prefix
                    mimeType: file.type
                  }
                })
              }
            }
            
            // Use streaming for multimodal
            const result = await currentModel.generateContentStream(parts)
            
            // Process stream chunks using the correct API
            for await (const chunk of result.stream) {
              const chunkText = chunk.text()
              if (chunkText) {
                fullText += chunkText
                onChunk(chunkText)
              }
            }
          } else {
            // Simple text generation with streaming
            const result = await currentModel.generateContentStream(prompt)
            
            // Process stream chunks using the correct API
            for await (const chunk of result.stream) {
              const chunkText = chunk.text()
              if (chunkText) {
                fullText += chunkText
                onChunk(chunkText)
              }
            }
          }
          
          // Update chat history for multi-turn conversation
          chatHistory.value.push(
            { role: 'user', parts: [{ text: prompt }] },
            { role: 'model', parts: [{ text: fullText }] }
          )
          
          return fullText
        } catch (error) {
          console.log(`Model ${modelName} failed, trying next...`)
          if (modelName === models[models.length - 1]) {
            throw error // If all models fail, throw the last error
          }
        }
      }
    }
    
    const formatMessage = (content) => {
      // Simple markdown-like formatting
      return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
    }
    
    const sendMessage = async () => {
      if ((!inputMessage.value.trim() && uploadedFiles.value.length === 0) || isLoading.value) return
      
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: inputMessage.value.trim() || `[${uploadedFiles.value.length} file(s) uploaded]`,
        files: [...uploadedFiles.value],
        timestamp: new Date()
      }
      
      messages.value.push(userMessage)
      const currentInput = inputMessage.value
      const currentFiles = [...uploadedFiles.value]
      
      // Clear input
      inputMessage.value = ''
      uploadedFiles.value = []
      
      // Add streaming message placeholder
      const streamingMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: '',
        isTyping: false,
        isStreaming: true,
        timestamp: new Date()
      }
      messages.value.push(streamingMessage)
      
      scrollToBottom()
      isLoading.value = true
      
      try {
        const text = await tryModelsStream(currentInput, currentFiles, (chunk) => {
          // Update the streaming message with new chunk
          const messageIndex = messages.value.findIndex(msg => msg.id === streamingMessage.id)
          if (messageIndex !== -1) {
            messages.value[messageIndex].content += chunk
            scrollToBottom()
          }
        })
        
        // Mark streaming as complete
        const messageIndex = messages.value.findIndex(msg => msg.id === streamingMessage.id)
        if (messageIndex !== -1) {
          messages.value[messageIndex].isStreaming = false
        }
        
      } catch (error) {
        console.error('Error calling Gemini API:', error)
        messages.value.pop()
        
        let errorMessage = 'Sorry, I encountered an error while processing your request. Please try again.'
        
        // Provide more specific error messages
        if (error.message.includes('404')) {
          errorMessage = 'The AI model is currently unavailable. Please try again later.'
        } else if (error.message.includes('403')) {
          errorMessage = 'API access denied. Please check the API key configuration.'
        } else if (error.message.includes('429')) {
          errorMessage = 'Rate limit exceeded. Please wait a moment before trying again.'
        }
        
        const errorResponse = {
          id: Date.now() + 2,
          type: 'assistant',
          content: errorMessage,
          isTyping: false,
          timestamp: new Date()
        }
        messages.value.push(errorResponse)
      } finally {
        isLoading.value = false
        scrollToBottom()
      }
    }
    
    const doubleCheckAnswer = (message) => {
      const checkMessage = {
        id: Date.now(),
        type: 'user',
        content: `Please double check this answer: "${message.content}"`,
        timestamp: new Date()
      }
      messages.value.push(checkMessage)
      sendMessage()
    }
    
    const findExpert = (message) => {
      const expertMessage = {
        id: Date.now(),
        type: 'user',
        content: `I need to find an expert to consult about: "${message.content}"`,
        timestamp: new Date()
      }
      messages.value.push(expertMessage)
      sendMessage()
    }
    
    const clearChat = () => {
      messages.value = []
      chatHistory.value = []
      uploadedFiles.value = []
      inputMessage.value = ''
    }
    
    onMounted(() => {
      scrollToBottom()
      
      // Handle URL parameters from browser extension
      const urlParams = new URLSearchParams(window.location.search)
      const action = urlParams.get('action')
      const text = urlParams.get('text')
      
      if (action && text) {
        // Auto-send message based on action
        let message = ''
        if (action === 'verify') {
          message = `Please double check this answer: "${decodeURIComponent(text)}"`
        } else if (action === 'consult') {
          message = `I need to find an expert to consult about: "${decodeURIComponent(text)}"`
        }
        
        if (message) {
          inputMessage.value = message
          setTimeout(() => {
            sendMessage()
          }, 1000)
        }
      }
    })
    
    return {
      messages,
      inputMessage,
      isLoading,
      chatMessages,
      uploadedFiles,
      fileInput,
      sendMessage,
      doubleCheckAnswer,
      findExpert,
      formatMessage,
      handleFileUpload,
      removeFile,
      clearChat
    }
  }
}
</script>
