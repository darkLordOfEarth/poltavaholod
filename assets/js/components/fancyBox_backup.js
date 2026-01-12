$(function () {
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
    if (!$thumbs.length) return;

    $('body').append(`
    <button class="fancyThumbBtn">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
        <path d="M0.75 0.75L6.75 6.75L12.75 0.75"
          stroke="#F46D06" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `);
  }

  $(document).on('afterShow.fb', function () {
    setTimeout(setFancyThumbsBtn, 0);
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
          autoplay: true,
          muted: true,
          controls: true,
          loop: false,
          preload: 'metadata',
        },
      });
    });

    return items;
  }

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
        done: (fancybox) => {
          setFancyThumbsBtn();
        },
        destroy: (fancybox) => {
          $('.fancyThumbBtn').remove();
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
  });

  // $(document).on('click touchend', '.product__slider-media .gallery-item', function (e) {
  //   e.preventDefault();
  //   e.stopImmediatePropagation();
  //   e.stopPropagation();

  //   // защита от двойного срабатывания
  //   if (e.type === 'touchend') {
  //     this._touched = true;
  //     setTimeout(() => (this._touched = false), 400);
  //   } else if (this._touched) {
  //     return;
  //   }

  //   const $sliderItem = $(this).closest('.product__slider-item');
  //   openGallery($sliderItem, $(this).attr('href'));
  // });

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

  /* -------------------------------------------------------
      SIMPLE VIDEO
  ------------------------------------------------------- */
  // $('.videoBlockSimple').each(function () {
  //   const $block = $(this);
  //   const $video = $block.find('video');
  //   const $playBtn = $block.find('.play__btn');

  //   $playBtn.on('click', (e) => {
  //     e.preventDefault();

  //     $('.videoBlock')
  //       .not($block)
  //       .removeClass('open')
  //       .find('video')
  //       .each(function () {
  //         this.pause();
  //       });

  //     $block.addClass('open');
  //     $video[0].play();
  //     $playBtn.fadeOut(150);
  //   });
  // });
});
