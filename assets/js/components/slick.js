$(function () {
  const $slider = $('.hero__main-slider');
  const $slider_nav = $('.hero__main-slider-nav-additional');
  const $title = $('.hero__title');
  const $productLink = $('.hero__nav-btn');
  const $desc = $('.hero__desc');
  $(document).ready(function () {
    $slider.find('.slick-next').click();
  });
  /* -----------------------------------------------------
   * 1) Собираем данные из главных слайдов в массив
   * ----------------------------------------------------- */
  const slidesData = [];
  if ($slider.length) {
    $slider.find('.hero__slide').each(function () {
      const $slide = $(this);

      slidesData.push({
        title: $slide.find('img').attr('data-title') || '',
        desc: $slide.find('img').attr('data-desc') || '',
        link: $slide.find('img').attr('data-link') || '#',
      });
    });
  }

  /* -----------------------------------------------------
   * 2) Обновление текста без DOM-лагов
   * ----------------------------------------------------- */
  function updateTexts(index) {
    const data = slidesData[index];
    if (!data) return;

    // Обновляем ссылку
    $productLink.attr('href', data.link);

    // Плавное обновление заголовка и описания
    $title.stop(true, true).css('opacity', 0).text(data.title).animate({ opacity: 1 }, 200);
    $desc.stop(true, true).css('opacity', 0).text(data.desc).animate({ opacity: 1 }, 200);
  }

  /* -----------------------------------------------------
   * 3) Прогресс-бар для вертикального слайдера
   * ----------------------------------------------------- */
  function startVerticalProgress(slick) {
    if (!$slider_nav.length) return;

    const autoplaySpeed = slick.options.autoplaySpeed + 'ms';

    // Подставляем время анимации
    $slider_nav[0].style.setProperty('--slide-progress-time', autoplaySpeed);

    // Сброс анимации (reflow trick)
    $slider_nav[0].classList.remove('do-progress');
    void $slider_nav[0].offsetWidth;
    $slider_nav[0].classList.add('do-progress');
  }

  /* -----------------------------------------------------
   * 4) Вертикальная навигация
   * ----------------------------------------------------- */
  if ($slider_nav.length) {
    $slider_nav.slick({
      slidesToShow: 3,
      vertical: true,
      centerMode: true,
      // centerPadding: '10px',
      arrows: false,
      infinite: true,
      draggable: false,
      swipe: false,
      speed: 800,
      cssEase: 'ease',
      focusOnSelect: true,
      asNavFor: '.hero__main-slider',
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            vertical: false,
          },
        },
      ],
    });
  }

  /* -----------------------------------------------------
   * 5) Главный слайдер
   * ----------------------------------------------------- */
  if ($slider.length) {
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

    // Инициализация - устанавливаем данные первого слайда
    $slider.on('init', function (event, slick) {
      updateTexts(0);
      startVerticalProgress(slick);

      // Устанавливаем переменную для dots
      const autoplaySpeed = slick.options.autoplaySpeed + 'ms';
      document.documentElement.style.setProperty('--slide-progress-time', autoplaySpeed);

      // Сбрасываем класс для первого dot
      $('.slick-dots li').removeClass('slick-active');
      $($('.slick-dots li')[0]).addClass('slick-active');
    });

    // Перед сменой слайда обновляем данные
    $slider.on('beforeChange', function (event, slick, current, next) {
      updateTexts(next);
      startVerticalProgress(slick);
    });
  }
});
