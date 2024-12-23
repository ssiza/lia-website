document.addEventListener('DOMContentLoaded', function() {


  // Get the hamburger menu and mobile menu elements
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');

  // Add an event listener to the hamburger menu
  hamburger.addEventListener('click', () => {
    // Toggle the mobile menu
    navMobile.classList.toggle('nav-mobile--open');
    hamburger.classList.toggle('hamburger--active'); // Toggle hamburger icon animation
  });


  // Add an event listener to the document to close the mobile menu if clicked outside
    document.addEventListener('click', (event) => {
        if (navMobile.classList.contains('nav-mobile--open')) {  // only close if menu is open
        const isClickInsideMenu = navMobile.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
            if (!isClickInsideMenu && !isClickOnHamburger) {
              navMobile.classList.remove('nav-mobile--open');
              hamburger.classList.remove('hamburger--active');
            }
        }

    });







  // --- Smooth Scrolling for Anchor Links ---
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

              // Close the mobile nav on click if it's open
              if (navMobile && navMobile.classList.contains('nav-mobile--open')) {
              navMobile.classList.remove('nav-mobile--open');
                hamburger.classList.remove('hamburger--active');
            }
           }
      });
  });

//--- Automatically close the Mobile Navigation menu on selection on mobile mode.
const navMobileLinks = document.querySelectorAll('.nav-mobile a');

  navMobileLinks.forEach(link => {
     link.addEventListener('click', function() {
          if (navMobile && navMobile.classList.contains('nav-mobile--open')) {
              navMobile.classList.remove('nav-mobile--open');
               hamburger.classList.remove('hamburger--active');
          }
      });
  });

  // --- Fade-In Service Items (Main Page) ---
   const serviceItems = document.querySelectorAll('.service-item.fade-in');
   if (serviceItems) {
      const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('fade-in--active');
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.2 }); // Threshold defines when it triggers
  serviceItems.forEach(item => observer.observe(item));
 }

 //--- Console log for each page for debugging ---
 if (window.location.pathname.includes('index.html')) {
        console.log('This is the main page!');
      } else if (window.location.pathname.includes('cleaning-tasks.html')) {
        console.log('This is the cleaning tasks page!');
      } else if (window.location.pathname.includes('laundry.html')) {
        console.log('This is the laundry page!');
       }
        else if (window.location.pathname.includes('meal-preparation.html')) {
        console.log('This is the meal prep page!');
       }
         else if (window.location.pathname.includes('shopping.html')) {
        console.log('This is the shopping page!');
       }
       else if (window.location.pathname.includes('services.html')){
         console.log('This is the services page');
        }
        else if (window.location.pathname.includes('about.html')){
          console.log('This is the about page');
        }

});
