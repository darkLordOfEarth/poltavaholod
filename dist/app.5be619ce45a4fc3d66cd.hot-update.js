/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatestarterkit"]("app",{

/***/ "./assets/js/components/burger.js":
/*!****************************************!*\
  !*** ./assets/js/components/burger.js ***!
  \****************************************/
/***/ (() => {

eval("{$('.burger').on('click', function () {\n  $('.menu').addClass('open');\n  $('.overlay').show();\n});\n$('.menu__heading-close, .overlay').on('click', function () {\n  $('.menu').removeClass('open');\n  $('.overlay').hide();\n});\n$('.menu__list-item').on('click', function (e) {\n  if ($(window).width() < 768) {\n    e.preventDefault();\n    var $this = $(this);\n    var $submenu = $this.find('.submenu');\n\n    // Если уже анимируется, останавливаем анимацию\n    if ($submenu.is(':animated')) {\n      return;\n    }\n\n    // Закрываем другие открытые подменю\n    $('.menu__list-item').not(this).removeClass('open').find('.submenu').slideUp(300);\n\n    // Переключаем текущее\n    $this.toggleClass('open');\n    $submenu.slideToggle(300);\n  }\n});\n\n// $(window).on('resize', function () {\n//   if ($(window).width() > 768) {\n//   }\n// });\n\n//# sourceURL=webpack://starterkit/./assets/js/components/burger.js?\n}");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2026703c9a8e4ff7b69e")
/******/ })();
/******/ 
/******/ }
);