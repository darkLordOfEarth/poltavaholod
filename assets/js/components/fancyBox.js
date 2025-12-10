$(function () {

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
        $('.videoBlock').not($block).removeClass('open').find('video').each(function () {
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
      const startIndex = items.findIndex(item => item.src === $fancyboxLink.attr('href'));

      Fancybox.show(items, {
        Thumbs: { autoStart: true },
        startIndex: startIndex,
        width: 1920,
        height: 1050,
        iframe: { preload: false },
      });
    }


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
        const startIndex = items.findIndex(item => item.src === $(this).attr('href'));

        Fancybox.show(items, {
          Thumbs: { autoStart: true },
          startIndex: startIndex,
        });
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

      $('.videoBlock').not($block).removeClass('open').find('video').each(function () {
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


});





// $(function () {
//   // INIT FANCYBOX
//   function initFancybox() {
//     $('.product__slider-item, .product__slider_mobile').each(function (sliderIndex) {
//       $(this)
//         .find('.gallery-item')
//         .each(function () {
//           $(this).attr('data-fancybox', `gallery-${sliderIndex}`);
//         });
//     });

//     Fancybox.bind("[data-fancybox^='gallery-']", {
//       Thumbs: { autoStart: true },
//     });
//   }
//   setTimeout(initFancybox, 100);

//   // VIDEO + MINIATURES
//   const $videoBlocks = $('.videoBlock');
//   if (!$videoBlocks.length) return;

//   function getGalleryItems($sliderItem) {
//     // Все картинки и видео внутри слайда
//     const $imgs = $sliderItem.find('.gallery-item');
//     const $videos = $sliderItem.find('.videoBlock');

//     let items = [];

//     $imgs.each(function () {
//       const $el = $(this);
//       items.push({
//         src: $el.attr('href'),
//         type: $el.data('type') || 'image',
//         thumb: $el.find('img').attr('src'),
//       });
//     });

//     $videos.each(function () {
//       const $vidBlock = $(this);
//       const $vidLink = $vidBlock.find('.video-fancybox-trigger');
//       const $video = $vidBlock.find('video');

//       items.push({
//         src: $vidLink.attr('href'),
//         type: 'video',
//         thumb: $video.attr('poster') || '/images/play_btn.svg',
//       });
//     });

//     return items;
//   }

//   $('.product__slider-item, .product__slider_mobile').each(function () {
//     const $sliderItem = $(this);
//     const $video = $sliderItem.find('video');
//     const $playBtn = $sliderItem.find('.play__btn');
//     const $closeBtn = $sliderItem.find('.videoBlock__close');
//     const $fancyboxLink = $sliderItem.find('.video-fancybox-trigger');

//     if (!$video.length) return;

//     function openGallery(e) {
//       e.preventDefault();
//       e.stopPropagation();

//       const items = getGalleryItems($sliderItem);
//       const startIndex = items.findIndex((item) => item.src === $fancyboxLink.attr('href'));

//       Fancybox.show(items, {
//         Thumbs: { autoStart: true },
//         startIndex: startIndex,
//         width: 1920, // ширина контейнера
//         height: 1050, // высота контейнера
//         iframe: {
//           preload: false,
//         },
//       });
//     }

//     $playBtn.off('click').on('click', openGallery);
//     $video.off('click').on('click', openGallery);
//     $sliderItem
//       .find('.product__slider-images .gallery-item')
//       .off('click')
//       .on('click', function (e) {
//         e.preventDefault();
//         e.stopPropagation();

//         const items = getGalleryItems($sliderItem);
//         const startIndex = items.findIndex((item) => item.src === $(this).attr('href'));

//         Fancybox.show(items, {
//           Thumbs: { autoStart: true },
//           startIndex: startIndex,
//         });
//       });

//     $closeBtn.off('click').on('click', function () {
//       $video[0].pause();
//       $sliderItem.find('.videoBlock').removeClass('open');
//       $playBtn.fadeIn(150);
//     });

//     $video[0].pause();
//     $playBtn.show();
//   });


//   // FOOTER VIDEO — отдельный Fancybox
// // const $footerVideo = $('.footer__video');

// // if ($footerVideo.length) {
// //   const $video = $footerVideo.find('video');
// //   const $playBtn = $footerVideo.find('.play__btn');
// //   const $link = $footerVideo.find('.video-fancybox-trigger');

// //   function openFooterVideo(e) {
// //     e.preventDefault();
// //     e.stopPropagation();

// //     Fancybox.show(
// //       [
// //         {
// //           src: $link.attr('href'),
// //           type: 'video',
// //           thumb: $video.attr('poster') || '/images/play_btn.svg'
// //         }
// //       ],
// //       {
// //         Thumbs: { autoStart: true },
// //         width: 1600,
// //         height: 900,
// //         iframe: { preload: false }
// //       }
// //     );
// //   }

// //   $playBtn.on('click', openFooterVideo);
// //   $video.on('click', openFooterVideo);
// // }


// });




// // ФУНКЦИЯ ДЛЯ ОТКРЫТИЯ ОДИНОЧНЫХ ВИДЕО
// $(function () {
//     const $videoBlocks = $('.videoBlockSimple');

//     if ($videoBlocks.length === 0) return;

//     $videoBlocks.each(function () {
//         const $block = $(this);
//         const $video = $block.find('video');
//         const $playBtn = $block.find('.play__btn');
//         const $closeBtn = $block.find('.videoBlock__close');

//         if (!$video.length) return;

//         // Клик на кнопку Play
//         $playBtn.off('click').on('click', function (e) {
//             e.preventDefault();
//             e.stopPropagation();

//             // Закрываем другие видео
//             $('.videoBlock').removeClass('open').find('video').each(function () {
//                 this.pause();
//             });

//             $block.addClass('open');
//             $video[0].play();
//             $playBtn.fadeOut(150);
//         });

//         // Клик на само видео
//         $video.off('click').on('click', function () {
//             $block.addClass('open');
//             if (this.paused) {
//                 this.play();
//                 $playBtn.fadeOut(150);
//             } else {
//                 this.pause();
//                 $playBtn.fadeIn(150);
//             }
//         });

//         // Когда видео закончилось
//         $video.off('ended').on('ended', function () {
//             $playBtn.fadeIn(150);
//         });

//         // Закрытие видео блока
//         $closeBtn.off('click').on('click', function () {
//             $video[0].pause();
//             $block.removeClass('open');
//             $playBtn.fadeIn(150);
//         });
//     });
// });



