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

  const virtualTourState = {
    activeSrc: null,
    videos: {},
  };
  let activeVideoEl = null;

  $('.virtualTour video').each(function () {
    const video = this;

    video.addEventListener('play', function () {
      activeVideoEl = video;

      const src = video.querySelector('source')?.getAttribute('src');
      if (!src) return;

      virtualTourState.activeSrc = src;

      if (!virtualTourState.videos[src]) {
        virtualTourState.videos[src] = { time: 0, playing: true };
      } else {
        virtualTourState.videos[src].playing = true;
      }
    });

    video.addEventListener('pause', function () {
      if (activeVideoEl === video) {
        activeVideoEl = null;
      }

      const src = video.querySelector('source')?.getAttribute('src');
      if (!src) return;

      if (virtualTourState.videos[src]) {
        virtualTourState.videos[src].playing = false;
      }
    });

    video.addEventListener('timeupdate', function () {
      if (activeVideoEl !== video || video.paused) return;

      const src = video.querySelector('source')?.getAttribute('src');
      if (!src) return;

      virtualTourState.videos[src].time = video.currentTime;
    });
  });

  //

  /* ----------------------------------------------------
      ПЕРЕКЛЮЧЕНИЕ КНОПОК
---------------------------------------------------- */

  $('.virtualTour__toggle-btn').on('click', function () {
    const $btn = $(this);
    const $tour = $btn.closest('.virtualTour');
    const $videos = $tour.find('video');
    const $playBtn = $tour.find('.play__btn');

    const newSrc = $btn.attr('data-video');
    const link = $btn.attr('data-link');

    $('.virtualTour__toggle-btn').removeClass('active');
    $btn.addClass('active');

    $tour.find('.virtualTour__link').attr('href', link);

    // ✅ 1. СОХРАНЯЕМ АКТУАЛЬНОЕ ВРЕМЯ АКТИВНОГО ВИДЕО
    if (activeVideoEl) {
      const src = activeVideoEl.querySelector('source')?.getAttribute('src');
      if (src && virtualTourState.videos[src]) {
        virtualTourState.videos[src].time = activeVideoEl.currentTime;
        virtualTourState.videos[src].playing = !activeVideoEl.paused;
      }

      activeVideoEl.pause();
      activeVideoEl = null;
    }

    // если не видео
    if (!newSrc || !newSrc.match(/\.(mp4|webm|ogg)$/i)) {
      $playBtn.fadeIn(150);
      return;
    }

    // ✅ 2. ВОССТАНАВЛИВАЕМ НОВОЕ
    $videos.each(function () {
      const video = this;
      const source = video.querySelector('source');
      if (!source) return;

      const state = virtualTourState.videos[newSrc] || { time: 0, playing: false };
      const currentSrc = source.getAttribute('src');

      if (currentSrc === newSrc) {
        video.currentTime = state.time;
        if (state.playing) {
          video.play();
          $playBtn.fadeOut(150);
        } else {
          $playBtn.fadeIn(150);
        }
        virtualTourState.activeSrc = newSrc;
        return;
      }

      source.setAttribute('src', newSrc);

      video.addEventListener(
        'loadedmetadata',
        function () {
          video.currentTime = state.time;
          if (state.playing) {
            video.play();
            $playBtn.fadeOut(150);
          } else {
            $playBtn.fadeIn(150);
          }
          virtualTourState.activeSrc = newSrc;
        },
        { once: true },
      );

      video.load();
    });
  });

  $('.temporary-btn').on('click', function () {
    $(this).parents('.virtualTour').find('.videoBlockWrapper').addClass('temporary-img');
  });
  $('.temporary-btn-clear').on('click', function () {
    $(this).parents('.virtualTour').find('.videoBlockWrapper').removeClass('temporary-img');
  });

  $('.product__info-desc__btn')
    .off('click')
    .on('click', function () {
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
        $('.projectAuditExpertise__slider').trigger('refresh.owl.carousel');
      });
    });

  const headerHeight = $('.header').outerHeight();

  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();

    const target = $($.attr(this, 'href'));

    if (target.length) {
      $('html, body').animate(
        {
          scrollTop: target.offset().top - headerHeight + 50,
        },
        500,
      );
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
