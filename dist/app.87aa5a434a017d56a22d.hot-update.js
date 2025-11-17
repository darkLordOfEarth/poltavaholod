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

eval("{$('.burger').on('click', function () {\n  $('.menu').addClass('open');\n  $('.overlay').show();\n});\n$('.menu__heading-close, .overlay').on('click', function () {\n  $('.menu').removeClass('open');\n  $('.overlay').hide();\n});\nif ($(window).width() < 768) {\n  $('.menu__list-item').get(0).on('click', function (e) {\n    if ($(this).hasClass('open')) {\n      $(this).removeClass('open');\n      $(this).find('.submenu').hide();\n    } else {\n      $(this).addClass('open');\n      $(this).find('.submenu').show();\n    }\n  });\n}\n\n// $(window).on('resize', function () {\n//   if ($(window).width() > 768) {\n//   }\n// });\n\n//# sourceURL=webpack://starterkit/./assets/js/components/burger.js?\n}");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("47443c8a211b9b033437")
/******/ })();
/******/ 
/******/ }
);