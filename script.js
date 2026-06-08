// ===========================
// ICE CREAM WEBPAGE - INTERACTIVE JAVASCRIPT
// ===========================
// This script adds interactivity to the ice cream webpage including:
// - Form validation and submission
// - Flavor card interactions
// - Dynamic content updates
// - Local storage for favorites
// - Button animations and feedback

// ===========================
// 1. FORM VALIDATION & SUBMISSION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    // Get the form element
    const form = document.querySelector('form');
    
    if (form) {
        // Add form submission handler
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form inputs
            if (validateForm(name, email, message)) {
                // Store form data in local storage
                const formData = { name, email, message, timestamp: new Date().toLocaleString() };
                saveFormData(formData);
                
                // Show success message
                showSuccessMessage();
                
                // Reset form
                form.reset();
                
                // Clear success message after 3 seconds
                setTimeout(clearSuccessMessage, 3000);
            }
        });
        
        // Add real-time validation feedback
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('focus', function() {
                clearInputError(this);
            });
        });
    }
});

// ===========================
// 2. FORM VALIDATION FUNCTIONS
// ===========================

function validateForm(name, email, message) {
    let isValid = true;
    
    // Validate name
    if (name === '') {
        showInputError('name', 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showInputError('name', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        showInputError('email', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showInputError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (message === '') {
        showInputError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showInputError('message', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function validateInput(input) {
    const value = input.value.trim();
    
    switch(input.id) {
        case 'name':
            if (value === '') {
                showInputError('name', 'Name is required');
            } else if (value.length < 2) {
                showInputError('name', 'Name must be at least 2 characters');
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value === '') {
                showInputError('email', 'Email is required');
            } else if (!emailRegex.test(value)) {
                showInputError('email', 'Please enter a valid email address');
            }
            break;
            
        case 'message':
            if (value === '') {
                showInputError('message', 'Message is required');
            } else if (value.length < 10) {
                showInputError('message', 'Message must be at least 10 characters');
            }
            break;
    }
}

function showInputError(inputId, errorMessage) {
    const input = document.getElementById(inputId);
    const formGroup = input.parentElement;
    
    // Remove existing error if present
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    input.style.borderColor = '#ff6f91';
    input.style.backgroundColor = '#ffe8f0';
    
    // Create and add error message
    const errorMsg = document.createElement('span');
    errorMsg.className = 'error-message';
    errorMsg.textContent = errorMessage;
    errorMsg.style.color = '#ff6f91';
    errorMsg.style.fontSize = '12px';
    errorMsg.style.display = 'block';
    errorMsg.style.marginTop = '5px';
    formGroup.appendChild(errorMsg);
}

function clearInputError(input) {
    const formGroup = input.parentElement;
    const errorMsg = formGroup.querySelector('.error-message');
    
    if (errorMsg) {
        errorMsg.remove();
    }
    
    input.style.borderColor = '';
    input.style.backgroundColor = '';
}

function showSuccessMessage() {
    const form = document.querySelector('form');
    
    // Create success message element
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = '✓ Message sent successfully! Thank you for contacting us.';
    successMsg.style.backgroundColor = '#d4edda';
    successMsg.style.color = '#155724';
    successMsg.style.padding = '15px 20px';
    successMsg.style.borderRadius = '8px';
    successMsg.style.marginBottom = '20px';
    successMsg.style.border = '1px solid #c3e6cb';
    successMsg.style.fontSize = '16px';
    successMsg.style.fontWeight = 'bold';
    successMsg.style.animation = 'slideIn 0.5s ease-out';
    
    form.parentElement.insertBefore(successMsg, form);
}

function clearSuccessMessage() {
    const successMsg = document.querySelector('.success-message');
    if (successMsg) {
        successMsg.remove();
    }
}

// ===========================
// 3. LOCAL STORAGE FUNCTIONS
// ===========================

function saveFormData(formData) {
    try {
        let allSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
        allSubmissions.push(formData);
        localStorage.setItem('formSubmissions', JSON.stringify(allSubmissions));
        console.log('Form data saved successfully!');
    } catch (error) {
        console.error('Error saving form data:', error);
    }
}

function getFavoriteFlavorCount() {
    try {
        return JSON.parse(localStorage.getItem('favoriteCount')) || 0;
    } catch (error) {
        return 0;
    }
}

function saveFlavor(flavorName) {
    try {
        let favorites = JSON.parse(localStorage.getItem('favoriteFlavorsList')) || [];
        if (!favorites.includes(flavorName)) {
            favorites.push(flavorName);
            localStorage.setItem('favoriteFlavorsList', JSON.stringify(favorites));
        }
    } catch (error) {
        console.error('Error saving flavor:', error);
    }
}

// ===========================
// 4. FLAVOR CARD INTERACTIONS
// ===========================

function initializeFlavorCards() {
    const flavorCards = document.querySelectorAll('.flavor-card');
    
    flavorCards.forEach((card, index) => {
        // Add hover effects
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
        
        // Add click interaction - show flavor details
        card.addEventListener('click', function() {
            showFlavorDetails(this);
        });
        
        // Add data attribute for tracking
        if (!card.hasAttribute('data-flavor-id')) {
            card.setAttribute('data-flavor-id', index + 1);
        }
    });
}

function showFlavorDetails(card) {
    const flavorName = card.querySelector('h3').textContent;
    const flavorDesc = card.querySelector('p').textContent;
    
    // Show alert with flavor info
    alert(`🍦 ${flavorName}\n\n${flavorDesc}\n\nAdded to favorites!`);
    
    // Save to favorites
    saveFlavor(flavorName);
    
    // Add visual feedback - highlight the card briefly
    card.style.backgroundColor = '#ffe8f0';
    setTimeout(() => {
        card.style.backgroundColor = '';
    }, 500);
}

// ===========================
// 5. BUTTON INTERACTIONS
// ===========================

function initializeButtons() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        // Enhance button styling
        button.style.transition = 'all 0.3s ease';
        button.style.fontWeight = 'bold';
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 4px 12px rgba(255, 111, 145, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
        
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// ===========================
// 6. NAVIGATION INTERACTIONS
// ===========================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.style.transition = 'all 0.3s ease';
        link.style.cursor = 'pointer';
        
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
            this.style.transform = 'scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
            this.style.transform = 'scale(1)';
        });
    });
}

// ===========================
// 7. DYNAMIC CONTENT COUNTER
// ===========================

function initializeDynamicCounter() {
    // Add a visitor counter to the footer
    const footer = document.querySelector('.footer');
    
    if (footer && !footer.querySelector('.visitor-counter')) {
        // Get visitor count from local storage
        let visitCount = parseInt(localStorage.getItem('visitCount')) || 0;
        visitCount++;
        localStorage.setItem('visitCount', visitCount);
        
        // Create counter element
        const counter = document.createElement('div');
        counter.className = 'visitor-counter';
        counter.innerHTML = `<small>You have visited this page ${visitCount} time(s)</small>`;
        counter.style.marginTop = '10px';
        counter.style.fontSize = '12px';
        counter.style.opacity = '0.8';
        
        footer.appendChild(counter);
    }
}

// ===========================
// 8. PAGE TRANSITION EFFECTS
// ===========================

function addPageTransitionEffects() {
    // Add fade-in animation to page content
    const sections = document.querySelectorAll('section, .info-section, .flavors-section, .contact-section, .about-section');
    
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.animation = `fadeIn 0.8s ease-out ${index * 0.1}s forwards`;
    });
}

// Add CSS animation keyframes dynamically
function addCSSAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideIn {
            from {
                transform: translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(255, 111, 145, 0.7);
            }
            50% {
                box-shadow: 0 0 0 10px rgba(255, 111, 145, 0);
            }
        }
        
        .btn:active {
            animation: pulse 0.5s ease-out;
        }
    `;
    document.head.appendChild(style);
}

// ===========================
// 9. SUMMARY & STATS DISPLAY
// ===========================

function displayPageStats() {
    console.log('===== ICE CREAM WEBPAGE STATS =====');
    console.log('Favorite Flavors: ' + JSON.stringify(JSON.parse(localStorage.getItem('favoriteFlavorsList')) || []));
    console.log('Visit Count: ' + (localStorage.getItem('visitCount') || 0));
    console.log('Form Submissions: ' + (JSON.parse(localStorage.getItem('formSubmissions')) || []).length);
    console.log('===================================');
}

// ===========================
// 10. MAIN INITIALIZATION
// ===========================

// Initialize all features when page loads
window.addEventListener('load', function() {
    console.log('🍦 Sweet Scoop Webpage - Interactive Features Loaded!');
    
    // Add CSS animations
    addCSSAnimations();
    
    // Initialize all interactive elements
    initializeFlavorCards();
    initializeButtons();
    initializeNavigation();
    addPageTransitionEffects();
    initializeDynamicCounter();
    initializeHeroImageAnimation();
    
    // Display statistics
    displayPageStats();
});

// ===========================
// 11. HERO IMAGE MOTION
// ===========================

function initializeHeroImageAnimation() {
    const heroImage = document.querySelector('.hero-image img');
    if (!heroImage) {
        return;
    }

    let offset = 0;
    let direction = 1;
    let isHovered = false;

    function animate() {
        if (!isHovered) {
            offset += direction * 0.12;
            if (offset > 12 || offset < -12) {
                direction *= -1;
            }
            heroImage.style.transform = `translateY(${offset}px) rotate(${offset / 6}deg)`;
        }
        requestAnimationFrame(animate);
    }

    heroImage.addEventListener('mouseenter', function() {
        isHovered = true;
        heroImage.style.transform = 'translateY(0) scale(1.02)';
    });

    heroImage.addEventListener('mouseleave', function() {
        isHovered = false;
    });

    animate();
}

// Log when user leaves page
window.addEventListener('beforeunload', function() {
    console.log('Thanks for visiting Sweet Scoop! Come back soon! 🍦');
});

// ===========================
// KEYBOARD SHORTCUTS
// ===========================

document.addEventListener('keydown', function(event) {
    // Press '?' to show keyboard shortcuts
    if (event.key === '?') {
        alert('Keyboard Shortcuts:\n\n' +
              '? - Show this help\n' +
              'H - Go to Home\n' +
              'F - Go to Flavors\n' +
              'A - Go to About\n' +
              'C - Go to Contact');
    }
    
    // Keyboard navigation
    if (event.ctrlKey || event.metaKey) {
        switch(event.key.toLowerCase()) {
            case 'h':
                window.location.href = 'html/index.html';
                break;
            case 'f':
                window.location.href = 'html/flavors.html';
                break;
            case 'a':
                window.location.href = 'html/about.html';
                break;
            case 'c':
                window.location.href = 'html/contact.html';
                break;
        }
    }
});
