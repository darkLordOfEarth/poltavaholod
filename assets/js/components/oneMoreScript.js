$(function () {
  // var windowWidth = window.innerWidth;
  // var windowHeight = window.innerHeight;
  // alert('width:' + windowWidth + ' ' + 'height:' + windowHeight);

  function checkHeaderScroll() {
    if ($(window).scrollTop() > 50) {
      $('header').addClass('scrolled');
    } else {
      $('header').removeClass('scrolled');
    }
    let mainHeight = $('.main').outerHeight();
    if ($(window).scrollTop() > 0) {
      $('.main__group-btns').addClass('scrolled');
    } else {
      $('.main__group-btns').removeClass('scrolled');
    }
  }

  $(window).on('scroll', checkHeaderScroll);
  $(window).on('load', checkHeaderScroll);

  $('.virtualTour__toggle-btn').on('click', function () {
    $('.virtualTour__toggle-btn').removeClass('active');
    $(this).addClass('active');
    let video = $(this).attr('data-video');
    let link = $(this).attr('data-link');
    let elem = $('.virtualTour .video-element');
    let btn = $('.virtualTour__link');
    elem.attr('src', video);
    btn.attr('href', link);
    let $play = $(this).parents('.virtualTour').find('.play__btn');
    $play.fadeIn(150);
  });
$(".temporary-btn").on("click", function() {
  $(this).parents(".virtualTour").find(".videoBlockWrapper").addClass("temporary-img")
})
$(".temporary-btn-clear").on("click", function() {
  $(this).parents(".virtualTour").find(".videoBlockWrapper").removeClass("temporary-img")
})

$('.product__info-desc__btn').off('click').on('click', function () {
    const $btn = $(this);
    const $desc = $btn.parent().find('.product__info-desc');

    $desc.slideToggle(300, function () {
        // По окончании анимации
        const isOpen = $desc.hasClass('open');

        if (isOpen) {
            $btn.text('Читати опис');
            $desc.removeClass('open');
        } else {
            $desc.addClass('open');
            $btn.text('Сховати опис');
        }

        // ❗ Пересчитать высоту после изменения
        $(".projectAuditExpertise__slider").trigger("refresh.owl.carousel");
    });
});


const headerHeight = $('.header').outerHeight();

$('a[href^="#"]').on('click', function (e) {
    e.preventDefault();

    const target = $($.attr(this, 'href'));

    if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top - headerHeight + 50
        }, 500);
    }
});





$(function () {
  const $form = $('.form');
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
