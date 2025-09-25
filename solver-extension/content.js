// Solver Browser Extension - Content Script
class SolverExtension {
  constructor() {
    this.isActive = false
    this.selectedText = ''
    this.floatingButtons = null
    this.init()
  }

  init() {
    // Listen for text selection
    document.addEventListener('mouseup', this.handleTextSelection.bind(this))
    document.addEventListener('keyup', this.handleTextSelection.bind(this))
    
    // Listen for clicks to hide buttons
    document.addEventListener('click', this.handleClick.bind(this))
    
    // Listen for scroll to hide buttons
    document.addEventListener('scroll', this.hideButtons.bind(this))
  }

  handleTextSelection(event) {
    setTimeout(() => {
      const selection = window.getSelection()
      const text = selection.toString().trim()
      
      if (text.length > 10) { // Only show for meaningful text selections
        this.selectedText = text
        this.showFloatingButtons(event)
      } else {
        this.hideButtons()
      }
    }, 100)
  }

  handleClick(event) {
    // Hide buttons if clicking outside the floating buttons
    if (this.floatingButtons && !this.floatingButtons.contains(event.target)) {
      this.hideButtons()
    }
  }

  showFloatingButtons(event) {
    this.hideButtons() // Remove existing buttons first
    
    const selection = window.getSelection()
    if (!selection.rangeCount) return
    
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    
    // Create floating buttons container
    this.floatingButtons = document.createElement('div')
    this.floatingButtons.className = 'solver-floating-buttons'
    this.floatingButtons.innerHTML = `
      <div class="solver-button-group">
        <button class="solver-btn solver-btn-primary" data-action="double-check">
          🔍 Double check with expert
        </button>
        <button class="solver-btn solver-btn-secondary" data-action="find-expert">
          👨‍💼 Find expert consultancy
        </button>
      </div>
    `
    
    // Position the buttons
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    
    this.floatingButtons.style.position = 'absolute'
    this.floatingButtons.style.top = `${rect.bottom + scrollTop + 10}px`
    this.floatingButtons.style.left = `${rect.left + scrollLeft}px`
    this.floatingButtons.style.zIndex = '10000'
    
    // Add to document
    document.body.appendChild(this.floatingButtons)
    
    // Add event listeners
    this.floatingButtons.addEventListener('click', this.handleButtonClick.bind(this))
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
      this.hideButtons()
    }, 10000)
  }

  handleButtonClick(event) {
    const action = event.target.dataset.action
    if (!action) return
    
    event.preventDefault()
    event.stopPropagation()
    
    if (action === 'double-check') {
      this.openSolverWithAction('double-check', this.selectedText)
    } else if (action === 'find-expert') {
      this.openSolverWithAction('find-expert', this.selectedText)
    }
    
    this.hideButtons()
  }

  openSolverWithAction(action, text) {
    const solverUrl = 'http://192.168.1.148:8080'
    const encodedText = encodeURIComponent(text)
    const actionParam = action === 'double-check' ? 'verify' : 'consult'
    
    const url = `${solverUrl}?action=${actionParam}&text=${encodedText}`
    
    // Open in new tab
    window.open(url, '_blank')
  }

  hideButtons() {
    if (this.floatingButtons) {
      this.floatingButtons.remove()
      this.floatingButtons = null
    }
  }
}

// Initialize the extension
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SolverExtension()
  })
} else {
  new SolverExtension()
}
