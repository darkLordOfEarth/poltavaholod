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
    const group = $(this).attr('data-group');
    const dynamicGroup = $('#dynamic-form-group');
    dynamicGroup.html('');
    const allGroups = $('.popupPartners__hidden-group');
    let targetGroup = allGroups.find(`#${group}`).html();
    dynamicGroup.html(targetGroup);
  });

  // $('.select-wrapper')
  //   .off('click')
  //   .on('click', function (e) {
  //     e.stopPropagation();
  //     $(this).toggleClass('open');
  //     $(this).parents('.form__group').find('.dropdown-box').slideToggle();
  //   });
  $(document).off('click.selectWrapper').on('click.selectWrapper', '.select-wrapper', function (e) {
  e.stopPropagation();

  const $wrapper = $(this);
  const $box = $wrapper.closest('.form__group').find('.dropdown-box');

  $wrapper.toggleClass('open');
  $box.stop(true, true).slideToggle(200);
});



  $('.dropdown-box .checkbox-input')
    .off('click')
    .on('click', function (e) {
      e.stopPropagation();

      let $group = $(this).closest('.form__group');
      let $wrapper = $group.closest('.form__group');
      let $input = $wrapper.find('.form__group-input');
      let selected = $wrapper
        .find('.dropdown-box .checkbox-input:checked')
        .map(function () {
          return $(this).val();
        })
        .get();
      $input.val(selected.join(', '));
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

    // Если есть ошибки — не отправляем форму
    if (hasError) {
      console.log('Форма не отправлена — ошибки.');
      return;
    }

    // Если всё ок — отправляй
    console.log('Форма готова к отправке!');
    // form.submit(); // если нужен реальный submit
    $('#popup-rozrahunok').hide();
    $('#popup-spasibi').show();
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
