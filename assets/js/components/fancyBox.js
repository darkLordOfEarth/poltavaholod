$(function () {
  /* -------------------------------------------------------
      СОСТОЯНИЕ ВИДЕО В FANCYBOX
  ------------------------------------------------------- */
  const fancyboxVideoState = {};

  /* -------------------------------------------------------
      КНОПКА СВОРАЧИВАНИЯ THUMBS
  ------------------------------------------------------- */
  let touchStartY = 0;
  let touchStartX = 0;
  let isTouchScrolling = false;

  let isDragging = false;

  $(document).on('drag.owl.carousel', '.product__slider', function () {
    isDragging = true;
  });

  $(document).on('dragged.owl.carousel', '.product__slider', function () {
    setTimeout(() => {
      isDragging = false;
    }, 0);
  });

  function setFancyThumbsBtn() {
    $('.fancyThumbBtn').remove();

    const $thumbs = $('.fancybox__thumbs');
    if ($thumbs.length) {
      $('body').append(`
    <button class="fancyThumbBtn">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
        <path d="M0.75 0.75L6.75 6.75L12.75 0.75"
          stroke="#F46D06" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `);
    } else {
      return;
    }
  }
  setFancyThumbsBtn();
  // Удаляем кнопку при клике на крестик
  $(document).on('click', '.fancybox__button--close', function () {
    $('.fancyThumbBtn').remove();
  });
  $(document).on('click', '.fancybox__viewport', function () {
    $('.fancyThumbBtn').remove();
  });

  // Удаляем кнопку при нажатии Esc
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('.fancyThumbBtn').remove();
    }
  });

  // Если нужно, можно добавить обработку закрытия через Fancybox API
  // Fancybox.bind('[data-fancybox]', {
  //     on: {
  //        done: () => {
  //         setFancyThumbsBtn();
  //        },
  //         destroy: () => {
  //             $('.fancyThumbBtn').remove();
  //         }
  //     }
  // });

  $(document).on('click touchstart', '.gallery-item, .videoBlockWrapper.imgBox', function (e) {
    setTimeout(setFancyThumbsBtn, 300);
  });
  $(document).on('afterShow.fb', function () {
    setTimeout(setFancyThumbsBtn, 250);
  });

  $(document).on('click', '.fancyThumbBtn', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const $thumbs = $('.fancybox__thumbs');
    const $svg = $(this).find('svg');

    $('.fancyThumbBtn').toggleClass('opened');
    $thumbs.toggleClass('is-collapsed');
    $svg.css('transform', $thumbs.hasClass('is-collapsed') ? 'rotate(180deg)' : 'rotate(0deg)');
  });

  $(document).on('click', '.fancybox__thumbs, .fancybox__thumbs .carousel__slide', (e) =>
    e.stopPropagation(),
  );

  function getGalleryItems($sliderItem) {
    const items = [];
    const used = new Set();

    // картинки
    $sliderItem.find('.gallery-item').each(function () {
      const src = $(this).attr('href');
      const thumb = $(this).find('img').attr('src');
      if (!src || used.has(src)) return;
      used.add(src);

      items.push({
        src,
        type: 'image',
        thumb,
      });
    });

    // видео
    $sliderItem.find('.product__slider-video').each(function () {
      const $video = $(this).find('video');
      const src = $video.find('source').attr('src');
      const thumb = $video.attr('poster') || '/images/video-thumb.jpg';
      if (!src || used.has(src)) return;
      used.add(src);

      items.push({
        src,
        type: 'html5video',
        thumb,
        html5video: {
          autoplay: false, // Отключаем автозапуск
          muted: false,
          controls: false, // Убираем нативные контролы
          loop: false,
          preload: 'metadata',
        },
      });
    });

    return items;
  }

  /* -------------------------------------------------------
      УПРАВЛЕНИЕ ВИДЕО В FANCYBOX
  ------------------------------------------------------- */
  function saveVideoState(video, src) {
    if (video && src) {
      fancyboxVideoState[src] = {
        time: video.currentTime,
        paused: video.paused,
      };
    }
  }

  function restoreVideoState(video, src) {
    if (video && src && fancyboxVideoState[src]) {
      const state = fancyboxVideoState[src];
      video.currentTime = state.time || 0;
      // Не автоматически запускаем, пользователь сам решит
    }
  }

  function pauseAllFancyboxVideos() {
    $('.fancybox__slide video').each(function () {
      const video = this;
      const src = $(video).find('source').attr('src');
      if (src && !video.paused) {
        saveVideoState(video, src);
        video.pause();
      }
    });
  }

  // Клик по видео для паузы/воспроизведения
  $(document).on('click', '.fancybox__slide video', function (e) {
    e.stopPropagation();
    const video = this;
    const $slide = $(this).closest('.fancybox__slide');
    const src = $(video).find('source').attr('src');
    video.onplay = null;
    if (video.paused) {
      video.play();
      $slide.removeClass('paused');
    } else {
      saveVideoState(video, src);
      video.pause();
      $slide.addClass('paused');
    }
  });

  // Следим за событиями play/pause для синхронизации класса
  $(document).on('play', '.fancybox__slide video', function () {
    $(this).closest('.fancybox__slide').removeClass('paused');
  });

  $(document).on('pause', '.fancybox__slide video', function () {
    const $slide = $(this).closest('.fancybox__slide');
    // Добавляем класс только если это действительно Fancybox слайд
    if ($slide.length) {
      $slide.addClass('paused');
    }
  });

  // -------------------------------------------------------
  // ОТКРЫТЬ ГАЛЕРЕЮ
  // -------------------------------------------------------
  function openGallery($sliderItem, startSrc) {
    const items = getGalleryItems($sliderItem);
    const startIndex = items.findIndex((i) => i.src === startSrc);

    Fancybox.show(items, {
      startIndex: startIndex >= 0 ? startIndex : 0,
      Thumbs: { autoStart: true },
      on: {
        done: (fancybox, slide) => {
          $('.fancybox__html5video').removeAttr('controls');

          const $video = $(slide.$el).find('video');
          if ($video.length) {
            const video = $video[0];
            const src = $video.find('source').attr('src');
            restoreVideoState(video, src);

            // 🔥 ИСПРАВЛЕНИЕ: убираем класс paused, если видео играет
            if (!video.paused) {
              $(slide.$el).removeClass('paused');
            }
          }
        },

        beforeClose: (fancybox) => {
          pauseAllFancyboxVideos();
        },

        'Carousel.change': (fancybox, carousel, to, from) => {
          if (typeof from !== 'undefined') {
            const $fromSlide = $(carousel.slides[from].$el);
            const $video = $fromSlide.find('video');

            if ($video.length) {
              const video = $video[0];
              const src = $video.find('source').attr('src');
              saveVideoState(video, src);
              video.pause();
            }
          }

          // 🔥 ИСПРАВЛЕНИЕ: при переходе на новый слайд проверяем видео
          if (typeof to !== 'undefined') {
            const $toSlide = $(carousel.slides[to].$el);
            const $video = $toSlide.find('video');

            if ($video.length) {
              const video = $video[0];
              const src = $video.find('source').attr('src');

              // Восстанавливаем состояние
              if (fancyboxVideoState[src]) {
                const state = fancyboxVideoState[src];
                video.currentTime = state.time || 0;

                // Если видео было на паузе - ставим на паузу и показываем кнопку
                if (state.paused) {
                  video.pause();
                  $toSlide.removeClass('paused');
                  console.log("removeClass('paused'); 1")
                } else {
                  // Если видео играло - убираем кнопку паузы
                  $toSlide.removeClass('paused');
                  console.log("removeClass('paused'); 2")
                }
              } else {
                // Новое видео - по умолчанию на паузе
                $toSlide.addClass('paused');
                console.log("addClass('paused'); 2")
              }
            }
          }
        },

        'Carousel.ready': (fancybox, carousel) => {
          const currentSlide = carousel.slides[carousel.page];
          if (currentSlide) {
            const $video = $(currentSlide.$el).find('video');
            if ($video.length) {
              const video = $video[0];
              const src = $video.find('source').attr('src');

              if (fancyboxVideoState[src]) {
                const state = fancyboxVideoState[src];
                video.currentTime = state.time || 0;
                video.autoplay = false;

                if (state.paused) {
                  video.pause();
                  video.onplay = function () {
                    video.pause();
                  };
                  $(currentSlide.$el).addClass('paused');
                  console.log(".addClass('paused'); 1")
                } else {
                  video.onplay = null;
                  $(currentSlide.$el).removeClass('paused');
                  console.log("removeClass('paused');")
                }
              } else {
                $(currentSlide.$el).addClass('paused');
                console.log(".addClass('paused'); 2")
              }
            }
          }
        },

        // 🔥 Объединяем оба destroy в один
        destroy: (fancybox) => {
          $('.fancyThumbBtn').remove();
          pauseAllFancyboxVideos();
        },
      },
    });
  }

  // -------------------------------------------------------
  // КЛИК ПО КАРТИНКЕ
  $(document).on('touchstart', '.product__slider-media .gallery-item', function (e) {
    const t = e.originalEvent.touches[0];
    touchStartY = t.clientY;
    touchStartX = t.clientX;
    isTouchScrolling = false;
  });

  $(document).on('touchmove', '.product__slider-media .gallery-item', function (e) {
    const t = e.originalEvent.touches[0];
    const deltaY = Math.abs(t.clientY - touchStartY);
    const deltaX = Math.abs(t.clientX - touchStartX);

    // если палец реально поехал — это скролл
    if (deltaY > 10 || deltaX > 10) {
      isTouchScrolling = true;
    }
  });

  $(document).on('click touchend', '.product__slider-media .gallery-item', function (e) {
    // если это был скролл — НИЧЕГО не делаем
    if (e.type === 'touchend' && isTouchScrolling) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();

    // защита от двойного срабатывания
    if (e.type === 'touchend') {
      this._touched = true;
      setTimeout(() => (this._touched = false), 400);
    } else if (this._touched) {
      return;
    }

    const $sliderItem = $(this).closest('.product__slider-item');
    openGallery($sliderItem, $(this).attr('href'));
    // setTimeout(setFancyThumbsBtn, 500);
  });

  // -------------------------------------------------------
  // КЛИК ПО ВИДЕО
  // -------------------------------------------------------
  $(document).on('click', '.product__slider-video', function (e) {
    if (isDragging) return;
    e.preventDefault();
    e.stopPropagation();

    const $sliderItem = $(this).closest('.product__slider-item');
    const $video = $(this).find('video');
    const src = $video.find('source').attr('src');

    if ($sliderItem.length && src) {
      openGallery($sliderItem, src);
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
    if (video.dataset.forcePaused === '1') return;

    // 👇 ВАЖНО: игнорируем global state
    video.muted = true;

    // если другой код успел поставить pause — снимаем
    video.play().catch(() => {
      delete video.dataset.forcePaused;
    });
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

  $(document).on('click', '.fancybox__thumb', function (e) {
    $('.has-html5video').removeClass('paused');
  });

  Fancybox.bind('.owl-item:not(.cloned) [data-fancybox="gallery-related-home"]', {
    infinite: true,
  });
  Fancybox.bind('.owl-item:not(.cloned) [data-fancybox="gallery-product-images"]', {
    infinite: true,
  });
  Fancybox.bind('.owl-item:not(.cloned) [data-fancybox="gallery-about-slider"]', {
    infinite: true,
  });
  Fancybox.bind('.owl-item:not(.cloned) [data-fancybox]', {
    infinite: true,
  });

  const fancyGroups = new Set();

  document.querySelectorAll('[data-fancybox^="departments_item_images_"]').forEach((el) => {
    fancyGroups.add(el.dataset.fancybox);
  });

  // для КАЖДОЙ группы — свой bind
  fancyGroups.forEach((group) => {
    Fancybox.bind(`.owl-item:not(.cloned) [data-fancybox="${group}"]`, {
      infinite: true,
      dragToClose: false,
    });
  });

  
  // $(document).on("click", ".carousel__button", function() {
  //     console.log("121212")
  //     $(".fancybox__slide.has-html5video").removeClass('paused');
  // })


  // Кнопка открыть галерею для current building
  $(document).on('click', '.constructionsList__item-row .custom-button', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const $galleryList = $(this)
      .closest('.constructionsList__item-row__top')
      .find('.buildings__gallery-list');
    if (!$galleryList.length) return;

    // Собираем элементы галереи
    const items = [];
    $galleryList.find('.buildings__gallery-list__item').each(function () {
      const src = $(this).attr('href');
      const thumb = $(this).find('img').attr('src');
      if (!src) return;

      items.push({
        src,
        type: 'image',
        thumb,
      });
    });

    if (!items.length) return;

    // Открываем Fancybox
    Fancybox.show(items, {
      Thumbs: { autoStart: true },
      infinite: true,
      on: {
        done: (fancybox, slide) => {
          // Дополнительно, если нужно
          setTimeout(setFancyThumbsBtn, 100);
        },
        destroy: (fancybox) => {
          $('.fancyThumbBtn').remove();
        },
      },
    });
  });
});