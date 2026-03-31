$(function () {
  $('.form__form').validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      phone: {
        required: true,
        minlength: 5,
        pattern: /^\+?\d{10,15}$/,
      },
      question: {
        required: true,
        maxlength: 300,
      },
    },
    messages: {
        phone: {
          pattern: 'Недійсний формат номера телефону.',
        },
      },
    // submitHandler: function (form) {
    //   $.ajax({
    //     url: '/send.php', // или твой бек
    //     type: 'POST',
    //     data: $(form).serialize(),
    //     success: function () {
    //       alert('Отправлено');
    //     },
    //   });

    //   return false;
    // },
    submitHandler: function (form) {
      // тут твоя логика (AJAX или просто лог)
      console.log('Форма валидна');

      return false; // 🚀 блокируем реальную отправку
    },
  });
  $('.form__group-input[name="question"]').on('input', function () {
    var max = 300;
    var text = $(this).val();

    if (text.length > max) {
      $(this).val(text.substring(0, max));
    }

    var length = $(this).val().length;

    $(this).closest('.form__group').find('.form__group-count__value').text(length);
  });
  //   $('.popup .form').each(function () {
  //     const $form = $(this);
  //     const $popupInner = $form.closest('.popup').find('.popup__inner');

  //     let hideTimeout;

  //     function updateScrollbar() {
  //       const el = $form[0];
  //       const popupInnerEl = $popupInner[0];

  //       if (!el || !popupInnerEl) return;

  //       const scrollHeight = el.scrollHeight;
  //       const clientHeight = el.clientHeight; // Высота видимой части формы
  //       const scrollTop = el.scrollTop;

  //       // Устанавливаем высоту трека = высоте видимой части формы
  //       popupInnerEl.style.setProperty('--track-height', `${clientHeight}px`);

  //       // Проверяем, нужен ли скроллбар
  //       if (scrollHeight <= clientHeight) {
  //         $form.removeClass('scrolling');
  //         popupInnerEl.style.setProperty('--thumb-height', '0px');
  //         return;
  //       }

  //       // Высота ползунка (пропорционально видимой области)
  //       const thumbHeight = Math.max((clientHeight / scrollHeight) * clientHeight, 30);

  //       // Максимальная позиция для ползунка
  //       const maxScrollTop = scrollHeight - clientHeight;
  //       const maxThumbTop = clientHeight - thumbHeight;

  //       // Позиция ползунка (от низа, поэтому инвертируем)
  //       const thumbTop = maxScrollTop > 0 ? (scrollTop / maxScrollTop) * maxThumbTop : 0;

  //       // Применяем CSS переменные
  //       popupInnerEl.style.setProperty('--thumb-height', `${thumbHeight}px`);
  //       popupInnerEl.style.setProperty('--thumb-top', `${thumbTop}px`);
  //     }

  //     // Обработчик прокрутки
  //     $form.on('scroll', function () {
  //       $form.addClass('scrolling');
  //       updateScrollbar();

  //       // Скрываем скроллбар через 1 секунду
  //       clearTimeout(hideTimeout);
  //       hideTimeout = setTimeout(() => {
  //         $form.removeClass('scrolling');
  //       }, 1000);
  //     });

  //     // Инициализация
  //     updateScrollbar();

  //     // Обновление при ресайзе
  //     $(window).on('resize', updateScrollbar);

  //     // Обновление при изменении DOM
  //     const observer = new MutationObserver(updateScrollbar);
  //     if ($form[0]) {
  //       observer.observe($form[0], { childList: true, subtree: true });
  //     }

  //     // Обновление при открытии попапа
  //     const popupObserver = new MutationObserver((mutations) => {
  //       mutations.forEach((mutation) => {
  //         if (mutation.attributeName === 'style') {
  //           const popup = mutation.target;
  //           if (popup.style.display === 'block') {
  //             // Небольшая задержка для корректного расчета после открытия
  //             setTimeout(updateScrollbar, 50);
  //           }
  //         }
  //       });
  //     });

  //     const popup = document.getElementById('popup-rozrahunok');
  //     if (popup) {
  //       popupObserver.observe(popup, { attributes: true });
  //     }
  //   });
});
