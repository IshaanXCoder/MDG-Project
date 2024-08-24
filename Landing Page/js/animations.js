document.addEventListener('DOMContentLoaded', function() {
    const events = document.querySelectorAll('.event');

    function checkVisibility() {
        const windowHeight = window.innerHeight;

        events.forEach(event => {
            const { top } = event.getBoundingClientRect();

            if (top < windowHeight - 100) { // When the event is near the viewport
                event.querySelector('.event-image').classList.add('animate__animated', 'animate__backInLeft'); // For the image
                event.querySelector('.event-text').classList.add('animate__animated', 'animate__backInRight'); // For the text
                event.style.opacity = '1'; // Make visible
            } else {
                // Remove classes when scrolled out of view
                event.querySelector('.event-image').classList.remove('animate__backInLeft', 'animate__animated');
                event.querySelector('.event-text').classList.remove('animate__backInRight', 'animate__animated');
                event.style.opacity = '0'; // Hide again
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('load', checkVisibility);
});