$(function () {
  $('.popup .form').each(function () {
    const $form = $(this);
    const $popupInner = $('.popup__inner');
    let hideTimeout;

    function updateScrollbar() {
      const el = $form[0];
      const popupInnerEl = $popupInner[0];

      if (!el || !popupInnerEl) return;

      const scrollHeight = el.scrollHeight;
      const clientHeight = el.clientHeight; // Высота видимой части формы
      const scrollTop = el.scrollTop;

      // Устанавливаем высоту трека = высоте видимой части формы
      popupInnerEl.style.setProperty('--track-height', `${clientHeight}px`);

      // Проверяем, нужен ли скроллбар
      if (scrollHeight <= clientHeight) {
        $form.removeClass('scrolling');
        popupInnerEl.style.setProperty('--thumb-height', '0px');
        return;
      }

      // Высота ползунка (пропорционально видимой области)
      const thumbHeight = Math.max((clientHeight / scrollHeight) * clientHeight, 30);

      // Максимальная позиция для ползунка
      const maxScrollTop = scrollHeight - clientHeight;
      const maxThumbTop = clientHeight - thumbHeight;

      // Позиция ползунка (от низа, поэтому инвертируем)
      const thumbTop = maxScrollTop > 0 ? (scrollTop / maxScrollTop) * maxThumbTop : 0;

      // Применяем CSS переменные
      popupInnerEl.style.setProperty('--thumb-height', `${thumbHeight}px`);
      popupInnerEl.style.setProperty('--thumb-top', `${thumbTop}px`);
    }

    // Обработчик прокрутки
    $form.on('scroll', function () {
      $form.addClass('scrolling');
      updateScrollbar();

      // Скрываем скроллбар через 1 секунду
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        $form.removeClass('scrolling');
      }, 1000);
    });

    // Инициализация
    updateScrollbar();

    // Обновление при ресайзе
    $(window).on('resize', updateScrollbar);

    // Обновление при изменении DOM
    const observer = new MutationObserver(updateScrollbar);
    if ($form[0]) {
      observer.observe($form[0], { childList: true, subtree: true });
    }

    // Обновление при открытии попапа
    const popupObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style') {
          const popup = mutation.target;
          if (popup.style.display === 'block') {
            // Небольшая задержка для корректного расчета после открытия
            setTimeout(updateScrollbar, 50);
          }
        }
      });
    });

    const popup = document.getElementById('popup-rozrahunok');
    if (popup) {
      popupObserver.observe(popup, { attributes: true });
    }
  });
});
