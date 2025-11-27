$(function () {
  const $slider = $('.hero__main-slider');
  const $slider_nav = $('.hero__main-slider-nav-additional');
  const $title = $('.hero__title');
  const $productLink = $('.hero__nav-btn');
  const $desc = $('.hero__desc');

  /* -----------------------------------------------------
   * 1) Собираем данные из главных слайдов в массив
   * ----------------------------------------------------- */
  const slidesData = [];

  $slider.find('img').each(function () {
    slidesData.push({
      title: $(this).attr('data-title') || '',
      desc: $(this).attr('data-desc') || '',
      link: $(this).attr('data-link') || '#',
    });
  });

  /* -----------------------------------------------------
   * 2) Обновление текста без DOM-лагов
   * ----------------------------------------------------- */
  function updateTexts(index) {
    const data = slidesData[index];
    if (!data) return;

    $productLink.attr('href', data.link);

    $title.stop(true, true).css('opacity', 0).text(data.title).animate({ opacity: 1 }, 200);
    $desc.stop(true, true).css('opacity', 0).text(data.desc).animate({ opacity: 1 }, 200);
  }

  /* -----------------------------------------------------
   * Прогресс-бар
   * ----------------------------------------------------- */
  function startProgress(slick) {
    if (!$slider_nav.length) return;

    const bar = $slider_nav[0];
    const autoplaySpeed = slick?.options?.autoplaySpeed;

    bar.style.setProperty('--slide-progress-time', autoplaySpeed + 'ms');

    bar.classList.remove('do-progress');
    void bar.offsetWidth;
    bar.classList.add('do-progress');
  }

  /* -----------------------------------------------------
   * Вертикальная навигация
   * ----------------------------------------------------- */
  if ($slider_nav.length) {
    $slider_nav.on('init', function (e, slick) {
      updateTexts(0);
      startProgress(slick);
    });

    $slider_nav.slick({
      slidesToShow: 3,
      vertical: true,
      centerMode: true,
      centerPadding: '10px',
      arrows: false,
      infinite: true,
      draggable: false,
      swipe: false,
      speed: 800,
      cssEase: 'ease',
      asNavFor: '.hero__main-slider',
      // responsive: [
      //   {
      //     breakpoint: 576,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //       vertical: false,
      //     },
      //   },
      // ],
    });
  }

  /* -----------------------------------------------------
   * Главный слайдер
   * ----------------------------------------------------- */
  $slider.slick({
    slidesToShow: 1,
    fade: true,
    arrows: true,
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'ease',
    prevArrow: '<button type="button" class="slick-prev slick-arrow"></button>',
    nextArrow: '<button type="button" class="slick-next slick-arrow"></button>',
    asNavFor: '.hero__main-slider-nav-additional',
  });

  /* -----------------------------------------------------
   * События слайдера
   * ----------------------------------------------------- */

  // МГНОВЕННОЕ обновление заголовка и описания
  $slider.on('init', function (event, slick) {
    updateTexts(0);

    // устанавливаем переменную сразу для первого dot
    const autoplaySpeed = slick.options.autoplaySpeed + 'ms';
    document.documentElement.style.setProperty('--slide-progress-time', autoplaySpeed);

    // сбрасываем ширину ::after для первого dot
    $('.slick-dots li').removeClass('slick-active'); // сброс класса
    $($('.slick-dots li')[0]).addClass('slick-active'); // заново
  });

  $slider.on('beforeChange', function (event, slick, current, next) {
    updateTexts(next);

    // подставляем время анимации прогресса
    const autoplaySpeed = slick.options.autoplaySpeed + 'ms';
    document.documentElement.style.setProperty('--slide-progress-time', autoplaySpeed);
  });
});
