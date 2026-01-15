$(function () {
  

  $('.play__btn, .videoBlockWrapper').on('click', function () {
    $(this).closest('.video-poster').remove();
    $(this).closest('.videoBlockWrapper').find('video')[0].play();
  });

  $('.virtualTour video').each(function () {
    const video = this;

    video.addEventListener('play', function () {
      // 🔥 Игнорируем видео в Fancybox
      if ($(video).closest('.fancybox__slide').length > 0) {
        return;
      }

      $('.video-poster').remove();
      activeVideoEl = video;

      const src = video.querySelector('source')?.getAttribute('src');
      if (!src) return;

      virtualTourState.activeSrc = src;

      if (!virtualTourState.videos[src]) {
        virtualTourState.videos[src] = { time: 0, playing: true };
        $(video).parent().find('.play__btn').hide();
      } else {
        virtualTourState.videos[src].playing = true;
        $(video).parent().find('.play__btn').hide();
      }
    });

    video.addEventListener('pause', function () {
      // 🔥 Игнорируем видео в Fancybox
      // if ($(video).closest('.fancybox__slide').length > 0) {
      //   return;
      // }

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
      // 🔥 Игнорируем видео в Fancybox
      if ($(video).closest('.fancybox__slide').length > 0) {
        return;
      }

      if (activeVideoEl !== video || video.paused) return;

      const src = video.querySelector('source')?.getAttribute('src');
      if (!src) return;

      virtualTourState.videos[src].time = video.currentTime;
    });
  });

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
    const $wrapper = $(this).closest('.virtualTour').find('.videoBlockWrapper');

    $wrapper.addClass('temporary-img');

    if (window.location.pathname.startsWith('/ru')) {
      $wrapper.addClass('temporary-img-ru');
    } else {
      $wrapper.addClass('temporary-img-ua');
    }
  });

  $('.temporary-btn-clear').on('click', function () {
    $(this)
      .parents('.virtualTour')
      .find('.videoBlockWrapper')
      .removeClass('temporary-img temporary-img-ru temporary-img-ua');
  });

  $('.product__slider').on('afterChange', function (event, slick, currentSlide) {
    let video = $(slick.$slides[currentSlide]).find('video')[0];
    // 🔥 Проверяем что это не Fancybox
    if (video && !$(video).closest('.fancybox__slide').length) {
      video.play();
    }
  });

  // ✅ ПАУЗА ПО КЛИКУ НА ВИДЕО
  $('.virtualTour video').on('click', function (e) {
    // 🔥 Игнорируем видео в Fancybox
    if ($(this).closest('.fancybox__slide').length > 0) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const video = this;
    const $playBtn = $(this).parent().find('.play__btn');

    if (!video.paused) {
      video.pause();
      $playBtn.fadeIn(150);
    } else {
      video.play();
      $playBtn.fadeOut(150);
    }
  });

  function autoplayProductSliderVideo(slider, currentSlide) {
    const $slide = $(slider.$slides[currentSlide]);
    const video = $slide.find('video')[0];
    if (!video) return;

    // 🔥 НЕ автоплей для видео в Fancybox
    if ($(video).closest('.fancybox__slide').length > 0) {
      return;
    }

    // 👇 ВАЖНО: игнорируем global state
    video.muted = true;

    // если другой код успел поставить pause — снимаем
    video.play().catch(() => {});
  }

  $('.product__slider')
    .on('init', function (event, slick) {
      autoplayProductSliderVideo(slick, slick.currentSlide);
    })
    .on('afterChange', function (event, slick, currentSlide) {
      autoplayProductSliderVideo(slick, currentSlide);
    });

  // document.querySelector(".video-element").play
  $(document).on('click', '.video-fancybox-trigger', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation(); // 🔥 критично
    return false;
  });

  // скрипт для обработки видео в попапах
  const $popup = $('#popup-partners');
  const $video = $popup.find('video');
  const $playBtn = $popup.find('.play__btn');
  const $videoWrapper = $popup.find('.videoBlockWrapper');

  if (!$video.length || !$playBtn.length) return;

  const videoEl = $video[0];

  /* -------------------------------------------------------
      PLAY ПО КНОПКЕ
  ------------------------------------------------------- */
  $playBtn.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    videoEl.play();
    $(this).fadeOut(150);
  });

  /* -------------------------------------------------------
      PLAY ПО КЛИКУ НА WRAPPER (как в virtualTour)
  ------------------------------------------------------- */
  $videoWrapper.on('click', function (e) {
    // Если кликнули на саму кнопку - не обрабатываем
    if ($(e.target).hasClass('play__btn')) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if (videoEl.paused) {
      videoEl.play();
      $playBtn.fadeOut(150);
    }
  });

  /* -------------------------------------------------------
      ПАУЗА/ВОСПРОИЗВЕДЕНИЕ ПО КЛИКУ НА ВИДЕО
  ------------------------------------------------------- */
  $video.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (!videoEl.paused) {
      videoEl.pause();
      $playBtn.fadeIn(150);
    } else {
      videoEl.play();
      $playBtn.fadeOut(150);
    }
  });

  /* -------------------------------------------------------
      СОБЫТИЕ PLAY - СКРЫВАЕМ КНОПКУ
  ------------------------------------------------------- */
  videoEl.addEventListener('play', function () {
    $playBtn.fadeOut(150);
  });

  /* -------------------------------------------------------
      СОБЫТИЕ PAUSE - ПОКАЗЫВАЕМ КНОПКУ
  ------------------------------------------------------- */
  videoEl.addEventListener('pause', function () {
    $playBtn.fadeIn(150);
  });

  /* -------------------------------------------------------
      ЕСЛИ ВИДЕО САМО ЗАКОНЧИЛОСЬ
  ------------------------------------------------------- */
  $video.on('ended', function () {
    $playBtn.fadeIn(150);
  });

  /* -------------------------------------------------------
      ОПЦИОНАЛЬНО: ОСТАНОВКА ВИДЕО ПРИ ЗАКРЫТИИ ПОПАПА
  ------------------------------------------------------- */
  $popup.find('.popup__close').on('click', function () {
    if (!videoEl.paused) {
      videoEl.pause();
      videoEl.currentTime = 0; // Сброс к началу
      $playBtn.fadeIn(150);
    }
  });

    
});
// $(document).ready(function() {
//   // Только для видео внутри constructionsList__item-row__top
//   $('.constructionsList__item-row__top .videoBlockSimple').each(function() {
//     const $videoBlock = $(this);
//     const $video = $videoBlock.find('.video-element');
//     const $playBtn = $videoBlock.find('.play__btn');
//     const $closeBtn = $videoBlock.find('.videoBlock__close');
//     const video = $video[0]; // получаем DOM элемент
    
//     // Создаем кнопку паузы (скрыта по умолчанию)
//     const $pauseBtn = $('<img>', {
//       src: '/wp-content/themes/carcass/assets/images/pause_btn.svg',
//       alt: 'pause',
//       class: 'pause__btn',
//       css: { display: 'none' }
//     });
//     $videoBlock.find('.videoBlockWrapper').append($pauseBtn);
    
//     // Функция запуска видео
//     function playVideo() {
//       video.play();
//       $playBtn.hide();
//       $pauseBtn.hide();
//     }
    
//     // Функция паузы видео
//     function pauseVideo() {
//       video.pause();
//       $pauseBtn.hide();
//       $playBtn.show();
//     }
    
//     // Клик по кнопке Play
//     $playBtn.on('click', function(e) {
//       e.stopPropagation();
//       playVideo();
//     });
    
//     // Клик по кнопке Pause
//     $pauseBtn.on('click', function(e) {
//       e.stopPropagation();
//       pauseVideo();
//     });
    
//     // Клик по самому видео
//     $video.on('click', function(e) {
//       e.stopPropagation();
//       if (video.paused || video.ended) {
//         playVideo();
//       } else {
//         pauseVideo();
//       }
//     });
    
//     // Показ кнопки паузы при наведении (только если видео играет)
//     $videoBlock.on('mouseenter', function() {
//       if (!video.paused && !video.ended) {
//         $pauseBtn.show();
//       }
//     });
    
//     // Скрытие кнопки паузы при уходе курсора
//     $videoBlock.on('mouseleave', function() {
//       $pauseBtn.hide();
//     });
    
//     // Когда видео закончилось - показываем кнопку Play
//     $video.on('ended', function() {
//       $playBtn.show();
//       $pauseBtn.hide();
//     });
    
//     // Клик по кнопке Close
//     $closeBtn.on('click', function(e) {
//       e.stopPropagation();
//       video.pause();
//       video.currentTime = 0;
//       $playBtn.show();
//       $pauseBtn.hide();
//     });
//   });
// });

// $(function () {

//   const videosState = new Map();
//   const userPausedVideos = new WeakSet();

//   function isInViewport($el, threshold = 0.6) {
//     const rect = $el[0].getBoundingClientRect();
//     const h = window.innerHeight || document.documentElement.clientHeight;
//     const visible = Math.min(rect.bottom, h) - Math.max(rect.top, 0);
//     return visible / rect.height >= threshold;
//   }

//   function handleScrollVideos() {

//     $('.constructionsList__item-row__top').each(function () {

//       const $container = $(this);
//       const $video = $container.find('video.video-element');
//       if (!$video.length) return;

//       if ($container.closest('.fancybox__slide, .virtualTour').length) return;

//       const video = $video[0];
//       const $playBtn = $container.find('.play__btn');
//       const $pauseBtn = $container.find('.pause__btn');

//       // ❌ если пользователь сам поставил паузу — автоплей запрещён
//       if (userPausedVideos.has(video)) return;

//       if (isInViewport($container)) {

//         if (video.paused) {

//           if (videosState.has(video)) {
//             video.currentTime = videosState.get(video);
//           }

//           video.play().catch(() => {});

//           $playBtn.hide();
//         }

//       } else {

//         if (!video.paused) {
//           videosState.set(video, video.currentTime);
//           video.pause();

//           $pauseBtn.hide();
//           $playBtn.show();
//         }
//       }
//     });
//   }

//   /* -------------------------------
//      ОТСЛЕЖИВАЕМ РУЧНУЮ ПАУЗУ через событие video
//   -------------------------------- */
//   $(document).on('pause', 'video.video-element', function () {
//     const video = this;
//     const $container = $(video).closest('.constructionsList__item-row__top');
    
//     // Проверяем, что видео в зоне видимости (значит пауза ручная, а не от скролла)
//     if (isInViewport($container)) {
//       userPausedVideos.add(video);
//     }
//   });

//   /* -------------------------------
//      ОТСЛЕЖИВАЕМ РУЧНОЙ PLAY
//   -------------------------------- */
//   $(document).on('play', 'video.video-element', function () {
//     const video = this;
//     userPausedVideos.delete(video);
//   });

//   /* -------------------------------
//      КЛИКИ ПО КНОПКАМ (опционально, если нужны)
//   -------------------------------- */
//   $(document).on('click', '.pause__btn', function () {
//     const $container = $(this).closest('.constructionsList__item-row__top');
//     const video = $container.find('video.video-element')[0];
//     if (video) {
//       video.pause(); // событие 'pause' сработает автоматически
//     }
//   });

//   $(document).on('click', '.play__btn', function () {
//     const $container = $(this).closest('.constructionsList__item-row__top');
//     const video = $container.find('video.video-element')[0];
//     if (video) {
//       video.play(); // событие 'play' сработает автоматически
//     }
//   });

//   /* -------------------------------
//      SCROLL / RESIZE
//   -------------------------------- */
//   let ticking = false;

//   $(window).on('scroll resize', function () {
//     if (!ticking) {
//       requestAnimationFrame(() => {
//         handleScrollVideos();
//         ticking = false;
//       });
//       ticking = true;
//     }
//   });

//   handleScrollVideos();

// });