let slideIndex = 0;

function showSlides(nextSlideIndex) {
  const slides = document.getElementsByClassName('slide');
  const slideIndexForShow = nextSlideIndex !== 0 || nextSlideIndex > slides.length
    ? slides.length - 1
    : 0;

  for (let i = 0; i < slides.length; i += 1) {
    slides[i].style.display = 'none';
  }

  slides[slideIndexForShow].style.display = 'block';
}

const buttonPrev = document.getElementById('prev-button');
const buttonNext = document.getElementById('next-button');

buttonPrev.addEventListener('click', () => {
  slideIndex -= 1;
  showSlides(slideIndex);
});

buttonNext.addEventListener('click', () => {
  slideIndex += 1;
  showSlides(slideIndex);
});

showSlides(slideIndex);
