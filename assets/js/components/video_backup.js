$(function () {
  const virtualTourState = {
    activeSrc: null,
    videos: {},
  };
  let activeVideoEl = null;
  $('.play__btn').on('click', function () {
    $(this).closest('.video-poster').remove();
    $(this).closest('.videoBlockWrapper').find('video')[0].play();
  });
  $('.virtualTour video').each(function () {
    const video = this;

    video.addEventListener('play', function () {
      $('.video-poster').remove();
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
      .removeClass('temporary-img temporary-img-ru');
  });

  $('.product__slider').on('afterChange', function (event, slick, currentSlide) {
    let video = $(slick.$slides[currentSlide]).find('video')[0];
    if (video) {
      video.play();
    }
  });

  function autoplayProductSliderVideo(slider, currentSlide) {
    const $slide = $(slider.$slides[currentSlide]);
    const video = $slide.find('video')[0];
    if (!video) return;

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
$(document).on('click', '.video-fancybox-trigger', function(e){
    e.preventDefault();
    e.stopImmediatePropagation(); // 🔥 критично
    return false;
});

});
