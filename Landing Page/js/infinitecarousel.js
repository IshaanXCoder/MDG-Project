document.addEventListener('DOMContentLoaded', function() {
    const logosContainer = document.querySelector('.project-logos');
    const logos = document.querySelectorAll('.logo-container');
    const logosCount = logos.length;
  
    // Clone logos to create an infinite effect
    logos.forEach(logo => {
      const clone = logo.cloneNode(true);
      logosContainer.appendChild(clone);
    });
  
    // Function to auto-scroll
    function autoScroll() {
      const scrollAmount = 1; // Amount to scroll each interval
      const scrollInterval = 20; // Time in ms between scrolls
  
      setInterval(() => {
        logosContainer.scrollLeft += scrollAmount;
  
        // Reset scroll to the start when reaching the end of the first set of logos
        if (logosContainer.scrollLeft >= logosContainer.scrollWidth / 2) {
          logosContainer.scrollLeft = 0;
        }
      }, scrollInterval);
    }
  
    autoScroll(); // Start the auto-scroll
  });