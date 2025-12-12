$(function () {
  function setFancyThumbsBtn() {
    $(".fancyThumbBtn").remove();

    if (!$(".fancybox__container").length) return;

    let btn = `
      <button class="fancyThumbBtn">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8">
          <path d="M12.75 6.75L6.75 0.75L0.75 6.75" stroke="#F46D06" fill="none"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>`;

    $("body").append(btn);
  }
$(".gallery-item").on("click", function() {
  setTimeout(setFancyThumbsBtn, 50);
})
  // Кнопка вставится всегда
  document.addEventListener("fancybox:init", () => {
    setTimeout(setFancyThumbsBtn, 350);
  });
  document.addEventListener("fancybox:ready", () => {
    setTimeout(setFancyThumbsBtn, 350);
  });

  // Обработчик клика на кнопку сворачивания миниатюр
  $(document).on("click", ".fancyThumbBtn", function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    $(this).toggleClass("opened")
    const $thumbs = $(".fancybox__thumbs");
    const $svg = $(this).find("svg");
    
    $thumbs.toggleClass("is-collapsed");
    
    // Поворачиваем стрелку
    if ($thumbs.hasClass("is-collapsed")) {
      $svg.css("transform", "rotate(180deg)");
    } else {
      $svg.css("transform", "rotate(0deg)");
    }
    
  });

  // Предотвращаем закрытие Fancybox при клике на панель миниатюр
  $(document).on("click", ".fancybox__thumbs", function(e) {
    e.stopPropagation();
  });

  // Предотвращаем закрытие при клике на миниатюру
  $(document).on("click", ".fancybox__thumbs .carousel__slide", function(e) {
    e.stopPropagation();
  });

  /* -------------------------------------------------------
      ИНИЦИАЛИЗАЦИЯ FANCYBOX ДЛЯ ГАЛЕРЕЙ (кроме videoBlockSimple)
  ------------------------------------------------------- */
  function initFancybox() {
    $('.product__slider-item, .product__slider_mobile').each(function (sliderIndex) {
      $(this)
        .find('.gallery-item')
        .each(function () {
          $(this).attr('data-fancybox', `gallery-${sliderIndex}`);
        });
    });

    Fancybox.bind("[data-fancybox^='gallery-']", {
      Thumbs: { autoStart: true },
    });
    setFancyThumbsBtn();
  }
  setTimeout(initFancybox, 100);

  /* -------------------------------------------------------
      ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ — сбор элементов галереи
  ------------------------------------------------------- */
  function getGalleryItems($sliderItem) {
    const $imgs = $sliderItem.find('.gallery-item');
    const $videos = $sliderItem.find('.videoBlock:not(.videoBlockSimple)');
    let items = [];

    $imgs.each(function () {
      const $el = $(this);
      items.push({
        src: $el.attr('href'),
        type: $el.data('type') || 'image',
        thumb: $el.find('img').attr('src'),
      });
    });

    $videos.each(function () {
      const $vidBlock = $(this);
      const $link = $vidBlock.find('.video-fancybox-trigger');
      const $video = $vidBlock.find('video');

      items.push({
        src: $link.attr('href'),
        type: 'video',
        thumb: $video.attr('poster') || '/images/play_btn.svg',
      });
    });

    return items;
  }

  /* -------------------------------------------------------
          ОСНОВНОЙ ОБРАБОТЧИК ВИДЕО В СЛАЙДАХ
  ------------------------------------------------------- */
  $('.product__slider-item, .product__slider_mobile').each(function () {
    const $sliderItem = $(this);

    const $videoBlock = $sliderItem.find('.videoBlock');
    const $video = $sliderItem.find('video');
    const $playBtn = $sliderItem.find('.play__btn');
    const $closeBtn = $sliderItem.find('.videoBlock__close');
    const $fancyboxLink = $sliderItem.find('.video-fancybox-trigger');

    if (!$video.length) return;

    /* --------------------------------------------
        ВАЖНО: проверка на videoBlockSimple
    -------------------------------------------- */
    function openGallery(e) {
      const $block = $sliderItem.find('.videoBlock');

      // ============================
      //   ЭТО ПРОСТОЙ ВИДЕО-БЛОК
      // ============================
      if ($block.hasClass('videoBlockSimple')) {
        e.preventDefault();
        e.stopPropagation();

        const video = $block.find('video')[0];
        const $playBtn = $block.find('.play__btn');

        // Закрываем другие видео
        $('.videoBlock')
          .not($block)
          .removeClass('open')
          .find('video')
          .each(function () {
            this.pause();
          });

        $block.addClass('open');
        video.play();
        $playBtn.fadeOut(150);

        return; // ⛔ Fancybox НЕ запускаем
      }

      // ============================
      //   ОТКРЫТИЕ FANCYBOX
      // ============================
      e.preventDefault();
      e.stopPropagation();

      const items = getGalleryItems($sliderItem);
      const startIndex = items.findIndex((item) => item.src === $fancyboxLink.attr('href'));

      Fancybox.show(items, {
        Thumbs: { autoStart: true },
        startIndex: startIndex,
        width: 1920,
        height: 1050,
        iframe: { preload: false },
      });
    }
    setFancyThumbsBtn();

    /* ----------------------------
         ВЕШАЕМ СОБЫТИЯ
    ---------------------------- */
    $playBtn.off('click').on('click', openGallery);
    $video.off('click').on('click', openGallery);

    $sliderItem
      .find('.product__slider-images .gallery-item')
      .off('click')
      .on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const items = getGalleryItems($sliderItem);
        const startIndex = items.findIndex((item) => item.src === $(this).attr('href'));

        Fancybox.show(items, {
          Thumbs: { autoStart: true },
          startIndex: startIndex,
        });
        setFancyThumbsBtn();
      });

    /* ----------------------------
         КНОПКА ЗАКРЫТИЯ
    ---------------------------- */
    $closeBtn.off('click').on('click', function () {
      $video[0].pause();
      $sliderItem.find('.videoBlock').removeClass('open');
      $playBtn.fadeIn(150);
    });

    $video[0].pause();
    $playBtn.show();
  });

  /* -------------------------------------------------------
        ОБРАБОТКА ОДИНОЧНЫХ SIMPLE-ВИДЕО (вне слайдера)
  ------------------------------------------------------- */
  $('.videoBlockSimple').each(function () {
    const $block = $(this);
    const $video = $block.find('video');
    const $playBtn = $block.find('.play__btn');
    const $closeBtn = $block.find('.videoBlock__close');

    if (!$video.length) return;

    $playBtn.off('click').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      $('.videoBlock')
        .not($block)
        .removeClass('open')
        .find('video')
        .each(function () {
          this.pause();
        });

      $block.addClass('open');
      $video[0].play();
      $playBtn.fadeOut(150);
    });

    $video.off('click').on('click', function () {
      $block.addClass('open');
      if (this.paused) {
        this.play();
        $playBtn.fadeOut(150);
      } else {
        this.pause();
        $playBtn.fadeIn(150);
      }
    });

    $video.on('ended', function () {
      $playBtn.fadeIn(150);
    });

    $closeBtn.off('click').on('click', function () {
      $video[0].pause();
      $block.removeClass('open');
      $playBtn.fadeIn(150);
    });
  });


  Fancybox.bind("[data-fancybox]", {
    on: {
        destroy: (fancybox, slide) => {
            $(".fancyThumbBtn").remove();
        }
    }
});


});




