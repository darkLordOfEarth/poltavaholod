$(function () {
  // var windowWidth = window.innerWidth;
  // var windowHeight = window.innerHeight;
  // alert('width:' + windowWidth + ' ' + 'height:' + windowHeight);
  // document.addEventListener('click', function (e) {
  // const el = e.target;

  // console.log('CLICKED ELEMENT:', el);
  // console.log('TAG:', el.tagName);
  // console.log('CLASSES:', el.className);
  // console.log('ID:', el.id || '—');
  // });
  $('.menu-item').removeClass('open');

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

  $('.main-navigation a').each(function () {
    const $link = $(this);
    const href = $link.attr('href');

    // если это якорь
    if (href && href.startsWith('#')) {
      const text = $link.text();
      const classes = $link.attr('class') || '';

      const $button = $('<button>', {
        type: 'button',
        class: classes + ' menu-anchor-btn',
        text: text,
        'data-target': href,
      });

      $link.replaceWith($button);
    }
  });

  // if (window.innerWidth <= 1280) {
  //   const parents = document.querySelectorAll('.menu-item-has-children > a');

  //   parents.forEach(function (link) {
  //     link.addEventListener('click', function (e) {
  //       const parent = this.parentElement;

  //       if (!parent.classList.contains('open')) {
  //         e.preventDefault();
  //         parent.classList.add('open');
  //       }
  //     });
  //   });
  // }

  const headerHeight = $('.header').outerHeight();
  // обработчик клика по якорям

  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();

    const target = $($.attr(this, 'href'));

    if (target.length) {
      const targetPosition = target.offset().top - headerHeight + 50;

      $('html, body').animate(
        {
          scrollTop: targetPosition,
        },
        300, // Увеличил немного время
        'swing', // Или 'linear' для равномерной скорости
      );
    }
  });

  $(document).on('click', '.menu-anchor-btn', function () {
    const target = $(this).data('target');
    if ($(target).length) {
      $('html, body').animate(
        {
          scrollTop: $(target).offset().top,
        },
        300,
        'swing',
      );
    }
  });

  $('.toggle-password')
    .css('cursor', 'pointer')
    .on('click', function () {
      const $icon = $(this);
      const $input = $icon.siblings('input');

      const showIcon = $icon.data('show');
      const hideIcon = $icon.data('hide');

      if ($input.attr('type') === 'password') {
        $input.attr('type', 'text');
        $icon.attr('src', showIcon).attr('alt', 'Сховати пароль');
      } else {
        $input.attr('type', 'password');
        $icon.attr('src', hideIcon).attr('alt', 'Показати пароль');
      }
    });

  let mouseDownTarget = null;

  // Запоминаем где был mousedown
  $(document).on('mousedown', function (e) {
    mouseDownTarget = e.target;
  });

  // Закрываем только если и mousedown и mouseup были вне popup__inner
  $(document).on('mouseup', function (e) {
    const $popupInner = $('.popup__inner');

    // Проверяем: mousedown и mouseup оба снаружи popup__inner
    const isMouseDownOutside = !$(mouseDownTarget).closest('.popup__inner').length;
    const isMouseUpOutside = !$(e.target).closest('.popup__inner').length;

    if (isMouseDownOutside && isMouseUpOutside) {
      $('.popup').fadeOut();
    }

    mouseDownTarget = null;
  });

  $(document).on('click', '.hero__nav a.hero__nav-btn', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    const link = this.getAttribute('href');
    if (link) {
      window.location.href = link;
    }
  });

  if ($(window).width() > 576) {
    $('.product__slider-images').each(function () {
      let imagesBlock = $(this).find('a');
      // .filter(function () {
      //   return $(this).css('display') !== 'none';
      // });
      console.log(imagesBlock.length);
      if (imagesBlock.length < 4) {
        $(this).addClass('little_bit_images');
      }
    });
  }

  function setOwlNavToMediaCenter() {
    if ($(window).width() > 1280) {
      const $slider = $('.product__slider');
      const $activeItem = $slider.find('.owl-item.active .product__slider-media').first();
      const $nav = $slider.find('.owl-nav');

      if (!$activeItem.length || !$nav.length) return;

      const sliderTop = $slider.offset().top;
      const mediaTop = $activeItem.offset().top;
      const mediaHeight = $activeItem.outerHeight();
      const navHeight = $nav.outerHeight();

      const topPosition = mediaTop - sliderTop + mediaHeight / 2 - navHeight / 2;

      $nav.css('top', topPosition);
    }
  }
  $('.product__slider').on(
    'initialized.owl.carousel changed.owl.carousel resized.owl.carousel refresh.owl.carousel',
    function () {
      requestAnimationFrame(() => {
        setOwlNavToMediaCenter();
      });
    },
  );
  $('.product_block_slider_custom .owl-nav button').on('click', function () {
    setOwlNavToMediaCenter();
  });
  // $(window).on('resize load', setOwlNavToMediaCenter);
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(setOwlNavToMediaCenter, 0);
  });
  $('.product__slider').on(
    'initialized.owl.carousel changed.owl.carousel resized.owl.carousel',
    function () {
      requestAnimationFrame(setOwlNavToMediaCenter);
    },
  );

  $('.product__slider img').on('load', function () {
    setOwlNavToMediaCenter();
  });

  $(window).on('resize', setOwlNavToMediaCenter);

  if ($(window).width() <= 576) {
    $('.product__slider-media').each(function () {
      const $media = $(this);
      const items = [];

      // собираем всё в правильном порядке
      $media.children().each(function () {
        const $el = $(this);

        // если группа картинок
        if (
          $el.hasClass('product__slider-images') ||
          $el.hasClass('product__slider-image-no-video')
        ) {
          $el.children().each(function () {
            items.push($(this));
          });
        }

        // если видео
        else if (
          $el.hasClass('product__slider-video') ||
          $el.hasClass('product__slider-image-no-video')
        ) {
          items.push($el);
        }
      });

      // очищаем контейнер
      $media.empty();

      // возвращаем плоский поток
      items.forEach(($item) => {
        $media.append($item);
      });
    });

    // $(document).on('click', '.product__slider-media .owl-prev', function (e) {
    //   e.stopPropagation();

    //   const $slider_inner = $(this).parents('.product__slider-media');

    //   $slider_inner.trigger('prev.owl.carousel');
    // });
    // $(document).on('click', '.product__slider-media .owl-next', function (e) {
    //   e.stopPropagation();

    //   const $slider_inner = $(this).parents('.product__slider-media');

    //   $slider_inner.trigger('next.owl.carousel');
    // });
  } else {
    $('.product__slider-media').each(function () {
      const $mediaBlock = $(this);

      const hasNeededElement =
        $mediaBlock.find('.product__slider-video, .product__slider-image-no-video').length > 0;

      if (!hasNeededElement) {
        $mediaBlock.addClass('grid2column');
      }
    });
  }

  $('.partnershipTypes__list-item_top img').on('click', function () {
    $(this).parents('.partnershipTypes__list-item').find('.btn-for-popup').click();
  });

  if ($(window).width() <= 1024) {
    $('.areas__grid-item').on('click', function () {
      $(this).toggleClass('active');
    });
  }

  $('.product__slider-media').each(function () {
    var $innerSlider = $(this);

    // Зупиняємо спливання подій миші
    $innerSlider.on('mousedown touchstart', function (e) {
      // e.stopPropagation();
    });

    // Зупиняємо спливання подій перетягування
    $innerSlider.on('drag.owl.carousel dragged.owl.carousel', function (e) {
      // e.stopPropagation();
    });

    // Альтернативний метод: Вимкнення зовнішнього слайдера під час взаємодії з внутрішнім
    $('.product__slider-media').on('mouseenter touchstart', function () {
      // Знаходимо батківський зовнішній слайдер
      var $outerSlider = $(this).closest('.product__slider');

      // Тимчасово вимикаємо перетягування на зовнішньому слайдері
      $outerSlider.trigger('stop.owl.autoplay');
      $outerSlider.data('owl.carousel').settings.mouseDrag = false;
      $outerSlider.data('owl.carousel').settings.touchDrag = false;
    });

    $('.product__slider-media').on('mouseleave touchend', function () {
      // Знаходимо батківський зовнішній слайдер
      var $outerSlider = $(this).closest('.product__slider');

      // Вмикаємо назад перетягування на зовнішньому слайдері
      $outerSlider.data('owl.carousel').settings.mouseDrag = true;
      $outerSlider.data('owl.carousel').settings.touchDrag = true;
    });
  });

  function updateNavPositionViewport($slider) {
    if ($(window).width() >= 1024) {
      const $slideTop = $slider.find('.owl-item.active .projectAuditExpertise__slide-top').first();

      const $nav = $slider.find('.owl-nav');

      if (!$slideTop.length || !$nav.length) return;

      const slideRect = $slideTop[0].getBoundingClientRect();
      const slideHeight = $slideTop.outerHeight();
      const navHeight = $nav.outerHeight();

      const top = slideRect.top + slideHeight / 2 - navHeight / 2;

      $nav.css({
        transform: `translateY(${top}px)`,
        position: 'fixed',
        left: '0',
        right: '0',
        pointerEvents: 'none',
      });

      $nav.find('button').css('pointer-events', 'auto');
    }
    // else {
    //   $nav.css({
    //     position: 'absolute',
    //     top: `auto`,
    //     right: '0',
    //     pointerEvents: 'none',
    //   });
    // }
  }
  const $slider = $('.projectAuditExpertise__slider');

  function shouldUpdate() {
    return $(window).width() >= 1024;
  }

  $slider.on('initialized.owl.carousel', function () {
    if (!shouldUpdate()) return;
    updateNavPositionViewport($(this));
  });

  $slider.on('changed.owl.carousel', function () {
    if (!shouldUpdate()) return;
    updateNavPositionViewport($(this));
  });

  $slider.find('img').on('load', function () {
    if (!shouldUpdate()) return;
    updateNavPositionViewport($slider);
  });

  $(window).on('resize orientationchange', function () {
    if (!shouldUpdate()) return;
    setTimeout(() => {
      updateNavPositionViewport($slider);
    }, 250);
  });
  $(window).on('scroll', function () {
    if (!shouldUpdate()) return;
    updateNavPositionViewport($slider);
  });

  // document.querySelectorAll('.product__info-desc').forEach((el) => {
  //   const maxHeight = 90; // твои 3 строки
  //   const originalHTML = el.innerHTML;

  //   el.dataset.original = originalHTML;

  //   function clamp() {
  //     el.innerHTML = el.dataset.original;

  //     if (el.scrollHeight <= maxHeight) return;

  //     let text = el.innerText.trim();
  //     let left = 0;
  //     let right = text.length;

  //     while (left < right) {
  //       const mid = Math.floor((left + right) / 2);
  //       el.innerText = text.slice(0, mid) + '…';

  //       if (el.scrollHeight > maxHeight) {
  //         right = mid - 1;
  //       } else {
  //         left = mid + 1;
  //       }
  //     }

  //     el.innerText = text.slice(0, left - 1) + '…';
  //   }

  //   clamp();

  //   el.closest('.product__info')
  //     ?.querySelector('.product__info-desc__btn')
  //     ?.addEventListener('click', () => {
  //       const isOpen = el.classList.toggle('is-open');

  //       if (isOpen) {
  //         el.innerHTML = el.dataset.original;
  //         el.style.maxHeight = 'none';
  //       } else {
  //         el.style.maxHeight = maxHeight + 'px';
  //         clamp();
  //       }
  //     });
  // });

  // document.querySelectorAll('.product__info-desc').forEach((el) => {
  //   clampText(el, 66); // твой max-height
  // });
  function isIOS() {
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && 'ontouchstart' in document.documentElement)
    );
  }
  function isMac() {
    return /Macintosh/.test(navigator.userAgent);
  }
  function isMacChrome() {
    const ua = navigator.userAgent;
    const isChrome =
      ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') === -1 && ua.indexOf('OPR') === -1;
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

    return isChrome && isMac;
  }

  if (isMacChrome()) {
    // document.body.classList.add('macChrome');
    // $('.product__info-desc').addClass('ios');
  }
  function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }
  if (isMac()) {
    // $('.product__info-desc').addClass('mac');
  }
  if (isSafari()) {
    // $('body').addClass('safari');
  }

  if (isIOS() && $(window).width() <= 1024) {
    $('.product__info-desc').addClass('ios');
  }

  $('.partners .custom-button, .reviews__slide-project__logo').on('click', function () {
    let data_link = $(this).attr('data-src');
    window.location.href = data_link;
  });
  let isDragging = false;

  $('.related__home .related__slider')
    .on('drag.owl.carousel', function () {
      isDragging = true;
    })
    .on('dragged.owl.carousel', function () {
      setTimeout(function () {
        isDragging = false;
      }, 100);
    });

  $('.related__home .related__slider').on('click', '.related__slider-item', function (e) {
    if (isDragging) {
      e.preventDefault();
      return false;
    }

    const link = $(this).data('src');
    if (link) {
      window.location.href = link;
    }
  });
  if ($(window).width() < 1280) {
    $('#menu-item-1565, #menu-item-1535, #menu-item-1566').children('a').attr('href', '');
    $("#menu-item-1698, button[target='#contacts']").on('click', function () {
      $('.menu__heading-close').click();
    });
  }

  $('.areas__content > button').on('click', function () {
    let path = $(this).data('src');
    if (path) {
      window.location.href = path;
    }
  });

  $('.partners__list .owl-nav button').on('click', function (e) {
    e.preventDefault();
  });

  const reviews = document.querySelector('.reviews');

if (reviews) {
  let startX = 0;
  let startY = 0;
  let isHorizontal = null;

  reviews.addEventListener(
    'touchstart',
    (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      isHorizontal = null;
    },
    { passive: true },
  );

  reviews.addEventListener(
    'touchmove',
    (e) => {
      const touch = e.touches[0];
      const dx = Math.abs(touch.clientX - startX);
      const dy = Math.abs(touch.clientY - startY);

      if (isHorizontal === null) {
        isHorizontal = dx > dy;
      }

      if (isHorizontal) {
        // блокируем вертикальный скролл
        e.preventDefault();
      }
    },
    { passive: false },
  ); // 🔥 ВОТ ЭТО КЛЮЧ
}


// function initCustomScroll() {
//   var isMatch = window.matchMedia('(max-width: 1280px) and (max-height: 450px)').matches;

//   $('.reviews__slide').each(function () {
//     var $slide = $(this);

//     // если НЕ подходит под условия — возвращаем всё назад
//     if (!isMatch) {
//       if ($slide.data('original-content')) {
//         $slide.html($slide.data('original-content'));
//         $slide.removeData('original-content');
//       }
//       return;
//     }

//     // уже инициализирован
//     if ($slide.find('.custom-scroll-wrapper').length) return;

//     // сохраняем оригинал (чтобы потом вернуть)
//     $slide.data('original-content', $slide.html());

//     // оборачиваем
//     var content = $slide.html();

//     $slide.html(`
//       <div class="custom-scroll-wrapper">
//         <div class="custom-scroll-content">${content}</div>
//         <div class="custom-scrollbar">
//           <div class="custom-scroll-thumb"></div>
//         </div>
//       </div>
//     `);

//     var $wrapper = $slide.find('.custom-scroll-wrapper');
//     var $content = $slide.find('.custom-scroll-content');
//     var $thumb = $slide.find('.custom-scroll-thumb');

//     function updateThumb() {
//       var contentHeight = $content[0].scrollHeight;
//       var wrapperHeight = $wrapper.height();

//       if (contentHeight <= wrapperHeight) {
//         $thumb.hide();
//         return;
//       } else {
//         $thumb.show();
//       }

//       var ratio = wrapperHeight / contentHeight;
//       var thumbHeight = wrapperHeight * ratio;

//       $thumb.height(Math.max(30, thumbHeight));
//     }

//     function syncThumb() {
//       var scrollTop = $content.scrollTop();
//       var contentHeight = $content[0].scrollHeight;
//       var wrapperHeight = $wrapper.height();

//       var maxScroll = contentHeight - wrapperHeight;
//       var maxThumbTop = wrapperHeight - $thumb.height();

//       var thumbTop = (scrollTop / maxScroll) * maxThumbTop;

//       $thumb.css('transform', 'translateY(' + thumbTop + 'px)');
//     }

//     // скролл
//     $content.on('scroll', function () {
//       syncThumb();
//     });

//     // drag
//     var isDragging = false;
//     var startY = 0;
//     var startTop = 0;

//     $thumb.on('mousedown', function (e) {
//       isDragging = true;
//       startY = e.pageY;

//       var matrix = $thumb.css('transform');
//       if (matrix !== 'none') {
//         startTop = parseInt(matrix.split(',')[5]);
//       } else {
//         startTop = 0;
//       }

//       $('body').addClass('no-select');
//     });

//     $(document).on('mousemove.customScroll', function (e) {
//       if (!isDragging) return;

//       var delta = e.pageY - startY;
//       var newTop = startTop + delta;

//       var maxTop = $wrapper.height() - $thumb.height();
//       newTop = Math.max(0, Math.min(maxTop, newTop));

//       var scrollRatio = newTop / maxTop;
//       var scrollTop = scrollRatio * ($content[0].scrollHeight - $wrapper.height());

//       $content.scrollTop(scrollTop);
//     });

//     $(document).on('mouseup.customScroll', function () {
//       isDragging = false;
//       $('body').removeClass('no-select');
//     });

//     // init
//     setTimeout(function () {
//       updateThumb();
//       syncThumb();
//     }, 0);

//     // пересчёт при ресайзе
//     $(window).on('resize.customScroll', function () {
//       updateThumb();
//       syncThumb();
//     });
//   });
// }

// // init
//   initCustomScroll();

// $(window).on('resize', function () {
//   initCustomScroll();
// });


});
