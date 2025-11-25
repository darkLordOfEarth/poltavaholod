/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatestarterkit"]("app",{

/***/ "./assets/js/components/slick.js":
/*!***************************************!*\
  !*** ./assets/js/components/slick.js ***!
  \***************************************/
/***/ (() => {

eval("{$(function () {\r\n  const $slider = $('.hero__main-slider');\r\n  const $slider_title = $('.hero__title-slider');\r\n  const $slider_nav = $('.hero__main-slider-nav-additional');\r\n  const $productLink = $('.hero__nav-btn');\r\n\r\n  /** ------------------------------\r\n   **  Обновление ссылки под кнопкой\r\n   ** ------------------------------ */\r\n  function updateProductLink(currentSlide) {\r\n    const $active = $slider_title.find('.slick-slide').eq(currentSlide);\r\n    const link = $active.attr('data-link') || '#';\r\n    $productLink.attr('href', link);\r\n  }\r\n\r\n  /** ------------------------------\r\n   ** 1) Слайдер заголовков\r\n   ** ------------------------------ */\r\n  \r\n  $slider_title.slick({\r\n    slidesToShow: 1,\r\n    slidesToScroll: 1,\r\n    arrows: false,\r\n    dots: false,\r\n    speed: 800,\r\n    draggable: false,\r\n    swipe: false,\r\n    infinite: true,\r\n    adaptiveHeight: true,\r\n    asNavFor: '.hero__main-slider',\r\n  });\r\n\r\n  /** ------------------------------\r\n   ** 2) Вертикальный навигационный\r\n   ** ------------------------------ */\r\n  $('.hero__main-slider-nav-additional').slick('unslick').slick();\r\n  if ($slider_nav.length) {\r\n    $slider_nav.slick({\r\n      slidesToShow: 3,\r\n      slidesToScroll: 1,\r\n      arrows: false,\r\n      dots: false,\r\n      vertical: true,\r\n      centerMode: true,\r\n      centerPadding: '10px',\r\n      infinite: true,\r\n      draggable: false,\r\n      swipe: false,\r\n      speed: 800,\r\n      cssEase: 'ease',\r\n      asNavFor: '.hero__main-slider',\r\n    });\r\n\r\n    $slider_nav.on('init', function (e, slick) {\r\n      setTimeout(() => slick.setPosition(), 300);\r\n      updateProductLink(0);\r\n      startProgress(slick, 0);\r\n    });\r\n\r\n    setTimeout(() => $slider_nav.slick('setPosition'), 500);\r\n  }\r\n\r\n  /** ------------------------------\r\n   ** 3) Главный слайдер\r\n   ** ------------------------------ */\r\n  $slider\r\n    .slick({\r\n      slidesToShow: 1,\r\n      slidesToScroll: 1,\r\n      arrows: true,\r\n      dots: true,\r\n      infinite: true,\r\n      fade: true,\r\n      speed: 800,\r\n      autoplay: true,\r\n      autoplaySpeed: 3000,\r\n      cssEase: 'ease',\r\n      draggable: true,\r\n      swipe: true,\r\n      prevArrow:\r\n        '<button type=\"button\" class=\"slick-prev slick-arrow\"></button>',\r\n      nextArrow:\r\n        '<button type=\"button\" class=\"slick-next slick-arrow\"></button>',\r\n      asNavFor: '.hero__title-slider', // ← только один, как и должно быть!\r\n    })\r\n\r\n    /** Обновляем ссылку */\r\n    .on('afterChange', function (event, slick, currentSlide) {\r\n      updateProductLink(currentSlide);\r\n      // Прокручиваем вертикальный вручную (корректная тройная связка)\r\n      $slider_nav.slick('slickGoTo', currentSlide);\r\n    })\r\n\r\n    /** Прогресс при смене */\r\n    .on('beforeChange', function (event, slick, currentSlide, nextSlide) {\r\n      startProgress(slick, nextSlide);\r\n    });\r\n\r\n  /** ------------------------------\r\n   ** Progress-bar для вертикального меню\r\n   ** ------------------------------ */\r\n  function startProgress(slick, index) {\r\n    if (!$slider_nav.length) return;\r\n\r\n    const progressBar = $slider_nav[0];\r\n    const autoplaySpeed = slick.options.autoplaySpeed;\r\n\r\n    progressBar.style.setProperty(\r\n      '--slide-progress-time',\r\n      autoplaySpeed + 'ms'\r\n    );\r\n\r\n    progressBar.classList.remove('do-progress');\r\n    void progressBar.offsetWidth; // reflow hack\r\n    progressBar.classList.add('do-progress');\r\n  }\r\n\r\n  $slider_nav.on('beforeChange', function (e, slick, current, next) {\r\n    startProgress(slick, next);\r\n  });\r\n});\r\n\n\n//# sourceURL=webpack://starterkit/./assets/js/components/slick.js?\n}");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f0ebfb1a88ec2b4459dd")
/******/ })();
/******/ 
/******/ }
);