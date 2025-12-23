// Клик по кнопке украинского языка
$('.lang__btn--ua').on('click', function () {
    localStorage.setItem('scrollPos', $(window).scrollTop());
    localStorage.setItem('scrollPath', window.location.pathname.replace(/^\/ru/, ''));
    localStorage.setItem('lang', 'ua');
    window.location.href = window.location.pathname.replace(/^\/ru/, '');
});

// Восстановление скролла после смены языка
$(window).on('load', function () {
    const scrollPos = parseInt(localStorage.getItem('scrollPos'), 10);
    const scrollPath = localStorage.getItem('scrollPath');

    if (!isNaN(scrollPos) && scrollPath === window.location.pathname) {
        // Делаем небольшую задержку, чтобы весь контент прогрузился
        setTimeout(() => {
            $(window).scrollTop(scrollPos);
            // очищаем данные после использования
            localStorage.removeItem('scrollPos');
            localStorage.removeItem('scrollPath');
        }, 50); // 50ms задержка обычно хватает
    }
});

// Попап на русской версии
$(function () {
    if (window.location.pathname.indexOf('/ru') === -1) return;
    if (localStorage.getItem('langPopupShown')) return;

    setTimeout(function () {
        $('#popup-lang').fadeIn();
        localStorage.setItem('langPopupShown', '1');
    }, 15000);
});
