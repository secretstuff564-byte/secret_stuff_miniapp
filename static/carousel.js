// carousel.js – автопрокрутка и точки для витрины
document.addEventListener('DOMContentLoaded', function() {
    const slide = document.querySelector('.carousel-slide');
    const cards = document.querySelectorAll('.carousel-card');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;
    let autoInterval;
    const intervalTime = 4000; // 4 секунды

    // Создаём точки для каждого товара
    cards.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= cards.length) index = 0;
        currentIndex = index;
        const offset = -currentIndex * 100;
        slide.style.transform = `translateX(${offset}%)`;
        updateDots();
        resetAutoPlay();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function resetAutoPlay() {
        if (autoInterval) clearInterval(autoInterval);
        autoInterval = setInterval(nextSlide, intervalTime);
    }

    // Останавливаем автопрокрутку при наведении на карусель
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => {
        if (autoInterval) clearInterval(autoInterval);
    });
    carousel.addEventListener('mouseleave', resetAutoPlay);

    // Запускаем автопрокрутку
    resetAutoPlay();
});
// Чтобы точки не останавливали автопрокрутку (если нужно, чтобы останавливали, пропустите)
dotsContainer.addEventListener('mouseenter', () => {
    if (autoInterval) clearInterval(autoInterval);
});
dotsContainer.addEventListener('mouseleave', resetAutoPlay); 