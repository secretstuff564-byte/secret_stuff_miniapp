document.addEventListener('DOMContentLoaded', function() {
    const topBar = document.querySelector('.top-bar');
    if (!topBar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const currentScrollY = window.scrollY;
                if (currentScrollY > 300) {
                    topBar.classList.add('top-bar-hidden');
                } else {
                    topBar.classList.remove('top-bar-hidden');
                }
                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    });
});