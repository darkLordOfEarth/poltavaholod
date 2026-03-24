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

eval("{$(function () {\r\n  var $track = $('.ticker__track');\r\n  var $ticker = $('.ticker');\r\n\r\n  // клонируем контент пока не заполнит экран\r\n  function fillTrack() {\r\n    let trackWidth = $track.width();\r\n    let containerWidth = $ticker.width();\r\n\r\n    while (trackWidth < containerWidth * 2) {\r\n      $track.append($track.children().clone());\r\n      trackWidth = $track.width();\r\n    }\r\n  }\r\n\r\n  fillTrack();\r\n\r\n  var speed = .5;\r\n\r\n  function animate() {\r\n    let left = $track.position().left;\r\n\r\n    if (Math.abs(left) >= $track.width() / 2) {\r\n      $track.css('left', 0);\r\n    } else {\r\n      $track.css('left', left - speed);\r\n    }\r\n\r\n    requestAnimationFrame(animate);\r\n  }\r\n\r\n  $track.css({\r\n    position: 'relative',\r\n    left: 0\r\n  });\r\n\r\n  animate();\r\n});\n\n//# sourceURL=webpack://starterkit/./assets/js/components/ticker.js?\n}");

/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("95b4b9faf1f58d393ae3")
/******/ })();
/******/ 
/******/ }
);