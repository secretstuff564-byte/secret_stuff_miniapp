// static/snow.js
(function() {
    const SNOW_COUNT = 80;          // количество снежинок
    const container = document.createElement('div');
    container.id = 'snow-container';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    document.body.appendChild(container);

    for (let i = 0; i < SNOW_COUNT; i++) {
        const snowflake = document.createElement('div');
        const size = Math.random() * 8 + 4; // от 4 до 12px
        const left = Math.random() * 100;   // случайное горизонтальное положение
        const duration = Math.random() * 8 + 6; // от 6 до 14 секунд
        const delay = Math.random() * 10;    // задержка до 10 секунд

        snowflake.style.cssText = `
            position: absolute;
            top: -10px;
            left: ${left}%;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            opacity: ${Math.random() * 0.6 + 0.4};
            animation: snowfall ${duration}s linear ${delay}s infinite;
            filter: blur(${Math.random() * 2}px);
        `;
        container.appendChild(snowflake);
    }

    // Добавляем CSS-анимацию, если ещё не добавлена
    if (!document.getElementById('snow-styles')) {
        const style = document.createElement('style');
        style.id = 'snow-styles';
        style.textContent = `
            @keyframes snowfall {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                }
                100% {
                    transform: translateY(100vh) translateX(${Math.random() * 60 - 30}px) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
})();