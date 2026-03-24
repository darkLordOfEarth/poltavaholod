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

eval("{const items = [\r\n      \"Морозиво\",\r\n      \"Напівфабрикати\",\r\n      \"Хумус\",\r\n      \"Закуски бутербродні\",\r\n      \"Охолоджена продукція\",\r\n    ];\r\n \r\n    function buildSet() {\r\n      return items.map(function(text) {\r\n        return '<span class=\"ticker-item\">' + text + '<span class=\"ticker-dot\"></span></span>';\r\n      }).join('');\r\n    }\r\n \r\n    function initTicker() {\r\n      const $track = $('#track');\r\n      const $wrap = $('.ticker-wrap');\r\n \r\n      // Вставляем один набор, измеряем его ширину\r\n      $track.html(buildSet());\r\n      const setWidth = $track.width();\r\n      const screenWidth = $wrap.width();\r\n \r\n      // Считаем сколько копий нужно чтобы заполнить экран + запас\r\n      const copies = Math.ceil((screenWidth * 2) / setWidth) + 2;\r\n \r\n      let html = '';\r\n      for (let i = 0; i < copies; i++) {\r\n        html += buildSet();\r\n      }\r\n      $track.html(html);\r\n \r\n      // Анимируем ровно на ширину одного набора (бесшовная петля)\r\n      $track.css({\r\n        'animation': 'none',\r\n        'transform': 'translateX(0)'\r\n      });\r\n \r\n      let pos = 0;\r\n      const speed = 1; // пикселей за кадр (увеличь для скорости)\r\n \r\n      function animate() {\r\n        pos -= speed;\r\n        if (Math.abs(pos) >= setWidth) {\r\n          pos = 0;\r\n        }\r\n        $track.css('transform', 'translateX(' + pos + 'px)');\r\n        requestAnimationFrame(animate);\r\n      }\r\n \r\n      // Пауза при наведении\r\n      let paused = false;\r\n      $('.ticker-wrap').on('mouseenter', function() { paused = true; });\r\n      $('.ticker-wrap').on('mouseleave', function() { paused = false; });\r\n \r\n      function animatePausable() {\r\n        if (!paused) {\r\n          pos -= speed;\r\n          if (Math.abs(pos) >= setWidth) {\r\n            pos = 0;\r\n          }\r\n          $track.css('transform', 'translateX(' + pos + 'px)');\r\n        }\r\n        requestAnimationFrame(animatePausable);\r\n      }\r\n \r\n      animatePausable();\r\n    }\r\n \r\n    $(document).ready(function() {\r\n      // Убираем CSS-анимацию, используем JS\r\n      $('#track').css('animation', 'none');\r\n      initTicker();\r\n    });\n\n//# sourceURL=webpack://starterkit/./assets/js/components/ticker.js?\n}");

/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b13dfe322a4af4330076")
/******/ })();
/******/ 
/******/ }
);