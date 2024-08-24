const slideshowContainer = document.querySelector('.scrolling-wrapper');
const slides = document.querySelectorAll('.mySlides');

function duplicateSlides() {
  const slideCount = slides.length;
  for (let i = 0; i < slideCount; i++) {
    const clone = slides[i].cloneNode(true);
    slideshowContainer.appendChild(clone);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  duplicateSlides();
});