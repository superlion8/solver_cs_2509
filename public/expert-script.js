// Expert Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
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

    // Form submission
    const expertForm = document.getElementById('expertForm');
    const successModal = document.getElementById('successModal');

    expertForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(expertForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Simulate form submission
        submitApplication(data);
    });

    // Form validation
    function validateForm(data) {
        const requiredFields = ['fullName', 'email', 'specialty', 'specificField', 'linkedin', 'experience', 'motivation'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!data[field] || data[field].trim() === '') {
                showFieldError(input, 'This field is required');
                isValid = false;
            } else {
                clearFieldError(input);
            }
        });
        
        // Validate email
        const emailInput = document.getElementById('email');
        if (data.email && !isValidEmail(data.email)) {
            showFieldError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate LinkedIn URL
        const linkedinInput = document.getElementById('linkedin');
        if (data.linkedin && !isValidLinkedIn(data.linkedin)) {
            showFieldError(linkedinInput, 'Please enter a valid LinkedIn profile URL');
            isValid = false;
        }
        
        // Validate terms checkbox
        const termsInput = document.getElementById('terms');
        if (!data.terms) {
            showFieldError(termsInput, 'You must agree to the terms and conditions');
            isValid = false;
        }
        
        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidLinkedIn(url) {
        const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
        return linkedinRegex.test(url);
    }

    function showFieldError(input, message) {
        clearFieldError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '4px';
        
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#dc3545';
    }

    function clearFieldError(input) {
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    }

    // Simulate form submission
    function submitApplication(data) {
        // Show loading state
        const submitBtn = expertForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '⏳ Submitting...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success modal
            showSuccessModal();
            
            // Reset form
            expertForm.reset();
            
            // Log data (in real app, this would be sent to server)
            console.log('Expert application submitted:', data);
            
        }, 2000);
    }

    // Show success modal
    function showSuccessModal() {
        successModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Hide success modal
    function hideSuccessModal() {
        successModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Modal close functionality
    const modalCloses = document.querySelectorAll('.modal-close');
    modalCloses.forEach(btn => {
        btn.addEventListener('click', hideSuccessModal);
    });

    // Close modal when clicking overlay
    const modalOverlay = successModal.querySelector('.modal-overlay');
    modalOverlay.addEventListener('click', hideSuccessModal);

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
    const animateElements = document.querySelectorAll('.benefit-card, .process-step, .category-card, .registration-form-container');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
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

    // Specialty change handler
    const specialtySelect = document.getElementById('specialty');
    const specificFieldInput = document.getElementById('specificField');
    
    specialtySelect.addEventListener('change', function() {
        const specialty = this.value;
        const suggestions = {
            'technology': 'e.g., React Development, Python, Machine Learning, DevOps',
            'business': 'e.g., Digital Marketing, Sales Strategy, Financial Analysis',
            'healthcare': 'e.g., Cardiology, Mental Health, Public Health, Medical Research',
            'legal': 'e.g., Corporate Law, Intellectual Property, Immigration Law',
            'education': 'e.g., Curriculum Development, Educational Technology, Student Counseling',
            'creative': 'e.g., UX Design, Content Creation, Brand Strategy, Digital Marketing'
        };
        
        if (suggestions[specialty]) {
            specificFieldInput.placeholder = suggestions[specialty];
        } else {
            specificFieldInput.placeholder = 'e.g., Your specific area of expertise';
        }
    });

    // Add some interactive effects
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.expert-hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = stat.textContent;
        if (target.includes('$')) {
            animateCounter(stat, target);
        }
    });

    function animateCounter(element, target) {
        const isMoney = target.includes('$');
        const isRange = target.includes('-');
        
        if (isRange) {
            // Handle ranges like "$50-200"
            const parts = target.split('-');
            const start = parseInt(parts[0].replace('$', ''));
            const end = parseInt(parts[1]);
            
            let current = start;
            const increment = (end - start) / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= end) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = `$${Math.floor(current)}-${end}`;
                }
            }, 50);
        }
    }
});
