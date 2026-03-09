$(function () {
  const $slider = $('.hero__main-slider');
  const $slider_nav = $('.hero__main-slider-nav-additional');
  const $title = $('.hero__title');
  const $productLink = $('.hero__nav-btn');
  const $desc = $('.hero__desc');

  // Скорость анимации (нужна для таймера удаления временного класса)
  const SLIDER_SPEED = 800;
 $(document).ready(function () {
    $slider.find('.slick-next').click();
  });
  // ------------------- Вспомогательные функции -------------------
  function updateTexts(index) {
    const data = slidesData[index];
    if (!data) return;
    $productLink.attr('href', data.link);
    $title.stop(true, true).css('opacity', 0).text(data.title).animate({ opacity: 1 }, 200);
    $desc.stop(true, true).css('opacity', 0).text(data.desc).animate({ opacity: 1 }, 200);
  }

  function startVerticalProgress(slick) {
    if (!$slider_nav.length) return;
    const autoplaySpeed = slick.options.autoplaySpeed + 'ms';
    $slider_nav[0].style.setProperty('--slide-progress-time', autoplaySpeed);
    setTimeout(() => {
      $slider_nav[0].classList.remove('do-progress');
      void $slider_nav[0].offsetWidth;
      $slider_nav[0].classList.add('do-progress');
    }, 10);
  }

  // ------------------- Intersection Observer для навигации -------------------
  let navObserver = null;

  function setupNavObserver() {
    if (!$slider_nav.length) return;

    // Отключаем старый observer
    if (navObserver) {
      navObserver.disconnect();
    }

    const $list = $slider_nav.find('.slick-list');
    if (!$list.length) return;

    // Создаём новый observer
    navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const $slide = $(entry.target);
        if (entry.isIntersecting) {
          $slide.addClass('temp-current');
        } else {
          $slide.removeClass('temp-current');
        }
      });
    }, {
      root: $list[0],            // контейнер списка
      threshold: 0.5,             // считаем центральным, если видно более половины
      rootMargin: '0px'
    });

    // Наблюдаем за всеми слайдами навигации (оригиналы и клоны)
    $slider_nav.find('.slick-slide').each(function () {
      navObserver.observe(this);
    });
  }

  // ------------------- Сбор данных из главных слайдов -------------------
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

  // ------------------- Инициализация навигационного слайдера -------------------
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

    // Запускаем observer после инициализации
    $slider_nav.on('init', function () {
      setupNavObserver();
    });

    // Обновляем observer после каждого изменения слайдера (например, при смене слайда)
    $slider_nav.on('afterChange', function () {
      // Даём Slick обновить DOM перед тем, как перезапустить observer
      setTimeout(setupNavObserver, 0);
    });

    // Обновляем observer при изменении размеров окна
    $(window).on('resize', function () {
      setupNavObserver();
    });

    // Клик по слайдам навигации (оставляем ваш существующий код)
    $slider_nav.on('click', '.slick-dupe', function() {
      const $slide = $(this);
      const currentIndex = $slider_nav.slick('slickCurrentSlide');
      const clickedIndex = parseInt($slide.attr('data-slick-index'));
      const isCloned = $slide.hasClass('slick-cloned');
      
      if (isCloned) {
        if (clickedIndex > currentIndex) {
          $slider.slick('slickNext');
        } else {
          $slider.slick('slickPrev');
        }
      } else {
        $slider_nav.slick('slickGoTo', clickedIndex);
      }
    });
  }

  // ------------------- Главный слайдер -------------------
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

    // События главного слайдера
    $slider.on('init', function (event, slick) {
      updateTexts(0);
      startVerticalProgress(slick);
      const autoplaySpeed = slick.options.autoplaySpeed + 'ms';
      document.documentElement.style.setProperty('--slide-progress-time', autoplaySpeed);
    });

    $slider.on('beforeChange', function (event, slick, current, next) {
      updateTexts(next);
      startVerticalProgress(slick);
      // Обратите внимание: observer сам определит центральный слайд после перемещения
      // Ничего дополнительно делать не нужно
    });
  }

  // ------------------- Запуск observer после начальной загрузки страницы -------------------
  // Если слайдер уже проинициализирован, observer запустится из событий выше.
  // На всякий случай дублируем вызов после небольшой задержки.
  setTimeout(setupNavObserver, 100);
});