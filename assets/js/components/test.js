(function ($) {
  const videosState = new Map();
  const userPausedVideos = new WeakSet();

  function isInViewport($el, threshold = 0.6) {
    const rect = $el[0].getBoundingClientRect();
    const h = window.innerHeight || document.documentElement.clientHeight;
    const visible = Math.min(rect.bottom, h) - Math.max(rect.top, 0);
    return visible / rect.height >= threshold;
  }

  function handleScrollVideos() {
    $('.constructionsList__item-row__top').each(function () {
      const $container = $(this);
      const $video = $container.find('video.video-element');
      if (!$video.length) return;
      if ($container.closest('.fancybox__slide, .virtualTour').length) return;

      const video = $video[0];
      const $playBtn = $container.find('.play__btn');
      const $pauseBtn = $container.find('.pause__btn');

      if (isInViewport($container)) {
        // Видео вернулось в видимую область
        if (videosState.has(video) && !userPausedVideos.has(video)) {
          // Было запущено до выхода с экрана - продолжаем воспроизведение
          video.currentTime = videosState.get(video);
          video.play().catch(() => {});
          videosState.delete(video);
        }
      } else {
        // Видео ушло с экрана
        if (!video.paused) {
          // Сохраняем позицию и ставим на паузу
          videosState.set(video, video.currentTime);
          video.pause();
        }
      }
    });
  }

  // Обработчики для ручного управления видео
  $(document).on('pause', 'video.video-element', function () {
    const video = this;
    const $container = $(video).closest('.constructionsList__item-row__top');
    const $playBtn = $container.find('.play__btn');
    const $pauseBtn = $container.find('.pause__btn');

    $pauseBtn.hide();
    $playBtn.show();

    // Отмечаем что пользователь поставил на паузу вручную
    if (isInViewport($container)) {
      userPausedVideos.add(video);
    }
  });

  $(document).on('play', 'video.video-element', function () {
    const video = this;
    const $container = $(video).closest('.constructionsList__item-row__top');
    const $playBtn = $container.find('.play__btn');
    const $pauseBtn = $container.find('.pause__btn');

    $playBtn.hide();
    $pauseBtn.show();

    // Снимаем отметку о паузе пользователя
    userPausedVideos.delete(video);
    // Удаляем сохраненное состояние если есть
    videosState.delete(video);
  });

  $(document).on('click', '.pause__btn', function () {
    const $container = $(this).closest('.constructionsList__item-row__top');
    const video = $container.find('video.video-element')[0];
    if (video) {
      video.pause();
    }
  });

  $(document).on('click', '.play__btn', function () {
    const $container = $(this).closest('.constructionsList__item-row__top');
    const video = $container.find('video.video-element')[0];
    if (video) {
      video.play();
    }
  });

  // Клик по самому видео для паузы/воспроизведения
  $(document).on('click', 'video.video-element', function () {
    const video = this;
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  });

  let ticking = false;
  $(window).on('scroll resize', function () {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScrollVideos();
        ticking = false;
      });
      ticking = true;
    }
  });

  handleScrollVideos();

  // Видео внутри videoBlockSimple
  $('.constructionsList__item-row__top .videoBlockSimple').each(function () {
    const $videoBlock = $(this);
    const $video = $videoBlock.find('video.video-element');
    const $playBtn = $videoBlock.find('.play__btn');
    const $closeBtn = $videoBlock.find('.videoBlock__close');
    const video = $video[0];

    const $pauseBtn = $('<img>', {
      src: '/wp-content/themes/carcass/assets/images/pause_btn.svg',
      alt: 'pause',
      class: 'pause__btn',
      css: { display: 'none' },
    });
    $videoBlock.find('.videoBlockWrapper').append($pauseBtn);

    function playVideo() {
      video.play();
      $playBtn.hide();
      $pauseBtn.hide();
    }

    function pauseVideo() {
      video.pause();
      $pauseBtn.hide();
      $playBtn.show();
    }

    $playBtn.on('click', function (e) {
      e.stopPropagation();
      playVideo();
    });

    $pauseBtn.on('click', function (e) {
      e.stopPropagation();
      pauseVideo();
    });

    $video.on('click', function (e) {
      e.stopPropagation();
      if (video.paused || video.ended) {
        playVideo();
      } else {
        pauseVideo();
      }
    });

    $videoBlock.on('mouseenter', function () {
      if (!video.paused && !video.ended) {
        $pauseBtn.show();
      }
    });

    $videoBlock.on('mouseleave', function () {
      $pauseBtn.hide();
    });

    $video.on('ended', function () {
      $playBtn.show();
      $pauseBtn.hide();
    });

    $video.on('play', function () {
      $playBtn.hide();
    });

    $video.on('pause', function () {
      $pauseBtn.hide();
      $playBtn.show();
    });

    $closeBtn.on('click', function (e) {
      e.stopPropagation();
      video.pause();
      video.currentTime = 0;
      $playBtn.show();
      $pauseBtn.hide();
    });
  });

  
})(jQuery);
