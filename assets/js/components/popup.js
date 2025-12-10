$(function () {
  $('.popup__close, .btn-for-close-popup').on('click', function () {
    $(this).parents('.popup').hide();
  });
  $('.popup').on('click', function () {
    $(this).hide();
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
    });


  $('[data-group]').on('click', function (e) {
    e.preventDefault();
     const $videoLink = $(this).attr('data-video');
    const $videoPopup = $('.popupPartners video');
    const $title = $(this).parents(".partnershipTypes__list-item").find('.partnershipTypes__list-item__title b').text().toLowerCase();
    const groupId = $(this).attr('data-group');
    const $popupTitle = $('.popupPartners .popup__title span');
    const $dynamicGroup = $('#dynamic-form-group');
    const $allGroups = $('.popupPartners__hidden-group');

    $popupTitle.text($title)
    $videoPopup.attr("src", $videoLink)

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
    form.find('.form__group-input').each(function () {
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

    if (!fileInput.files || fileInput.files.length === 0) {
      fileField.addClass('error');
      hasError = true;
    } else {
      fileField.removeClass('error');
    }

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
    formData.append('nonce', $('#form_nonce').val());
    formData.append('name', $('input[name="name"]').val());
    formData.append('tel', $('input[name="tel"]').val());
    formData.append('company', $('input[name="company"]').val());
    formData.append('coment', $('textarea[name="coment"]').val());

    // Добавляем файлы правильно
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
      formData.append('files[]', files[i]);
    }

    $.ajax({
      // url: ajaxurl,
      url: '/wp-content/themes/carcass/send.php',
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
          alert('Помилка: ' + ( response.data || 'Невідома помилка'));
        }
        
        $btn.prop('disabled', false).text('Надіслати заявку');
      },
      error: function (xhr, status, error) {
        console.error('Ошибка AJAX:', error);
        alert('Помилка відправки форми. Спробуйте ще раз.');
        $btn.prop('disabled', false).text('Надіслати заявку');
      }
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
});
