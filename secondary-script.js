// Secondary Pages Script
document.addEventListener('DOMContentLoaded', function() {
    console.log("This is the secondary script!");
    
    // Add mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMobile = document.querySelector('.nav-mobile');
    const overlay = document.querySelector('.overlay');
    
    // Log current page for debugging
    console.log("This is the " + document.title.split(" - ")[0].toLowerCase() + " page!");
    
    // If mobile menu elements exist, set up the toggle functionality
    if (hamburger && navMobile && overlay) {
        hamburger.addEventListener('click', function() {
            toggleMobileMenu(hamburger, navMobile, overlay);
        });
        
        overlay.addEventListener('click', function() {
            closeMobileMenu(hamburger, navMobile, overlay);
        });
        
        // Close menu when clicking a navigation link
        const mobileLinks = navMobile.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu(hamburger, navMobile, overlay);
            });
        });
    }
    
    // Set up smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Add scroll animations
    setupScrollAnimations();
});

// Toggle mobile menu
function toggleMobileMenu(hamburger, navMobile, overlay) {
    hamburger.classList.toggle('active');
    navMobile.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Prevent background scrolling when menu is open
    if (navMobile.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close mobile menu
function closeMobileMenu(hamburger, navMobile, overlay) {
    hamburger.classList.remove('active');
    navMobile.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Set up smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Set up scroll animations
function setupScrollAnimations() {
    // Add scroll event listener to handle header transformation
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Add fade-in animation to elements when they come into view
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    }
}

// Function to handle email form submission
function openEmailApp(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const mailtoLink = `mailto:info@liahomeservices.com?subject=Website Inquiry from ${name}&body=${message}%0A%0A${name}%0A${email}`;
    
    window.location.href = mailtoLink;
}
