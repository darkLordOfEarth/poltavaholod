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

    // Сброс анимации с небольшой задержкой для стабильности
    setTimeout(() => {
      $slider_nav[0].classList.remove('do-progress');
      void $slider_nav[0].offsetWidth; // trigger reflow
      $slider_nav[0].classList.add('do-progress');
    }, 10);
  }

  /* -----------------------------------------------------
   * 4) Вертикальная навигация
   * ----------------------------------------------------- */
  if ($slider_nav.length) {
    $slider_nav.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      vertical: true,
      centerMode: true,
      centerPadding: '0',
      arrows: false,
      infinite: true,
      draggable: false,
      swipe: false,
      pauseOnFocus: false,
      pauseOnHover: false,
      speed: 800,
      cssEase: 'ease',
      initialSlide: 0,
      focusOnSelect: true,
      asNavFor: '.hero__main-slider',
      // verticalSwiping: false,
      // touchMove: false,
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
      pauseOnFocus: false,
      pauseOnHover: false,
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
  // Добавьте этот код после инициализации $slider_nav
  $slider_nav.on('afterChange', function (event, slick, currentSlide) {
    // Принудительно обновляем позицию слайдов
    setTimeout(() => {
      const $track = $slider_nav.find('.slick-track');
      if ($track.length) {
        const transformValue = $track.css('transform');
        // Проверяем, чтобы трансформация не выходила за пределы
        const match = transformValue.match(/translate3d\(0px, (-\d+)px, 0px\)/);
        if (match) {
          const translateY = parseInt(match[1]);
          const maxTranslate = $track.height() - $slider_nav.find('.slick-list').height();

          // Ограничиваем позицию, чтобы не уходили вверх
          if (translateY > 0) {
            $track.css('transform', 'translate3d(0px, 0px, 0px)');
          } else if (Math.abs(translateY) > maxTranslate) {
            $track.css('transform', `translate3d(0px, -${maxTranslate}px, 0px)`);
          }
        }
      }
    }, 50);
  });
  /* -----------------------------------------------------
 * 6) Улучшенная обработка кликов на слайды
 * ----------------------------------------------------- */
if ($slider_nav.length) {
  // Обработчик клика на слайды навигации
  $slider_nav.on('click', '.slick-dupe', function() {
    const $slide = $(this);
    const currentIndex = $slider_nav.slick('slickCurrentSlide');
    const clickedIndex = parseInt($slide.attr('data-slick-index'));
    const isCloned = $slide.hasClass('slick-cloned');
    
    // Если это дублированный слайд, переключаемся на соответствующий оригинал
    if (isCloned) {
      const totalSlides = $slider_nav.slick('getSlick').slideCount;
      const visibleSlides = 3; // slidesToShow
      
      let targetIndex;
      
      // Определяем направление
      if (clickedIndex > currentIndex) {
        // Клик на слайд в будущем
        $slider.slick('slickNext');
      } else {
        // Клик на слайд в прошлом
        $slider.slick('slickPrev');
      }
    } else {
      // Для оригинальных слайдов используем стандартное поведение
      $slider_nav.slick('slickGoTo', clickedIndex);
    }
  });
}
});
