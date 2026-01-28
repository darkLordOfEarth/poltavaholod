// Фикс для проблемы с layout на iPad при изменении ориентации
// Добавьте этот код в ваш основной JS файл или подключите отдельно

(function() {
    'use strict';
    
    // Функция для принудительного пересчета layout
    function forceMediaReflow() {
        const mediaContainers = document.querySelectorAll('.product__slider-media');
        
        mediaContainers.forEach(container => {
            // Временно меняем display для принудительного reflow
            const originalDisplay = container.style.display;
            container.style.display = 'none';
            
            // Trigger reflow
            void container.offsetHeight;
            
            // Возвращаем display
            container.style.display = originalDisplay || '';
            
            // Проверяем наличие видео для корректного grid
            const hasVideo = container.querySelector('.product__slider-video');
            if (hasVideo) {
                // Принудительно применяем grid-template-columns
                container.style.gridTemplateColumns = '1fr 1fr';
            } else {
                container.style.gridTemplateColumns = '1fr';
            }
        });
    }
    
    // Функция для обновления OWL Carousel
    function refreshOwlCarousel() {
        const owlCarousels = document.querySelectorAll('.product__slider.owl-carousel');
        owlCarousels.forEach(carousel => {
            const $carousel = $(carousel);
            if ($carousel.data('owl.carousel')) {
                $carousel.trigger('refresh.owl.carousel');
            }
        });
    }
    
    // Обработчик изменения ориентации
    let orientationTimeout;
    window.addEventListener('orientationchange', function() {
        clearTimeout(orientationTimeout);
        
        // Первый reflow сразу
        forceMediaReflow();
        
        // Второй reflow после завершения анимации ориентации
        orientationTimeout = setTimeout(function() {
            forceMediaReflow();
            refreshOwlCarousel();
            
            // Третий reflow для надежности (некоторые браузеры медленные)
            setTimeout(forceMediaReflow, 100);
        }, 300);
    });
    
    // Обработчик resize (для полноты)
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(forceMediaReflow, 150);
    });
    
    // ResizeObserver для современных браузеров (включая новые iPad)
    if ('ResizeObserver' in window) {
        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                const container = entry.target;
                const hasVideo = container.querySelector('.product__slider-video');
                
                if (hasVideo) {
                    // Принудительно устанавливаем grid для контейнеров с видео
                    container.style.gridTemplateColumns = '1fr 1fr';
                    
                    // Убеждаемся что дочерние элементы не переполняются
                    const images = container.querySelector('.product__slider-images');
                    const video = container.querySelector('.product__slider-video');
                    
                    if (images) {
                        images.style.minWidth = '0';
                        images.style.width = '100%';
                    }
                    if (video) {
                        video.style.minWidth = '0';
                        video.style.width = '100%';
                    }
                }
            });
        });
        
        // Наблюдаем за всеми медиа-контейнерами
        document.querySelectorAll('.product__slider-media').forEach(container => {
            resizeObserver.observe(container);
        });
    }
    
    // Инициализация при загрузке страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceMediaReflow);
    } else {
        forceMediaReflow();
    }
    
    // Дополнительный фикс для случаев когда OWL Carousel инициализируется позже
    const checkOwlInterval = setInterval(function() {
        const owlLoaded = document.querySelector('.product__slider.owl-loaded');
        if (owlLoaded) {
            clearInterval(checkOwlInterval);
            setTimeout(forceMediaReflow, 100);
        }
    }, 100);
    
    // Очистка интервала через 5 секунд
    setTimeout(function() {
        clearInterval(checkOwlInterval);
    }, 5000);
    
})();