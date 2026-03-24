/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatestarterkit"]("app",{

/***/ "./assets/js/components/ticker.js"
/*!****************************************!*\
  !*** ./assets/js/components/ticker.js ***!
  \****************************************/
() {

eval("{const items = [\r\n      \"Морозиво\",\r\n      \"Напівфабрикати\",\r\n      \"Хумус\",\r\n      \"Закуски бутербродні\",\r\n      \"Охолоджена продукція\",\r\n    ];\r\n \r\n    function buildItems() {\r\n      let html = '';\r\n      // Дублируем 2 раза для бесшовного зацикливания\r\n      for (let i = 0; i < 2; i++) {\r\n        items.forEach(function(text) {\r\n          html += '<span class=\"ticker-item\">' + text + '<span class=\"ticker-dot\"></span></span>';\r\n        });\r\n      }\r\n      return html;\r\n    }\r\n \r\n    $('#track').html(buildItems());\n\n//# sourceURL=webpack://starterkit/./assets/js/components/ticker.js?\n}");

/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("03d1af3fc0cd43134e86")
/******/ })();
/******/ 
/******/ }
);