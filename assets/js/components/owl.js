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
    stagePadding: 50,
    responsive: {
      0: {
        items: 2,
        stagePadding: 50,
      },
      768: {
        items: 3,
        stagePadding: 50,
      },
      1280: {
        items: 4,
        stagePadding: 100,
      },
      1650: {
        items: 5,
        stagePadding: 100,
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
          items: 2,
          stagePadding: 10,
        },
        768: {
          items: 3,
          stagePadding: 30,
        },
      },
    });
  }

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

    items: 1,
    responsive: {
      0: {
        stagePadding: 0,
        margin: 0,
      },
      768: {
        stagePadding: 0,
        margin: 0,
      },
      1280: {
        stagePadding: 75,
        margin: 75,
      },
    },
  });
  $('.product__slider_mobile').owlCarousel({
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
    items: 1,
  });




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
  }
});

