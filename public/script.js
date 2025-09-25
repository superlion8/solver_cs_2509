// Solver Website JavaScript

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .step, .extension-info, .extension-preview');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Chat preview animation
    const chatPreview = document.querySelector('.chat-preview');
    if (chatPreview) {
        setTimeout(() => {
            chatPreview.style.transform = 'scale(1.05)';
            setTimeout(() => {
                chatPreview.style.transform = 'scale(1)';
            }, 200);
        }, 1000);
    }

    // Extension download functionality
    const downloadButtons = document.querySelectorAll('a[href="#download"]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showDownloadModal();
        });
    });

    // Installation guide functionality
    const installButtons = document.querySelectorAll('a[href="#install-guide"]');
    installButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showInstallGuide();
        });
    });
});

// Download modal
function showDownloadModal() {
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Download Solver Extension</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>To install the Solver browser extension:</p>
                    <ol>
                        <li>Download the extension files from the repository</li>
                        <li>Open Chrome and go to <code>chrome://extensions/</code></li>
                        <li>Enable "Developer mode" in the top right</li>
                        <li>Click "Load unpacked" and select the extension folder</li>
                        <li>The Solver extension will appear in your extensions list</li>
                    </ol>
                    <div class="download-actions">
                        <a href="/solver-extension.zip" class="btn btn-primary" download>
                            📎 Download Extension
                        </a>
                        <button class="btn btn-secondary modal-close">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .download-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-overlay {
            background: rgba(0, 0, 0, 0.5);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            position: relative;
            z-index: 1;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .modal-header h3 {
            margin: 0;
            color: #333;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        .modal-body ol {
            margin: 20px 0;
            padding-left: 20px;
        }
        .modal-body li {
            margin: 8px 0;
            color: #666;
        }
        .modal-body code {
            background: #f1f3f4;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
        }
        .download-actions {
            display: flex;
            gap: 12px;
            margin-top: 20px;
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(modal);

    // Close modal functionality
    const closeModal = () => {
        modal.remove();
        style.remove();
    };

    modal.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
}

// Installation guide
function showInstallGuide() {
    const modal = document.createElement('div');
    modal.className = 'install-guide-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Installation Guide</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="install-step">
                        <h4>Step 1: Download Extension</h4>
                        <p>Download the Solver extension files from our repository.</p>
                    </div>
                    <div class="install-step">
                        <h4>Step 2: Open Chrome Extensions</h4>
                        <p>Navigate to <code>chrome://extensions/</code> in your Chrome browser.</p>
                    </div>
                    <div class="install-step">
                        <h4>Step 3: Enable Developer Mode</h4>
                        <p>Toggle the "Developer mode" switch in the top right corner.</p>
                    </div>
                    <div class="install-step">
                        <h4>Step 4: Load Extension</h4>
                        <p>Click "Load unpacked" and select the downloaded extension folder.</p>
                    </div>
                    <div class="install-step">
                        <h4>Step 5: Start Using</h4>
                        <p>Visit ChatGPT, Gemini, or Claude and select text to see Solver buttons!</p>
                    </div>
                    <div class="install-actions">
                        <button class="btn btn-primary modal-close">Got it!</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal styles (reuse from download modal)
    const style = document.createElement('style');
    style.textContent = `
        .install-guide-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-overlay {
            background: rgba(0, 0, 0, 0.5);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 30px;
            max-width: 600px;
            width: 90%;
            position: relative;
            z-index: 1;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-height: 80vh;
            overflow-y: auto;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .modal-header h3 {
            margin: 0;
            color: #333;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        .install-step {
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 12px;
            border-left: 4px solid #667eea;
        }
        .install-step h4 {
            margin: 0 0 8px 0;
            color: #333;
        }
        .install-step p {
            margin: 0;
            color: #666;
        }
        .install-step code {
            background: #e9ecef;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
        }
        .install-actions {
            text-align: center;
            margin-top: 30px;
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(modal);

    // Close modal functionality
    const closeModal = () => {
        modal.remove();
        style.remove();
    };

    modal.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
