$(function () {
  const $slider = $('.hero__main-slider');
  const $slider_nav = $('.hero__main-slider-nav-additional');
  const $title = $('.hero__title');
  const $productLink = $('.hero__nav-btn');
  const $desc = $('.hero__desc');

  /* -----------------------------
   * Обновление текста и ссылки
   * ----------------------------- */
  function updateProductLink(currentSlide) {
    const $current = $slider.find('.slick-slide[data-slick-index="' + currentSlide + '"]');

    const link = $current.attr('data-link') || '#';
    const desc = $current.attr('data-desc') || '';
    const title =
      $current.attr('data-title') || $slider_nav.find('.slick-current.slick-center span').text();

    $productLink.attr('href', link);

    $desc.stop(true, true).css('opacity', 0).text(desc).animate({ opacity: 1 }, 200);
    $title.stop(true, true).css('opacity', 0).text(title).animate({ opacity: 1 }, 200);
  }

  /* -----------------------------
   * Progress bar
   * ----------------------------- */
  function startProgress(slick) {
    if (!$slider_nav.length) return;

    const bar = $slider_nav[0];
    const autoplaySpeed = slick?.options?.autoplaySpeed;

    if (!autoplaySpeed) return;

    bar.style.setProperty('--slide-progress-time', autoplaySpeed + 'ms');

    bar.classList.remove('do-progress');
    void bar.offsetWidth; // reflow
    bar.classList.add('do-progress');
  }

  /* -----------------------------
   * Инициализация вертикального меню
   * ----------------------------- */
  if ($slider_nav.length) {
    $slider_nav.on('init', function (e, slick) {
      updateProductLink();
      startProgress(slick);
    });

    $slider_nav.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      vertical: true,
      centerMode: true,
      centerPadding: '10px',
      arrows: false,
      dots: false,
      infinite: true,
      draggable: false,
      swipe: false,
      speed: 800,
      cssEase: 'ease',
      asNavFor: '.hero__main-slider',
    });
  }

  /* -----------------------------
   * Главный слайдер
   * ----------------------------- */
  if ($slider.length) {
    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      arrows: true,
      dots: true,
      infinite: true,
      speed: 800,
      autoplay: true,
      autoplaySpeed: 3000,
      cssEase: 'ease',
      draggable: true,
      swipe: true,
      prevArrow: '<button type="button" class="slick-prev slick-arrow"></button>',
      nextArrow: '<button type="button" class="slick-next slick-arrow"></button>',
      asNavFor: '.hero__main-slider-nav-additional',
    });

    // Обновление ссылок
    $slider.on('afterChange', function (event, slick, currentSlide) {
      updateProductLink(currentSlide);
      $slider_nav.slick('slickGoTo', currentSlide);
    });

    // Прогресс
    $slider.on('beforeChange', function (event, slick, current, next) {
      startProgress(slick);
    });
  }
});
