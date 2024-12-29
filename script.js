document.addEventListener('DOMContentLoaded', function () {

    // --- Helper Functions ---
    function toggleMobileMenu(hamburger, navMobile) {
        navMobile.classList.toggle('nav-mobile--open');
        hamburger.classList.toggle('hamburger--active');
    }

    function closeMobileMenu(hamburger, navMobile) {
        if (navMobile && navMobile.classList.contains('nav-mobile--open')) {
          navMobile.classList.remove('nav-mobile--open');
           hamburger.classList.remove('hamburger--active');
       }
    }

   function updateServiceValue(serviceCheckboxes, serviceInput) {
        const checkedValues = Array.from(serviceCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => {
                 const foodInput = document.getElementById(checkbox.id.replace('meal-', '') + '-food');
                 return checkbox.value + (foodInput && foodInput.value ? ` (${foodInput.value})` : '');
             });

        serviceInput.value = checkedValues.join(', ');
        return serviceInput.value
    }

   function setupServiceChecklist(serviceInput) {
        const serviceCheckboxes = document.querySelectorAll(`input[name="service_options"]`);
        serviceCheckboxes.forEach(checkbox => {
          const foodInput = document.getElementById(checkbox.id.replace('meal-', '') + '-food');

          checkbox.addEventListener('change', () => {
              if (checkbox.checked) {
                  if(foodInput){
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


  function handleFormSubmit(form, reviewOverlay, serviceInput){
       // Find the button with class btn-quote
      const submitButton = document.querySelector('.btn-book')

      submitButton.addEventListener('click', function(event) {
          event.preventDefault();

           // Get all required fields
          const requiredFields = form.querySelectorAll('[required]');

            // Check if at least one required field is empty
            const isAnyFieldEmpty = Array.from(requiredFields).some(field => field.value.trim() === '');

           if (!serviceInput.value) {
               alert('Please select at least one service.');
               return;
            }
           if(isAnyFieldEmpty){
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
          populateReviewOverlay(reviewOverlay, formData)
        });
    }



      function setupSmoothScrolling(navMobile, hamburger) {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1); // Remove the '#'
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });

                   closeMobileMenu(hamburger, navMobile);
                }
            });
        });
    }

    function setupMobileNavLinks(navMobile, hamburger) {
        const navMobileLinks = document.querySelectorAll('.nav-mobile a');
            navMobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                   closeMobileMenu(hamburger, navMobile);
            });
        });
     }


    function setupFadeInServiceItems(){
        const serviceItems = document.querySelectorAll('.service-item.fade-in');
        if(serviceItems) {
           const observer = new IntersectionObserver(entries => {
             entries.forEach(entry => {
                if(entry.isIntersecting) {
                entry.target.classList.add('fade-in--active');
                observer.unobserve(entry.target);
                 }
                });
                }, {
                    threshold: 0.2
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


    // --- Initialization ---
    const hamburger = document.querySelector('.hamburger');
    const navMobile = document.querySelector('.nav-mobile');
    const serviceInput = document.getElementById('service');
    const form = document.querySelector('.booking-form');
    const reviewOverlay = document.querySelector('.review-overlay');
    const closeReviewButton = document.querySelector('.btn-close-review');
    const finalSubmitButton = document.querySelector('.btn-submit-final');


     // Mobile Menu
    hamburger.addEventListener('click', () => toggleMobileMenu(hamburger, navMobile));

     document.addEventListener('click', (event) => {
        if (navMobile.classList.contains('nav-mobile--open')) {
            const isClickInsideMenu = navMobile.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            if (!isClickInsideMenu && !isClickOnHamburger) {
                 closeMobileMenu(hamburger,navMobile);
            }
        }
     });
    markRequiredFields(); // Call the marking function here
    setupServiceChecklist(serviceInput);
    handleFormSubmit(form, reviewOverlay, serviceInput);


    closeReviewButton.addEventListener('click', () => reviewOverlay.classList.remove('active'));
    finalSubmitButton.addEventListener('click', () => {
        reviewOverlay.classList.remove('active');
       form.submit();
    });

     setupSmoothScrolling(navMobile, hamburger);
     setupMobileNavLinks(navMobile, hamburger);
     setupFadeInServiceItems();
     logCurrentPage();
});