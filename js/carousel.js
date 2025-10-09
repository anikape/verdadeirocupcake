document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel');
  const items = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const indicatorsContainer = document.getElementById('indicators');
  let currentIndex = 0;

  // Cria os indicadores
  items.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('indicator');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(dot);
  });

  const indicators = document.querySelectorAll('.indicator');

  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Opcional: autoplay (descomente para ativar)
  // let autoSlide = setInterval(nextSlide, 5000);
  // carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
  // carousel.addEventListener('mouseleave', () => {
  //   autoSlide = setInterval(nextSlide, 5000);
  // });
});