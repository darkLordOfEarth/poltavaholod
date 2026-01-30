$(function () {
  function resetPartnersForm() {
    const $form = $('.form-partners');
    if (!$form.length) return;

    // 1. стандартный сброс полей
    $form[0].reset();

    // 2. чистим кастомные файловые поля (у вас есть .form__group-file__text)
    $form.find('.form__group-file__text').text('');
    $form.find('input[type=file]').val('');

    // 3. убираем классы ошибок/успеха, если вы их где-то ставите
    $form.find('.error, .success').removeClass('error success');

    // 4. возвращаем дефолтные радио/чекбоксы, если они рисуются вручную
    $form.find('.radio-input, .checkbox-input').each(function () {
      const $span = $(this).closest('label').find('span');
      $(this).is(':checked') ? $span.addClass('active') : $span.removeClass('active');
    });
  }
  $('.popup__close, .btn-for-close-popup').on('click', function () {
    $(this).parents('.popup').hide();
    resetPartnersForm()
  });

  /* ---------- сброс всей формы ---------- */

  $('.popup').on('click', function (e) {
    // Если клик именно по .popup (фон), а не по его содержимому
    if (e.target === this) {
      $(this).fadeOut();
      $('.popupPartners').find('.play__btn').fadeIn(200);
      resetPartnersForm()
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
      $('.popupPartners').find('.play__btn').fadeIn(200);
      resetPartnersForm();
      $("html, body").removeClass("ovh");
    }

    // Сброс флагов
    isDragging = false;
    isMouseDownInsidePopup = false;
  });

  // Закрытие по кнопке
  $('.popup__close').on('click', function () {
    $(this).closest('.popup').fadeOut();
    $('.popupPartners').find('.play__btn').fadeIn(200);
    resetPartnersForm();
    $("html, body").removeClass("ovh");
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
      $("html, body").addClass("ovh");
      targetPopup.find('.form').scrollTop(0);
      $('input[name="group"]').val($(this).data('group'));
      $('input[name="video"]').val($(this).data('video'));
      $('input[name="partner_type"]').val(
        $(this)
          .closest('.partnershipTypes__list-item')
          .find('.partnershipTypes__list-item__title')
          .text()
          .trim(),
      );
    });

  $('[data-group]').on('click', function (e) {
    e.preventDefault();
    const $videoLink = $(this).attr('data-video');
    const $videoPoster = $(this).attr('data-video-poster');
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
    $videoPopup.attr('poster', $videoPoster);

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

  const $fileInput = $('input[type="file"]');
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
    const $form = $(this).closest('form');

    let hasError = false;

    // Проверка обычных input и textarea
    $form.find('.form__group').each(function () {
      const $group = $(this);
      const $inputs = $group.find('input').not('[name="coment"], [name="link"]');

      const $checks = $inputs.filter('[type="checkbox"], [type="radio"]');

      // Если в группе есть чекбоксы или радио
      if ($checks.length) {
        const isAnyChecked = $checks.is(':checked');

        if (isAnyChecked) {
          $inputs.removeClass('error');
        } else {
          $checks.addClass('error');
          hasError = true;
        }

        return;
      }

      // Если обычные поля (text, email и т.д.)
      $inputs.each(function () {
        const $field = $(this);

        if ($field.val().trim() === '') {
          $field.addClass('error');
          hasError = true;
        } else {
          $field.removeClass('error');
        }
      });
    });

    // Проверка input type="file"
    const fileInput = $form.find('input[type="file"]')[0];

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
    let formData = new FormData($form[0]);
    formData.append('action', 'submit_form');
    formData.append('form_nonce', $('#form_nonce').val());
    formData.append('name', $form.find('input[name="name"]').val());
    formData.append('tel', $form.find('input[name="tel"]').val());
    formData.append('company', $form.find('input[name="company"]').val());
    formData.append('coment', $form.find('textarea[name="coment"]').val());

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
      beforeSend: function () {
        $form.addClass('loading');
      },
      success: function (response) {
        console.log('Ответ сервера:', response);

        if (response.success) {
          $form[0].reset();
          $form.closest('.popup').fadeOut();
          $('.popupPartners').find('.play__btn').fadeIn(200);
          $('#popup-spasibi').show();
          $('.form__group-file__text').hide().text('');
          $('.form__group-file__text_default').show();
        } else {
          alert('Помилка: ' + (response.data || 'Невідома помилка'));
          $("html, body").removeClass("ovh");
        }

        $btn.prop('disabled', false).text('Надіслати заявку');
      },
      error: function (xhr, status, error) {
        console.error('Ошибка AJAX:', error);
        alert('Помилка відправки форми. Спробуйте ще раз.');
        $btn.prop('disabled', false).text('Надіслати заявку');
      },
      complete: function () {
        $form.removeClass('loading');
      },
    });
  });

  $(document).on('change', 'input[type="checkbox"], input[type="radio"]', function () {
    const $group = $(this).closest('.form__group');
    const isAnyChecked = $group.find('input[type="checkbox"], input[type="radio"]').is(':checked');

    if (isAnyChecked) {
      $group.find('input').removeClass('error');
    }
  });

  // Убираем ошибку при вводе
  $('.form__group-input').on('input', function () {
    $(this).removeClass('error');
  });

  // Убираем ошибку при выборе файла
  $('input[type="file"]').on('change', function () {
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
      $(this).closest('form').submit();
    }
  });
});
