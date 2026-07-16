// products.js - смена фото + избранное (localStorage)

document.addEventListener('DOMContentLoaded', () => {
    // ----- 1. Смена фото при наведении (карусель) -----
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const imagesAttr = card.getAttribute('data-images');
        if (!imagesAttr) return;

        let imagesList = imagesAttr.split(',').map(s => s.trim());
        if (imagesList.length < 2) return;

        const imgElement = card.querySelector('.card-image img');

        if (imgElement && imagesList[0]) {
            imgElement.src = '/static/' + imagesList[0];
        }

        let currentIndex = 0;
        let hoverTimer = null;

        const changeImage = (index) => {
            if (index >= imagesList.length) index = 0;
            if (index < 0) index = imagesList.length - 1;
            const newSrc = '/static/' + imagesList[index];
            if (imgElement.src !== newSrc && newSrc) {
                imgElement.style.opacity = '0';
                setTimeout(() => {
                    imgElement.src = newSrc;
                    imgElement.style.opacity = '1';
                }, 150);
            }
            return index;
        };

        card.addEventListener('mouseenter', () => {
            if (hoverTimer) clearInterval(hoverTimer);
            hoverTimer = setInterval(() => {
                currentIndex = (currentIndex + 1) % imagesList.length;
                changeImage(currentIndex);
            }, 600);
        });

        card.addEventListener('mouseleave', () => {
            if (hoverTimer) {
                clearInterval(hoverTimer);
                hoverTimer = null;
            }
            currentIndex = 0;
            changeImage(0);
        });
    });

    // ----- 2. Логика избранного (localStorage) -----
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    function updateFavoriteButton(btn, isFavorite) {
        const img = btn.querySelector('img');
        if (isFavorite) {
            btn.classList.add('active');
            if (img) img.src = '/static/filled.png';
        } else {
            btn.classList.remove('active');
            if (img) img.src = '/static/izbrannoe.png';
        }
    }

    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const card = btn.closest('.product-card');
        if (card) {
            const id = parseInt(card.getAttribute('data-id'));
            if (favorites.includes(id)) {
                updateFavoriteButton(btn, true);
            } else {
                updateFavoriteButton(btn, false);
            }
        }
    });

    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const card = btn.closest('.product-card');
            const id = parseInt(card.getAttribute('data-id'));
            const index = favorites.indexOf(id);
            if (index === -1) {
                favorites.push(id);
                updateFavoriteButton(btn, true);
            } else {
                favorites.splice(index, 1);
                updateFavoriteButton(btn, false);
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
            console.log('Избранное обновлено:', favorites);
        });
    });
});