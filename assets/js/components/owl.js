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

  if ($(window).width() < 1280) {
    $('.pageInfo__product-list').owlCarousel({
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

  $('.manufacturingImagesSlider .product__slider').owlCarousel({
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
      1280: {
        stagePadding: 75,
        margin: 75,
      },
      1920: {
        stagePadding: 100,
        margin: 100,
      },
    },
  });
  $('.manufacturingImagesSlider .product__slider_mobile').owlCarousel({
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
    margin: 10,
    items: 1,
    responsive: {
      0: {
        stagePadding: 20,
      },
      576: {
        stagePadding: 30,
      },
      768: {
        stagePadding: 100,
      },
    },
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
      1280: {
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

  if ($(window).width() < 1280) {
    $('.departments__items').owlCarousel({
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
        // 1920: {
        //   margin: 10,
        //   stagePadding: 200,
        //   items: 3,
        // },
        // 2800: {
        //   margin: 15,
        //   stagePadding: 0,
        //   items: 3,
        // },
      },
    });
  }

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

  $('.projectAuditExpertise__slider').owlCarousel({
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
    items: 1,
    responsive: {
      0: {
        mouseDrag: false,
        touchDrag: false,
      },
      576: {
        mouseDrag: true,
        touchDrag: true,
      },
    },
  });

  var $mainOwl = $('.projectAuditExpertise__slider');

  $mainOwl.owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    dots: true,
    autoHeight: true,
  });

  // Пересчитать высоту один раз после загрузки всех картинок в слайде
  $mainOwl.find('img').each(function () {
    if (this.complete) return; // уже загружена
    $(this).on('load', function () {
      $mainOwl.trigger('refresh.owl.carousel'); // обновление один раз
    });
  });

  if ($(window).width() <= 576) {
    $('.projectAuditExpertise__slide-top').owlCarousel({
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
      items: 1,
      stagePadding: 30,
      margin: 10,
    });
  }

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
