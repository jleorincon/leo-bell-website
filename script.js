// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .skill-item, .about-text, .about-skills');
    animateElements.forEach(el => observer.observe(el));

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const project = formData.get('project');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✓' : '⚠'}
                </span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.75rem;
        `;

        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Add close functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Typing animation for hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const fullText = "Hi, I'm ";
        const highlightText = "Leo Bell";
        heroTitle.innerHTML = '';
        
        let i = 0;
        function typeWriter() {
            if (i < fullText.length) {
                heroTitle.innerHTML = fullText.slice(0, i + 1);
                i++;
                setTimeout(typeWriter, 80);
            } else if (i < fullText.length + highlightText.length) {
                const highlightIndex = i - fullText.length;
                heroTitle.innerHTML = fullText + '<span class="highlight">' + highlightText.slice(0, highlightIndex + 1) + '</span>';
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.ceil(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('h4');
                const targetValue = parseInt(statNumber.textContent);
                if (!isNaN(targetValue)) {
                    statNumber.textContent = '0';
                    animateCounter(statNumber, targetValue);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });

    // Add loading state to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                return; // Skip for navigation links
            }
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add hover effect to portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skills animation on scroll
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateY(0)';
                        item.style.opacity = '1';
                    }, index * 200);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        // Initial state
        skillsGrid.querySelectorAll('.skill-item').forEach(item => {
            item.style.transform = 'translateY(50px)';
            item.style.opacity = '0';
            item.style.transition = 'all 0.6s ease';
        });
        
        skillsObserver.observe(skillsGrid);
    }

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    `;

    document.body.appendChild(backToTopButton);

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.transform = 'translateY(0)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'translateY(100px)';
        }
    });

    // Back to top functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effects to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    console.log('Website loaded successfully! 🚀');
});

// Enhanced Copy to Clipboard Function
function copyToClipboard(text, button) {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    document.body.appendChild(textarea);
    
    try {
        // Select and copy the text
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, 99999); // For mobile devices
        
        const successful = document.execCommand('copy');
        
        if (successful) {
            // Show success feedback
            showCopySuccess(button, text);
        } else {
            throw new Error('Copy command failed');
        }
    } catch (err) {
        console.error('Copy failed:', err);
        // Fallback: Show alert with the text to copy
        alert(`Copy failed. Please copy this manually:\n\n${text}`);
    } finally {
        // Clean up
        document.body.removeChild(textarea);
    }
}

// Show copy success feedback
function showCopySuccess(button, text) {
    if (!button) return;
    
    // Store original state
    const originalText = button.textContent;
    const originalClass = button.className;
    
    // Show "Copied!" state
    button.textContent = 'Copied!';
    button.classList.add('copied');
    
    // Revert after 2 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.className = originalClass;
    }, 2000);
    
    console.log(`Successfully copied: ${text}`);
}

// Quote Form Submission
function submitQuote() {
    const form = document.querySelector('.quote-form');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'service', 'timeline', 'description'];
    let isValid = true;
    let missingFields = [];
    
    requiredFields.forEach(field => {
        const value = formData.get(field);
        if (!value || value.trim() === '') {
            isValid = false;
            missingFields.push(field);
        }
    });
    
    if (!isValid) {
        alert(`Please fill in all required fields:\n${missingFields.join(', ')}`);
        return;
    }
    
    // Collect form data
    const quoteData = {
        name: formData.get('name'),
        email: formData.get('email'),
        service: formData.get('service'),
        timeline: formData.get('timeline'),
        description: formData.get('description')
    };
    
    // Create email content
    const emailSubject = `Website Development Quote Request - ${quoteData.name}`;
    const emailBody = `
Hi Leo,

I would like to request a quote for website development.

Client Details:
- Name: ${quoteData.name}
- Email: ${quoteData.email}

Project Details:
- Service Type: ${quoteData.service}
- Timeline: ${quoteData.timeline}

Project Description:
${quoteData.description}

Best regards,
${quoteData.name}
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:jlr083101@outlook.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Quote request prepared! Your email client should open with the pre-filled quote request.');
    
    // Optional: Reset form after submission
    // form.reset();
}

// Enhanced Send Email Function (for compatibility)
function sendEmail() {
    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const project = document.getElementById('project')?.value || '';
    const message = document.getElementById('message')?.value || '';
    
    const emailSubject = `Website Inquiry from ${name}`;
    const emailBody = `
Hi Leo,

Name: ${name}
Email: ${email}
Project Type: ${project}

Message:
${message}

Best regards,
${name}
    `.trim();
    
    const mailtoLink = `mailto:jlr083101@outlook.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
}

// Copy email function
function copyEmail() {
    const emailElement = document.getElementById('email-text');
    if (!emailElement) {
        console.error('Email element not found');
        alert('Error: Email element not found');
        return;
    }
    
    const emailText = emailElement.textContent.trim();
    console.log('Attempting to copy email:', emailText);
    
    // Always try the fallback method first as it's more reliable
    const success = fallbackCopyTextToClipboard(emailText);
    
    if (!success) {
        // If fallback fails, try modern API
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(emailText).then(() => {
                console.log('Modern clipboard API success');
                showCopySuccess();
            }).catch((err) => {
                console.error('All copy methods failed:', err);
                showCopyError(emailText);
            });
        } else {
            console.error('All copy methods failed');
            showCopyError(emailText);
        }
    }
}

// Fallback copy function
function fallbackCopyTextToClipboard(text) {
    console.log('Using fallback copy method for:', text);
    
    let textArea = null;
    
    try {
        // Create textarea element
        textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Make it invisible but accessible
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.width = "2em";
        textArea.style.height = "2em";
        textArea.style.padding = "0";
        textArea.style.border = "none";
        textArea.style.outline = "none";
        textArea.style.boxShadow = "none";
        textArea.style.background = "transparent";
        textArea.style.opacity = "0";
        textArea.style.zIndex = "-1";
        
        document.body.appendChild(textArea);
        
        // Focus and select
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, text.length);
        
        // Try to copy
        const successful = document.execCommand('copy');
        console.log('execCommand result:', successful);
        
        if (successful) {
            console.log('Fallback copy successful');
            showCopySuccess();
            return true;
        } else {
            console.log('execCommand returned false');
            return false;
        }
        
    } catch (err) {
        console.error('Fallback copy error:', err);
        return false;
    } finally {
        // Always clean up
        if (textArea && textArea.parentNode) {
            document.body.removeChild(textArea);
        }
    }
}

// Show copy success message
function showCopySuccess() {
    console.log('Showing copy success feedback'); // Debug log
    const copyBtn = document.querySelector('.copy-btn');
    if (!copyBtn) {
        console.error('Copy button not found');
        return;
    }
    
    const originalHTML = copyBtn.innerHTML;
    const originalBackground = copyBtn.style.background;
    const originalColor = copyBtn.style.color;
    const originalBorder = copyBtn.style.borderColor;
    
    // Change to "Copied" state
    copyBtn.innerHTML = 'Copied';
    copyBtn.style.background = '#dbeafe';
    copyBtn.style.color = '#1d4ed8';
    copyBtn.style.borderColor = '#93c5fd';
    
    // Return to original "Copy" state after 2 seconds
    setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.style.background = originalBackground;
        copyBtn.style.color = originalColor;
        copyBtn.style.borderColor = originalBorder;
    }, 2000);
}

// Show copy error message
function showCopyError(email) {
    console.log('Showing copy error message for:', email);
    alert(`Copy failed. Please copy this email manually:\n\n${email}\n\nSelect the text above and press Ctrl+C (or Cmd+C on Mac)`);
}

// Send email function
function sendEmail() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const project = document.getElementById('project').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields (Name, Email, and Message).');
        return;
    }
    
    // Create mailto URL with pre-filled content
    const subject = encodeURIComponent(`Website Inquiry from ${name}`);
    const body = encodeURIComponent(
        `Hello Leo,\n\n` +
        `My name is ${name} and I'm interested in your website services.\n\n` +
        `Project Type: ${project || 'Website'}\n\n` +
        `Message:\n${message}\n\n` +
        `Best regards,\n${name}\n\n` +
        `---\n` +
        `Email: ${email}`
    );
    
    const mailtoURL = `mailto:jlr083101@outlook.com?subject=${subject}&body=${body}`;
    
    // Open default mail client
    window.location.href = mailtoURL;
}
