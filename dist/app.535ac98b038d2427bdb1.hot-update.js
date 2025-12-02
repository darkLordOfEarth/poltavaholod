/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatestarterkit"]("app",{

/***/ "./assets/js/components/oneMoreScript.js":
/*!***********************************************!*\
  !*** ./assets/js/components/oneMoreScript.js ***!
  \***********************************************/
/***/ (() => {

eval("{$(function () {\r\n  // var windowWidth = window.innerWidth;\r\n  // var windowHeight = window.innerHeight;\r\n  // alert('width:' + windowWidth + ' ' + 'height:' + windowHeight);\r\n\r\n  function checkHeaderScroll() {\r\n    if ($(window).scrollTop() > 0) {\r\n      $('header').addClass('scrolled');\r\n    } else {\r\n      $('header').removeClass('scrolled');\r\n    }\r\n    let mainHeight = $('.main').outerHeight();\r\n    if ($(window).scrollTop() > mainHeight / 2) {\r\n      $('.main__group-btns').addClass('scrolled');\r\n    } else {\r\n      $('.main__group-btns').removeClass('scrolled');\r\n    }\r\n  }\r\n\r\n  $(window).on('scroll', checkHeaderScroll);\r\n  $(window).on('load', checkHeaderScroll);\r\n\r\n  $('.virtualTour__toggle-btn').on('click', function () {\r\n    $('.virtualTour__toggle-btn').removeClass('active');\r\n    $(this).addClass('active');\r\n    let video = $(this).attr('data-video');\r\n    let link = $(this).attr('data-link');\r\n    let elem = $('.virtualTour .video-element');\r\n    let btn = $('.virtualTour__link');\r\n    elem.attr('src', video);\r\n    btn.attr('href', link);\r\n    let $play = $(this).parents('.virtualTour').find('.play__btn');\r\n    $play.fadeIn(150);\r\n  });\r\n\r\n  $('.product__info-desc__btn').on('click', function () {\r\n    const $wrap = $(this).closest('.product__info'); // общий контейнер\r\n    const $desc = $wrap.find('.product__info-desc');\r\n\r\n    $desc.slideToggle(300);\r\n\r\n    $(this).text($desc.is(':visible') ? 'Сховати опис' : 'Читати опис');\r\n  });\r\n});\r\n\n\n//# sourceURL=webpack://starterkit/./assets/js/components/oneMoreScript.js?\n}");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("c29bd45c0ede7fbd7860")
/******/ })();
/******/ 
/******/ }
);