$(function () {
  $('.partners__list').owlCarousel({
    loop: true,
    nav: true,
    navText: [
      '<span class="sr-only">Наступний слайд</span>',
      '<span class="sr-only">Попередній слайд</span>',
    ],
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    freeDrag: false,
    URLhashListener: false,
    autoplay: false,
    stagePadding: 0,
    responsive: {
      0: {
        items: 2,
        stagePadding: 0,
      },
      768: {
        items: 3,
        stagePadding: 0,
      },
      1280: {
        items: 4,
        stagePadding: 0,
      },
      1650: {
        items: 5,
        stagePadding: 0,
      },
    },
  });
  function setPageInfoProductList() {
    const $carousel = $('.pageInfo__product-list');
    const isMobile = $(window).width() < 1024;

    if (isMobile) {
      // INIT
      if (!$carousel.hasClass('owl-loaded')) {
        $carousel.owlCarousel({
          loop: true,
          nav: true,
          navText: [
            '<span class="sr-only">Наступний слайд</span>',
            '<span class="sr-only">Попередній слайд</span>',
          ],
          mouseDrag: true,
          touchDrag: true,
          pullDrag: false,
          freeDrag: false,
          URLhashListener: false,
          autoplay: false,
          stagePadding: 50,
          margin: 10,
          responsive: {
            0: {
              items: 1,
              stagePadding: 10,
            },
            576: {
              items: 1,
              stagePadding: 10,
            },
            768: {
              items: 2,
              stagePadding: 10,
            },
            992: {
              items: 2,
              stagePadding: 10,
            },
          },
        });
      }
    } else {
      // DESTROY
      if ($carousel.hasClass('owl-loaded')) {
        $carousel.trigger('destroy.owl.carousel');

        // 🧼 необязательно, но рекомендую
        $carousel.find('.owl-stage-outer').children().unwrap();
        $carousel.removeClass('owl-loaded');
      }
    }
  }

  setPageInfoProductList();
  $(window).on('resize', setPageInfoProductList);

  function initManufacturingSliders() {
    const isMobile = $(window).width() < 1024;

    const $desktopSlider = $('.manufacturingImagesSlider .product__slider');
    const $mobileSlider = $('.manufacturingImagesSlider .product__slider_mobile');

    // ===== MOBILE =====
    if (isMobile) {
      // уничтожаем desktop
      if ($desktopSlider.hasClass('owl-loaded')) {
        $desktopSlider.trigger('destroy.owl.carousel');
        $desktopSlider.removeClass('owl-loaded');
        $desktopSlider.find('.owl-stage-outer').children().unwrap();
      }

      // инициализируем mobile
      if (!$mobileSlider.hasClass('owl-loaded')) {
        $mobileSlider.owlCarousel({
          loop: true,
          nav: true,
          navText: [
            '<span class="sr-only">Наступний слайд</span>',
            '<span class="sr-only">Попередній слайд</span>',
          ],
          mouseDrag: true,
          touchDrag: true,
          pullDrag: false,
          freeDrag: false,
          autoplay: false,
          margin: 10,
          items: 1,
          responsive: {
            0: { stagePadding: 20 },
            576: { stagePadding: 30 },
            768: { stagePadding: 100 },
          },
        });
      }

      // ===== DESKTOP =====
    } else {
      // уничтожаем mobile
      if ($mobileSlider.hasClass('owl-loaded')) {
        $mobileSlider.trigger('destroy.owl.carousel');
        $mobileSlider.removeClass('owl-loaded');
        $mobileSlider.find('.owl-stage-outer').children().unwrap();
      }

      // инициализируем desktop
      if (!$desktopSlider.hasClass('owl-loaded')) {
        $desktopSlider.owlCarousel({
          loop: true,
          nav: true,
          navText: [
            '<span class="sr-only">Наступний слайд</span>',
            '<span class="sr-only">Попередній слайд</span>',
          ],
          mouseDrag: true,
          touchDrag: true,
          pullDrag: false,
          freeDrag: false,
          autoplay: false,
          items: 1,
          responsive: {
            0: {
              stagePadding: 10,
              margin: 10,
            },
            576: {
              stagePadding: 20,
              margin: 10,
            },
            768: {
              stagePadding: 100,
              margin: 10,
            },
            1024: {
              stagePadding: 75,
              margin: 75,
            },
            1920: {
              stagePadding: 100,
              margin: 100,
            },
          },
        });
      }
    }
  }

  // первый запуск
  initManufacturingSliders();

  // resize + rotate
  $(window).on('resize orientationchange', function () {
    initManufacturingSliders();
  });

  $('.product__slider').owlCarousel({
    loop: true,
    nav: true,
    navText: [
      '<span class="sr-only">Наступний слайд</span>',
      '<span class="sr-only">Попередній слайд</span>',
    ],
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    freeDrag: false,
    URLhashListener: false,
    autoplay: false,
    autoHeight: true,
    onInitialized: toggleNav,
    onChanged: toggleNav,
    items: 1,
    responsive: {
      0: {
        stagePadding: 0,
        margin: 0,
        mouseDrag: false,
        touchDrag: false,
      },
      768: {
        mouseDrag: true,
        touchDrag: true,
        stagePadding: 0,
        margin: 0,
      },
      1280: {
        stagePadding: 75,
        margin: 75,
        mouseDrag: true,
        touchDrag: true,
      },
      1920: {
        stagePadding: 100,
        margin: 100,
        mouseDrag: true,
        touchDrag: true,
      },
    },
  });
  function toggleNav(event) {
    const carousel = $(event.target);
    const itemsCount = event.item.count;
    if (itemsCount <= 1) {
      carousel.find('.owl-nav').hide();
    } else {
      carousel.find('.owl-nav').show();
    }
  }

  function initMediaCarousel() {
    if ($(window).width() <= 576) {
      $('.product__slider-media').owlCarousel({
        loop: true,
        nav: true,
        navText: [
          '<span class="sr-only">Наступний слайд</span>',
          '<span class="sr-only">Попередній слайд</span>',
        ],
        mouseDrag: true,
        touchDrag: true,
        pullDrag: false,
        freeDrag: false,
        URLhashListener: false,
        autoplay: false,
        stagePadding: 20,
        margin: 10,
        items: 1,
        // onDragged: function () {
        //   return false;
        // },
      });
    }
    // $(".product__slider-media .owl-next").click();
  }
  setTimeout(initMediaCarousel, 300);

  $('.related__slider').owlCarousel({
    loop: true,
    nav: true,
    navText: [
      '<span class="sr-only">Наступний слайд</span>',
      '<span class="sr-only">Попередній слайд</span>',
    ],
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    freeDrag: false,
    URLhashListener: false,
    autoplay: false,
    center: true,
    responsive: {
      0: {
        margin: 5,
        stagePadding: 50,
        items: 1,
      },
      576: {
        margin: 10,
        stagePadding: 150,
        items: 1,
      },
      992: {
        margin: 10,
        stagePadding: 200,
        items: 1,
      },
      1024: {
        margin: 10,
        stagePadding: 0,
        items: 3,
      },
      1920: {
        margin: 10,
        stagePadding: 0,
        items: 3,
      },
      2800: {
        margin: 15,
        stagePadding: 0,
        items: 3,
      },
    },
  });

  function initDepartmentsSlider() {
    const $slider = $('.departments__items');
    const isMobile = $(window).width() < 1024;

    if (isMobile) {
      // если еще НЕ инициализирован
      if (!$slider.hasClass('owl-loaded')) {
        $slider.owlCarousel({
          loop: true,
          nav: true,
          navText: [
            '<span class="sr-only">Наступний слайд</span>',
            '<span class="sr-only">Попередній слайд</span>',
          ],
          mouseDrag: true,
          touchDrag: true,
          pullDrag: false,
          freeDrag: false,
          autoplay: false,
          responsive: {
            0: {
              margin: 15,
              stagePadding: 30,
              items: 1,
            },
            576: {
              margin: 20,
              stagePadding: 20,
              items: 2,
            },
            992: {
              margin: 20,
              stagePadding: 100,
              items: 2,
            },
          },
        });
      }
    } else {
      // если был инициализирован — уничтожаем
      if ($slider.hasClass('owl-loaded')) {
        $slider.trigger('destroy.owl.carousel');
        $slider.removeClass('owl-loaded');
        $slider.find('.owl-stage-outer').children().unwrap();
      }
    }
  }

  // первый запуск
  initDepartmentsSlider();

  // resize + rotate
  $(window).on('resize orientationchange', function () {
    initDepartmentsSlider();
  });

  $('.aboutSlider__slider').owlCarousel({
    loop: true,
    nav: true,
    navText: [
      '<span class="sr-only">Наступний слайд</span>',
      '<span class="sr-only">Попередній слайд</span>',
    ],
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    freeDrag: false,
    URLhashListener: false,
    autoplay: false,
    responsive: {
      0: {
        items: 1,
        stagePadding: 20,
        margin: 10,
      },
      576: {
        items: 2,
        stagePadding: 30,
        margin: 10,
      },
      1024: {
        items: 3,
        stagePadding: 75,
        margin: 10,
      },
      1440: {
        items: 4,
        stagePadding: 0,
        margin: 10,
      },
      1920: {
        items: 4,
        stagePadding: 0,
        margin: 15,
      },
    },
  });

  var $mainOwl = $('.projectAuditExpertise__slider');
  var $topSliders = $('.projectAuditExpertise__slide-top');

  var MOBILE_QUERY = window.matchMedia('(max-width: 1280px)');
  var isMobile = null;

  /* =========================
     MAIN SLIDER
  ========================= */

  function initMainSlider() {
    if (!$mainOwl.length || $mainOwl.hasClass('owl-loaded')) return;

    $mainOwl.owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      dots: true,
      autoHeight: true,
      navText: [
        '<span class="sr-only">Наступний слайд</span>',
        '<span class="sr-only">Попередній слайд</span>',
      ],
      responsive: {
        0: {
          mouseDrag: false,
          touchDrag: false,
        },
        992: {
          mouseDrag: true,
          touchDrag: true,
        },
      },
    });

    // обновление высоты после загрузки картинок
    $mainOwl.find('img').each(function () {
      if (this.complete) return;
      $(this).one('load', function () {
        $mainOwl.trigger('refresh.owl.carousel');
      });
    });
  }
  initMainSlider();
  $(window).on('resize', function () {
    if ($(window).width() <= 576) {
      initTopSliders();
    } else {
      destroyTopSliders();
      initMainSlider()
    }
  });
  /* =========================
     TOP SLIDER (MOBILE ONLY)
  ========================= */

  function initTopSliders() {
    $topSliders.each(function () {
      var $s = $(this);

      if ($s.hasClass('owl-loaded')) return;

      $s.owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        autoHeight: true,
        stagePadding: 30,
        margin: 10,
        navText: [
          '<span class="sr-only">Наступний слайд</span>',
          '<span class="sr-only">Попередній слайд</span>',
        ],
      });
    });
  }
  if ($(window).width() <= 576) {
    initTopSliders();
  }

  function destroyTopSliders() {
    $topSliders.each(function () {
      var $s = $(this);

      if (!$s.hasClass('owl-loaded')) return;

      $s.trigger('destroy.owl.carousel');

      // вернуть DOM в исходное состояние
      $s.removeClass('owl-loaded owl-hidden');
      $s.find('.owl-stage-outer').children().unwrap();
      $s.find('.owl-stage').children().unwrap();
    });
  }

  /* =========================
     MODE SWITCHER
  ========================= */

  // function updateTopSliders() {
  //   var mobileNow = MOBILE_QUERY.matches;

  //   if (mobileNow === isMobile) return;
  //   isMobile = mobileNow;

  //   if (mobileNow) {
  //     initTopSliders();
  //   } else {
  //     destroyTopSliders();
  //   }
  // }

  /* =========================
     INIT
  ========================= */

  // updateTopSliders();

  // смена брейкпоинта
  // if (MOBILE_QUERY.addEventListener) {
  //   MOBILE_QUERY.addEventListener('change', updateTopSliders);
  // } else {
  //   MOBILE_QUERY.addListener(updateTopSliders);
  // }

  // Safari / Android fallback
  // window.addEventListener('orientationchange', function () {
  //   setTimeout(updateTopSliders, 300);
  //   if($(window).width() <= 1280) {

  //     setTimeout(destroyTopSliders, 300);
  //   } else if($(window).width() <= 992) {
  //     setTimeout(initTopSliders, 300);
  //   }
  //   initMainSlider();
  // });

  $('.reviews__slider').owlCarousel({
    loop: true,
    nav: true,
    navText: [
      '<span class="sr-only">Наступний слайд</span>',
      '<span class="sr-only">Попередній слайд</span>',
    ],
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    freeDrag: false,
    URLhashListener: false,
    autoplay: false,
    stagePadding: 0,
    items: 1,
    responsive: {
      0: {
        stagePadding: 30,
        margin: 15,
      },
      576: {
        stagePadding: 50,
        margin: 20,
      },
      768: {
        stagePadding: 100,
        margin: 20,
      },
      1024: {
        stagePadding: 100,
        margin: 20,
      },
      1280: {
        stagePadding: 0,
        margin: 20,
      },
    },
  });
  $('.licenses__slider').owlCarousel({
    loop: true,
    nav: true,
    navText: [
      '<span class="sr-only">Наступний слайд</span>',
      '<span class="sr-only">Попередній слайд</span>',
    ],
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    freeDrag: false,
    URLhashListener: false,
    autoplay: false,
    items: 2,
    responsive: {
      0: {
        margin: 10,
      },
      576: {
        margin: 36,
      },
      768: {
        margin: 56,
      },
      1024: {
        margin: 134,
      },
      1920: {
        margin: 236,
      },
      2600: {
        margin: 355,
      },
    },
  });

  $('.certificates__slider').owlCarousel({
    loop: true,
    nav: true,
    navText: [
      '<span class="sr-only">Наступний слайд</span>',
      '<span class="sr-only">Попередній слайд</span>',
    ],
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    freeDrag: false,
    URLhashListener: false,
    autoplay: false,
    responsive: {
      0: {
        margin: 10,
        items: 2,
        stagePadding: 30,
      },
      576: {
        margin: 15,
        items: 2,
        stagePadding: 100,
      },
      768: {
        margin: 15,
        items: 3,
        stagePadding: 100,
      },
      1024: {
        margin: 35,
        items: 4,
      },
      1440: {
        margin: 60,
        items: 4,
      },
      1920: {
        margin: 88,
        items: 4,
      },
    },
  });
});
