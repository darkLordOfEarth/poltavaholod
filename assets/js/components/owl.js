$('.partners__list').owlCarousel({
  loop: true,
  nav: true,
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
