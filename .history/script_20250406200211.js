document.addEventListener('DOMContentLoaded', function () {
    // --- Helper Functions ---
    function toggleMobileMenu(hamburger, navMobile, overlay) {
        hamburger.classList.toggle('active');
        navMobile.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    function closeMobileMenu(hamburger, navMobile, overlay) {
        if (navMobile && navMobile.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
    
    // Testimonial carousel functionality
    function setupTestimonialCarousel() {
        const slider = document.querySelector('.testimonial-slider');
        const prevButton = document.querySelector('.testimonial-prev');
        const nextButton = document.querySelector('.testimonial-next');
        const dotsContainer = document.querySelector('.testimonial-dots');
        
        if (!slider || !prevButton || !nextButton || !dotsContainer) return;
        
        const slides = Array.from(slider.querySelectorAll('.testimonial-slide'));
        let currentSlide = 0;
        
        // Create dot indicators
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        });
        
        const dots = Array.from(dotsContainer.querySelectorAll('.testimonial-dot'));
        
        // Set the first slide as active
        slides[0].classList.add('active');
        
        // Navigate to a specific slide
        function goToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            // Update current slide
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = index;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            
            // Scroll to the current slide
            slider.scrollLeft = slides[currentSlide].offsetLeft;
        }
        
        // Event listeners for controls
        prevButton.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
        
        nextButton.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
        
        // Automatic slide change
        let slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
        
        // Pause auto-sliding when hovering over the carousel
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goToSlide(currentSlide - 1);
            } else if (e.key === 'ArrowRight') {
                goToSlide(currentSlide + 1);
            }
        });
        
        // Set initial slide
        goToSlide(0);
    }

    function updateServiceValue(serviceCheckboxes, serviceInput) {
        const checkedValues = Array.from(serviceCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => {
                const foodInput = document.getElementById(checkbox.id.replace('meal-', '') + '-food');
                return checkbox.value + (foodInput && foodInput.value ? ` (${foodInput.value})` : '');
            });

        serviceInput.value = checkedValues.join(', ');
        return serviceInput.value;
    }

    function setupServiceChecklist(serviceInput) {
        const serviceCheckboxes = document.querySelectorAll(`input[name="service_options"]`);
        serviceCheckboxes.forEach(checkbox => {
            const foodInput = document.getElementById(checkbox.id.replace('meal-', '') + '-food');

            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    if (foodInput) {
                        foodInput.style.display = 'inline-block';
                    }
                } else {
                    if (foodInput) {
                        foodInput.style.display = 'none';
                        foodInput.value = "";
                    }
                }
                serviceInput.value = updateServiceValue(serviceCheckboxes, serviceInput);
            });
        });

        // Set the initial value of the hidden input
        serviceInput.value = "";
        updateServiceValue(serviceCheckboxes, serviceInput);
    }

    function populateReviewOverlay(reviewOverlay, formData) {
        document.querySelector('#review-name').textContent = formData.name;
        document.querySelector('#review-address').textContent = formData.address;
        document.querySelector('#review-postal-code').textContent = formData.postalCode;
        document.querySelector('#review-phone').textContent = formData.phone;
        document.querySelector('#review-email').textContent = formData.email;
        document.querySelector('#review-service').textContent = formData.service;
        document.querySelector('#review-date').textContent = formData.date;
        document.querySelector('#review-time').textContent = formData.time;
        document.querySelector('#review-notes').textContent = formData.notes;
        reviewOverlay.classList.add('active');
    }

    function handleFormSubmit(form, reviewOverlay, serviceInput) {
        const submitButton = document.querySelector('.btn-book');

        if (submitButton) {
            submitButton.addEventListener('click', function (event) {
                event.preventDefault();

                const requiredFields = form.querySelectorAll('[required]');
                const isAnyFieldEmpty = Array.from(requiredFields).some(field => field.value.trim() === '');

                if (!serviceInput.value) {
                    alert('Please select at least one service.');
                    return;
                }
                if (isAnyFieldEmpty) {
                    alert('Please fill in all required fields.');
                    return;
                }

                const formData = {
                    name: document.querySelector('#name').value,
                    address: document.querySelector('#address').value,
                    postalCode: document.querySelector('#postal_code').value,
                    phone: document.querySelector('#phone').value,
                    email: document.querySelector('#email').value,
                    service: serviceInput.value,
                    date: document.querySelector('#date').value,
                    time: document.getElementById('time').options[document.getElementById('time').selectedIndex].text,
                    notes: document.querySelector('#notes').value
                };
                populateReviewOverlay(reviewOverlay, formData);
            });
        }
    }

    function setupSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    function setupFadeInServiceItems() {
        const serviceItems = document.querySelectorAll('.service-item');
        if (serviceItems.length > 0) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Add staggered delay for each item
                        setTimeout(() => {
                            entry.target.classList.add('fade-in');
                        }, index * 150);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            serviceItems.forEach(item => observer.observe(item));
        }
    }

    function logCurrentPage() {
        const pageInfo = {
            'index.html': 'This is the main page!',
            'cleaning-tasks.html': 'This is the cleaning tasks page!',
            'laundry.html': 'This is the laundry page!',
            'meal-preparation.html': 'This is the meal prep page!',
            'shopping.html': 'This is the shopping page!',
            'services.html': 'This is the services page!',
            'about.html': 'This is the about page!'
        };

        const currentPage = Object.keys(pageInfo).find(page => window.location.pathname.includes(page));
        if (currentPage) {
            console.log(pageInfo[currentPage]);
        }
    }

    function markRequiredFields() {
        const requiredFields = document.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            const label = document.querySelector(`label[for="${field.id}"]`);
            if (label && !label.innerHTML.includes('*')) {
                label.innerHTML += ' <span style="color: red;">*</span>';
            }
        });
    }
    
    function setupScrollAnimations() {
        // Select elements to animate on scroll
        const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
        
        if (elementsToAnimate.length > 0) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const animationType = entry.target.dataset.animation || 'fade-in';
                        entry.target.classList.add(animationType);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            elementsToAnimate.forEach(element => observer.observe(element));
        }
    }

    // --- Initialization ---
    const navMobile = document.querySelector('.nav-mobile');
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.overlay');
    const serviceInput = document.getElementById('service');
    const form = document.querySelector('.booking-form');
    const reviewOverlay = document.querySelector('.review-overlay');
    const closeReviewButton = document.querySelector('.btn-close-review');
    const finalSubmitButton = document.querySelector('.btn-submit-final');

    if (hamburger && navMobile && overlay) {
        hamburger.addEventListener("click", () => {
            toggleMobileMenu(hamburger, navMobile, overlay);
        });
        
        overlay.addEventListener("click", () => {
            closeMobileMenu(hamburger, navMobile, overlay);
        });
    }

    if (closeReviewButton) {
        closeReviewButton.addEventListener('click', () => reviewOverlay.classList.remove('active'));
    }

    if (finalSubmitButton) {
        finalSubmitButton.addEventListener('click', () => {
            reviewOverlay.classList.remove('active');
            form.submit();
        });
    }

    if (serviceInput && form) {
        setupServiceChecklist(serviceInput);
        handleFormSubmit(form, reviewOverlay, serviceInput);
    }

    // Parallax effect for hero section
    function setupParallaxEffect() {
        const parallaxBg = document.querySelector('.parallax-bg');
        if (parallaxBg) {
            // Get the parallax speed from CSS custom property
            const style = getComputedStyle(document.documentElement);
            const parallaxSpeed = parseFloat(style.getPropertyValue('--parallax-speed') || 0.4);
            
            window.addEventListener('scroll', function() {
                const scrollPosition = window.pageYOffset;
                // Move the background at a slower rate than the scroll speed
                parallaxBg.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
            });
        }
    }

    markRequiredFields();
    setupSmoothScrolling();
    setupFadeInServiceItems();
    setupScrollAnimations();
    setupTestimonialCarousel();
    setupParallaxEffect();
    logCurrentPage();

    // Ensure bottom navigation links work correctly
    const bottomNavLinks = document.querySelectorAll('.bottom-nav a');
    bottomNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Allow default navigation behavior
        });
    });
    
    // Add event listeners to mobile nav links to close menu when clicked
    const mobileNavLinks = document.querySelectorAll('.nav-mobile a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu(hamburger, navMobile, overlay);
        });
    });

    // Update the year dynamically in the footer
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
// Enhanced animations and scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollTopButton = document.querySelector('.scroll-top');
    
    if (scrollTopButton) {
        // Show/hide the button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopButton.classList.add('active');
            } else {
                scrollTopButton.classList.remove('active');
            }
        });
        
        // Scroll to top when button is clicked
        scrollTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animate fade-in elements when they come into view
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(element => fadeObserver.observe(element));
    }
    
    // Hero section scroll effects already handled by setupParallaxEffect()
    
    // Sticky header effect - add class when scrolled
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});

// Add section reveal animations
function setupSectionAnimations() {
  const sections = document.querySelectorAll('section');
  
  const revealSection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        observer.unobserve(entry.target);
      }
    });
  };
  
  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });
  
  sections.forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
  });
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupSectionAnimations();
});
