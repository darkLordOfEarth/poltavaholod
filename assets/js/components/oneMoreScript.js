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

  $('.product__info-desc__btn')
    .off('click')
    .on('click', function () {
      const $btn = $(this);
      const $desc = $btn.parent().find('p');

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

  // const headerHeight = $('.header').outerHeight();

  // $('a[href^="#"]').on('click', function (e) {
  //   e.preventDefault();

  //   const target = $($.attr(this, 'href'));

  //   if (target.length) {
  //     $('html, body').animate(
  //       {
  //         scrollTop: target.offset().top - headerHeight + 50,
  //       },
  //       200,
  //     );
  //   }
  // });

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

  // function setPositionOwlNav() {
  //   let mediaHeight = $('.product__slider-media').outerHeight();
  //   let owlNavHeight = $('.product__slider .owl-nav').outerHeight();
  //   let productInfo = $('.product__slider .product__info').outerHeight();

  //   let currentPosition = (mediaHeight - owlNavHeight) / 2;

  //   $('.product__slider .owl-nav').css('top', -productInfo - (owlNavHeight / 2) - 10);
  // }

  // $(window).on('resize', function () {
  //   setPositionOwlNav();
  // });

  // // обязательно вызвать при первой загрузке
  // $(window).on('load', function () {
  //   setPositionOwlNav();
  // });
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
    'initialized.owl.carousel changed.owl.carousel resized.owl.carousel',
    function () {
      setOwlNavToMediaCenter();
    },
  );

  $(window).on('resize load', setOwlNavToMediaCenter);

  if ($(window).width() <= 576) {
    // $(document).on('focus', 'input, textarea', function () {
    //   $('body').addClass('no-scroll');
    // });

    // $(document).on('blur', 'input, textarea', function () {
    //   $('body').removeClass('no-scroll');
    // });

    // if (window.visualViewport) {
    //   window.visualViewport.addEventListener('resize', () => {
    //     // Компенсировать изменение размера
    //     document.body.style.height = `${window.visualViewport.height}px`;
    //   });
    // }

    // document.querySelectorAll('input, textarea').forEach((input) => {
    //   input.addEventListener(
    //     'focus',
    //     (e) => {
    //       window.scrollTo(0, 0);
    //     },
    //     { passive: false },
    //   );
    // });
    $('.product__slider-media').each(function () {
      const $media = $(this);
      const items = [];

      // собираем всё в правильном порядке
      $media.children().each(function () {
        const $el = $(this);

        // если группа картинок
        if ($el.hasClass('product__slider-images')) {
          $el.children().each(function () {
            items.push($(this));
          });
        }

        // если видео
        else if ($el.hasClass('product__slider-video')) {
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
  }

  $('.partnershipTypes__list-item_top img').on('click', function () {
    $(this).parents('.partnershipTypes__list-item').find('.btn-for-popup').click();
  });

  if ($(window).width() <= 1024) {
    $('.areas__grid-item').on('click', function () {
      $(this).toggleClass('active');
    });
  }

  //   const $outer = $('.product .product__slider');

  //   let innerDragged = false;

  //   $('.product__slider-media')
  //     .on('touchstart mousedown', function () {
  //       innerDragged = false;

  //       const outerOwl = $outer.data('owl.carousel');
  //       if (!outerOwl) return;

  //       outerOwl.options.touchDrag = false;
  //       outerOwl.options.mouseDrag = false;
  //     })
  //     .on('touchmove mousemove', function () {
  //       innerDragged = true;
  //     })
  //     .on('touchend mouseup touchcancel mouseleave', function () {
  //       const outerOwl = $outer.data('owl.carousel');
  //       if (!outerOwl) return;

  //       // небольшая задержка, иначе Owl ловит инерцию
  //       setTimeout(() => {
  //         outerOwl.options.touchDrag = true;
  //         outerOwl.options.mouseDrag = true;
  //       }, 50);
  //     });

  //   // 🔒 БЛОКИРУЕМ КЛИК ПОСЛЕ СВАЙПА (чтобы Fancybox не открывался)
  //   $(document).on(
  //     'click',
  //     '.product__slider-media a.gallery-item, .product__slider-media .video-fancybox-trigger',
  //     function (e) {
  //       if (innerDragged) {
  //         e.preventDefault();
  //         e.stopImmediatePropagation();
  //         innerDragged = false;
  //       }
  //     },
  //   );
  //   $('.product__slider-media').on('touchstart touchmove mousedown mousemove', function (e) {
  //     e.stopPropagation();
  // });

  // Рішення 1: Зупинка спливання подій для внутрішніх слайдерів

  // Знаходимо всі внутрішні слайдери
  $('.product__slider-media').each(function () {
    var $innerSlider = $(this);

    // Зупиняємо спливання подій миші
    $innerSlider.on('mousedown touchstart', function (e) {
      e.stopPropagation();
    });

    // Зупиняємо спливання подій перетягування
    $innerSlider.on('drag.owl.carousel dragged.owl.carousel', function (e) {
      e.stopPropagation();
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

  // Рішення 2: При ініціалізації слайдерів (якщо ви контролюєте їх ініціалізацію)
  // Додайте це до коду ініціалізації внутрішнього слайдера:
  /*
$('.product__slider-media').owlCarousel({
    // ваші налаштування...
    onDrag: function(event) {
        event.stopPropagation();
    },
    onDragged: function(event) {
        event.stopPropagation();
    }
});
*/
  if ($(window).width() <= 576) {
    $('.projectAuditExpertise__slide-top')
      .on('touchstart mousedown', function (e) {
        // 🔥 НЕ даём событию уйти во внешний слайдер
        e.stopPropagation();
      })
      .on('drag.owl.carousel dragged.owl.carousel', function (e) {
        e.stopPropagation();
      })
      .on('touchstart', function () {
        const $outer = $(this).closest('.projectAuditExpertise__slider');
        const owl = $outer.data('owl.carousel');

        if (!owl) return;

        owl.options.mouseDrag = false;
        owl.options.touchDrag = false;
      })
      .on('touchend touchcancel mouseup', function () {
        const $outer = $(this).closest('.projectAuditExpertise__slider');
        const owl = $outer.data('owl.carousel');

        if (!owl) return;

        owl.options.mouseDrag = true;
        owl.options.touchDrag = true;
      });
  }




});





