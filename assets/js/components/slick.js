$(function () {
  const $slider = $('.hero__main-slider');
  const $slider_title = $('.hero__title-slider');
  const $slider_nav = $('.hero__main-slider-nav-additional');
  const $productLink = $('.hero__nav-btn');
  const $desc = $('.hero__desc');

  /** ------------------------------
   **  Обновление ссылки под кнопкой
   ** ------------------------------ */
  function updateProductLink(currentSlide) {
    const $active = $slider_nav.find('.slick-active.slick-center');
    const link = $active.attr('data-link') || '#';
    const desc = $active.attr('data-desc');
    $productLink.attr('href', link);
    $desc.stop(true, true).fadeOut(200, function () {
      $desc.text(desc).fadeIn(200);
    });
  }

  /** ------------------------------
   ** 1) Слайдер заголовков
   ** ------------------------------ */

  $slider_title.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    speed: 800,
    draggable: false,
    swipe: false,
    infinite: true,
    adaptiveHeight: true,
    asNavFor: '.hero__main-slider',
  });

  /** ------------------------------
   ** 2) Вертикальный навигационный
   ** ------------------------------ */

  if ($slider_nav.length) {
    $slider_nav.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      vertical: true,
      centerMode: true,
      centerPadding: '10px',
      infinite: true,
      draggable: false,
      swipe: false,
      speed: 800,
      cssEase: 'ease',
      asNavFor: '.hero__main-slider',
    });

    $slider_nav.on('init', function (e, slick) {
      setTimeout(() => slick.setPosition(), 300);
      updateProductLink(0);
      startProgress(slick, 0);
    });

    setTimeout(() => $slider_nav.slick('setPosition'), 500);
  }

  /** ------------------------------
   ** 3) Главный слайдер
   ** ------------------------------ */
  $slider
    .slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      infinite: true,
      fade: true,
      speed: 800,
      autoplay: true,
      autoplaySpeed: 3000,
      cssEase: 'ease',
      draggable: true,
      swipe: true,
      prevArrow: '<button type="button" class="slick-prev slick-arrow"></button>',
      nextArrow: '<button type="button" class="slick-next slick-arrow"></button>',
      asNavFor: '.hero__title-slider', // ← только один, как и должно быть!
    })

    /** Обновляем ссылку */
    .on('afterChange', function (event, slick, currentSlide) {
      updateProductLink(currentSlide);
      // Прокручиваем вертикальный вручную (корректная тройная связка)
      $slider_nav.slick('slickGoTo', currentSlide);
    })

    /** Прогресс при смене */
    .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      startProgress(slick, nextSlide);
    });

  /** ------------------------------
   ** Progress-bar для вертикального меню
   ** ------------------------------ */
  function startProgress(slick, index) {
    if (!$slider_nav.length) return;

    const progressBar = $slider_nav[0];
    const autoplaySpeed = slick.options.autoplaySpeed;

    progressBar.style.setProperty('--slide-progress-time', autoplaySpeed + 'ms');

    progressBar.classList.remove('do-progress');
    void progressBar.offsetWidth; // reflow hack
    progressBar.classList.add('do-progress');
  }

  $slider_nav.on('beforeChange', function (e, slick, current, next) {
    startProgress(slick, next);
  });
});
