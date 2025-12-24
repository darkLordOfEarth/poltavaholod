$(function () {
  $('.popup__close, .btn-for-close-popup').on('click', function () {
    $(this).parents('.popup').hide();
  });
  // $('.popup').on('click', function (e) {

  //   $(this).hide();
  // });

  $('.popup').on('click', function (e) {
    // Если клик именно по .popup (фон), а не по его содержимому
    if (e.target === this) {
      $(this).fadeOut();
    }
  });
  let isDragging = false;
  let isMouseDownInsidePopup = false;

  // Открытие попапа
  $('.popup').on('mousedown', function (e) {
    if ($(e.target).closest('.popup__inner').length) {
      isMouseDownInsidePopup = true;
    }
  });

  // Закрытие попапа при клике вне его
  $(document).on('mousedown', function (e) {
    const $popup = $('.popup');
    const $popupInner = $('.popup__inner');

    // Проверяем, начался ли клик внутри popup__inner
    if ($popupInner.has(e.target).length || $popupInner.is(e.target)) {
      isDragging = false;
      return;
    }

    // Если клик снаружи
    if (!$popupInner.has(e.target).length && !$popupInner.is(e.target)) {
      isDragging = true;
    }
  });

  $(document).on('mouseup', function (e) {
    const $popup = $('.popup');
    const $popupInner = $('.popup__inner');

    // Закрываем только если mousedown и mouseup были снаружи
    if (
      isDragging &&
      !isMouseDownInsidePopup &&
      !$popupInner.has(e.target).length &&
      !$popupInner.is(e.target)
    ) {
      $popup.fadeOut();
    }

    // Сброс флагов
    isDragging = false;
    isMouseDownInsidePopup = false;
  });

  // Закрытие по кнопке
  $('.popup__close').on('click', function () {
    $(this).closest('.popup').fadeOut();
  });

  // Сброс флага при движении мыши
  $(document).on('mousemove', function () {
    if (isMouseDownInsidePopup) {
      isDragging = false;
    }
  });
  $('.popup__inner').on('click', function (e) {
    e.stopPropagation();
  });
  $('.btn-for-popup')
    .off('click')
    .on('click', function (e) {
      e.stopPropagation();
      let popupId = $(this).attr('data-popup');
      let targetPopup = $('#' + popupId);
      targetPopup.show();
      targetPopup.find('.form').scrollTop(0);
    });

  $('[data-group]').on('click', function (e) {
    e.preventDefault();
    const $videoLink = $(this).attr('data-video');
    const $videoPopup = $('.popupPartners video');
    const $title = $(this)
      .parents('.partnershipTypes__list-item')
      .find('.partnershipTypes__list-item__title b')
      .text()
      .toLowerCase();
    const groupId = $(this).attr('data-group');
    const $popupTitle = $('.popupPartners .popup__title span');
    const $dynamicGroup = $('#dynamic-form-group');
    const $allGroups = $('.popupPartners__hidden-group');

    $popupTitle.text($title);
    $videoPopup.attr('src', $videoLink);

    if (!$dynamicGroup.length) {
      console.warn('#dynamic-form-group не найден в DOM');
      return;
    }

    const $targetGroup = $allGroups.find(`#${groupId}`);
    if (!$targetGroup.length) {
      console.warn(`Группа с id="${groupId}" не найдена`);
      $dynamicGroup.empty();
      return;
    }

    $dynamicGroup.html($targetGroup.html());
  });

  $('.form')
    .off('click.selectWrapper')
    .on('click.selectWrapper', '.select-wrapper', function (e) {
      e.stopPropagation();
      console.log('CLICK SELECT-WRAPPER');

      const $wrapper = $(this);
      const $box = $wrapper.closest('.form__group').find('.dropdown-box');

      $wrapper.toggleClass('open');
      $box.stop(true, true).slideToggle(200);
    });

  $('.form')
    .off('click.dropdownCheckbox')
    .on('click.dropdownCheckbox', '.dropdown-box .checkbox-input', function (e) {
      e.stopPropagation();

      const $group = $(this).closest('.form__group');
      const $input = $group.find('.form__group-input');

      const selected = $group
        .find('.dropdown-box .checkbox-input:checked')
        .map(function () {
          return $(this).val();
        })
        .get()
        .join(', ');

      $input.val(selected);
    });

  const $fileInput = $('#input-file');
  const $defaultText = $('.form__group-file__text_default');
  const $filesText = $('.form__group-file__text');

  $fileInput.on('change', function () {
    const files = this.files;

    if (files.length > 0) {
      $defaultText.hide();

      let fileNames = [];
      for (let i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
      }
      $filesText.text(fileNames.join(', ')).show();
    } else {
      $filesText.hide().text('');
      $defaultText.show();
    }
  });

  $('.btn-form').on('click', function () {
    let form = $('.form');
    let hasError = false;

    // Проверка обычных input и textarea
    form
      .find('.form__group-input')
      .not('[name="coment"]')
      .each(function () {
        const $field = $(this);
        if ($field.val().trim() === '') {
          $field.addClass('error');
          hasError = true;
        } else {
          $field.removeClass('error');
        }
      });

    // Проверка input type="file"
    const fileInput = $('#input-file')[0];
    const fileField = $('.form__group-file__field');

    if (fileInput.files && fileInput.files.length > 0) {
      fileField.removeClass('error'); // если выбран файл — убираем ошибку
    } else {
      fileField.removeClass('error'); // если пусто — тоже ошибок нет
      // hasError не меняем, т.к. файл необязательный
    }

    // if (!fileInput.files || fileInput.files.length === 0) {
    //   fileField.addClass('error');
    //   hasError = true;
    // } else {
    //   fileField.removeClass('error');
    // }

    if (hasError) {
      console.log('Форма не отправлена — ошибки.');
      return;
    }

    // Блокируем кнопку на время отправки
    const $btn = $(this);
    $btn.prop('disabled', true).text('Відправка...');

    // Отправка формы через AJAX
    let formData = new FormData();
    formData.append('action', 'submit_form');
    formData.append('form_nonce', $('#form_nonce').val());
    formData.append('name', $('input[name="name"]').val());
    formData.append('tel', $('input[name="tel"]').val());
    formData.append('company', $('input[name="company"]').val());
    formData.append('coment', $('textarea[name="coment"]').val());

    // Добавляем файлы правильно
    const MAX_TOTAL_SIZE = 50 * 1024 * 1024;
    let totalSize = 0;

    const files = fileInput.files;

    for (let i = 0; i < files.length; i++) {
      totalSize += files[i].size;

      if (totalSize > MAX_TOTAL_SIZE) {
        alert('Загальний розмір файлів не повинен перевищувати 50 МБ');
        $btn.prop('disabled', false).text('Надіслати заявку');
        return;
      }

      formData.append('files[]', files[i]);
    }

    $.ajax({
      // url: ajaxurl,
      url: '/wp-admin/admin-ajax.php',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        console.log('Ответ сервера:', response);

        if (response.success) {
          $('#popup-rozrahunok').hide();
          $('#popup-spasibi').show();
          form[0].reset();
          $('.form__group-file__text').hide().text('');
          $('.form__group-file__text_default').show();
        } else {
          alert('Помилка: ' + (response.data || 'Невідома помилка'));
        }

        $btn.prop('disabled', false).text('Надіслати заявку');
      },
      error: function (xhr, status, error) {
        console.error('Ошибка AJAX:', error);
        alert('Помилка відправки форми. Спробуйте ще раз.');
        $btn.prop('disabled', false).text('Надіслати заявку');
      },
    });
  });

  // Убираем ошибку при вводе
  $('.form__group-input').on('input', function () {
    $(this).removeClass('error');
  });

  // Убираем ошибку при выборе файла
  $('#input-file').on('change', function () {
    $('.form__group-file__field').removeClass('error');
  });

  $('.button-remember-pass').on('click', function () {
    $('#popup-login').fadeOut();
    $('#popup-recovery-pass').fadeIn();
  });

  $('.btn-for-popup-login').on('click', function () {
    $('.popup').fadeOut();
    $('#popup-login').fadeIn();
  });

  const $pass1 = $('#password');
  const $pass2 = $('#password_confirm');
  const $btn = $('.popupCreatePass .btn-form');

  function checkPasswords() {
    const val1 = $pass1.val();
    const val2 = $pass2.val();

    // сброс ошибок
    $pass1.removeClass('error');
    $pass2.removeClass('error');
    $('.password-error').remove();

    // минимальная длина
    if (val1.length < 6 || val2.length < 6) {
      $btn.prop('disabled', true);
      return;
    }

    // проверка совпадения
    if (val1 !== val2) {
      $pass1.addClass('error');
      $pass2.addClass('error');

      $pass2
        .closest('.form__group')
        .append('<div class="password-error">Паролі не співпадають</div>');

      $btn.prop('disabled', true);
      return;
    }

    // всё ок
    $btn.prop('disabled', false);
  }

  // проверки при вводе
  $pass1.on('input', checkPasswords);
  $pass2.on('input', checkPasswords);

  // клик по кнопке
  $btn.on('click', function () {
    checkPasswords();

    if (!$(this).prop('disabled')) {
      $('.form').submit();
    }
  });
});
