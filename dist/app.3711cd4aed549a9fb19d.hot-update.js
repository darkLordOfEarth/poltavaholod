/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatestarterkit"]("app",{

/***/ "./assets/js/components/popup.js":
/*!***************************************!*\
  !*** ./assets/js/components/popup.js ***!
  \***************************************/
/***/ (() => {

eval("{$(function () {\r\n  $('.popup__close, .btn-for-close-popup').on('click', function () {\r\n    $(this).parents(\".popup\").hide();\r\n  });\r\n  $('.popup').on('click', function () {\r\n    $(this).hide();\r\n  });\r\n  $('.popup__inner').on('click', function (e) {\r\n    e.stopPropagation();\r\n  });\r\n  $('.btn-for-popup-rozrahunok').on('click', function () {\r\n    $(\"#popup-rozrahunok\").show();\r\n  });\r\n\r\n\r\n\r\n\r\n  const $fileInput = $('#input-file');\r\n  const $defaultText = $('.form__group-file__text_default');\r\n  const $filesText = $('.form__group-file__text');\r\n\r\n  $fileInput.on('change', function () {\r\n    const files = this.files;\r\n\r\n    if (files.length > 0) {\r\n      $defaultText.hide();\r\n\r\n      let fileNames = [];\r\n      for (let i = 0; i < files.length; i++) {\r\n        fileNames.push(files[i].name);\r\n      }\r\n      $filesText.text(fileNames.join(', ')).show();\r\n    } else {\r\n      $filesText.hide().text('');\r\n      $defaultText.show();\r\n    }\r\n  });\r\n\r\n  $('.btn-form').on('click', function () {\r\n    let form = $('.form');\r\n    let hasError = false;\r\n\r\n    // Проверка обычных input и textarea\r\n    form.find('.form__group-input').each(function () {\r\n      const $field = $(this);\r\n\r\n      if ($field.val().trim() === '') {\r\n        $field.addClass('error');\r\n        hasError = true;\r\n      } else {\r\n        $field.removeClass('error');\r\n      }\r\n    });\r\n\r\n    // Проверка input type=\"file\"\r\n    const fileInput = $('#input-file')[0];\r\n    const fileField = $('.form__group-file__field');\r\n\r\n    if (!fileInput.files || fileInput.files.length === 0) {\r\n      fileField.addClass('error');\r\n      hasError = true;\r\n    } else {\r\n      fileField.removeClass('error');\r\n    }\r\n\r\n    // Если есть ошибки — не отправляем форму\r\n    if (hasError) {\r\n      console.log('Форма не отправлена — ошибки.');\r\n      return;\r\n    }\r\n\r\n    // Если всё ок — отправляй\r\n    console.log('Форма готова к отправке!');\r\n    // form.submit(); // если нужен реальный submit\r\n    $(\"#popup-rozrahunok\").hide();\r\n    $(\"#popup-spasibi\").show();\r\n  });\r\n\r\n  // Убираем ошибку при вводе\r\n  $('.form__group-input').on('input', function () {\r\n    $(this).removeClass('error');\r\n  });\r\n\r\n  // Убираем ошибку при выборе файла\r\n  $('#input-file').on('change', function () {\r\n    $('.form__group-file__field').removeClass('error');\r\n  });\r\n});\n\n//# sourceURL=webpack://starterkit/./assets/js/components/popup.js?\n}");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("010645ae8dab51948203")
/******/ })();
/******/ 
/******/ }
);