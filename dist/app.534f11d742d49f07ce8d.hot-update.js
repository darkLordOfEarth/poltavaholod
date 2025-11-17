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

eval("{$('.burger').on('click', function () {\n  $('.menu').addClass('open');\n});\n$('.header__menu-item').on('click', function () {\n  $(this).parent().find('.active').removeClass('active');\n  $(this).addClass('active');\n});\n$(window).on('resize', function () {\n  if ($(window).width() > 768) {\n    // сюда логика для больших экранов\n  }\n});\n\n//# sourceURL=webpack://starterkit/./assets/js/components/burger.js?\n}");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1796ddffe15a5ffd2f9c")
/******/ })();
/******/ 
/******/ }
);