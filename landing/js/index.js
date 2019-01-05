let slideIndex = 1;

function showSlides(n) {
  let i;
  let x = document.getElementsByClassName('slide');

  if (n > x.length) {
	slideIndex = x.length;
  } else if (n < 1) {
	slideIndex = 1;
  }
  
  for (i = 0; i < x.length; i++) {
	x[i].style.display = 'none';
  }
  
  x[slideIndex - 1].style.display = 'block';
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

const buttonPrev = document.getElementById('prev-button');
const buttonNext = document.getElementById('next-button');

buttonPrev.addEventListener('click', () => plusSlides(-1));
buttonNext.addEventListener('click', () => plusSlides(1));

plusSlides(slideIndex);
