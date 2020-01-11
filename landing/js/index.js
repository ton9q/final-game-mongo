let currentSlideIndex = 0;
const slides = document.getElementsByClassName('slide');

function showSlides(nextSlideIndex) {
  if (nextSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  } else if (nextSlideIndex > slides.length - 1) {
    currentSlideIndex = 0;
  } else {
    currentSlideIndex = nextSlideIndex;
  }

  for (let i = 0; i < slides.length; i += 1) {
    slides[i].style.display = 'none';
  }

  slides[currentSlideIndex].style.display = 'block';
}

const buttonPrev = document.getElementById('prev-button');
const buttonNext = document.getElementById('next-button');

buttonPrev.addEventListener('click', () => {
  currentSlideIndex -= 1;
  showSlides(currentSlideIndex);
});

buttonNext.addEventListener('click', () => {
  currentSlideIndex += 1;
  showSlides(currentSlideIndex);
});

showSlides(currentSlideIndex);
