$(function () {
  $('.popup__close').on('click', function () {
    $(this).parents(".popup").hide();
  });
  $('.popup').on('click', function () {
    $(this).hide();
  });
  $('.popup__inner').on('click', function (e) {
    e.stopPropagation();
  });
  $('.btn-for-popup-rozrahunok').on('click', function () {
    $("#popup-rozrahunok").show();
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

  $('.popup__button').on('click', function () {
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
    form.submit(); // если нужен реальный submit
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