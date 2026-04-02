$(function () {
  function resetPartnersForm($form) {
    if (!$form || !$form.length) return;
    $form[0].reset();
    $form.find('.form__group-input').each(function () {
      if ($(this).is('input, textarea')) {
        $(this).val('');
      } else {
        $(this).text('');
      }
    });
    if ($form.data('validator')) {
      $form.validate().resetForm();
      $form.find('.error').removeClass('error');
    }
  }

  let dragStartedInside = false;
  let activePopup = null;

  // -----------------------
  // Открытие попапа
  // -----------------------
  $('[data-popup]').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const popupId = $(this).data('popup');
    activePopup = $('#' + popupId);

    activePopup.find('input[name="group"]').val($(this).data('group'));

    activePopup.fadeIn();
    $('html, body').addClass('ovh');
    activePopup.find('.form').scrollTop(0);
  });

  // -----------------------
  // Запоминаем где начался mousedown — ОДИН обработчик
  // -----------------------
  $(document).on('mousedown', function (e) {
    if (!activePopup) return;
    dragStartedInside = $(e.target).closest(activePopup.find('.popup__inner')).length > 0;
  });

  // -----------------------
  // Закрытие по клику на фон — только если drag начался снаружи
  // -----------------------
  $('.popup').on('click', function (e) {
    if (e.target === this && !dragStartedInside) {
      $(this).fadeOut();
      resetPartnersForm($(this).find('.form-partners'));
      $('html, body').removeClass('ovh');
      activePopup = null;
    }
  });

  // -----------------------
  // Закрытие по кнопке
  // -----------------------
  $('.btn-for-close-popup').on('click', function () {
    const $popup = $(this).closest('.popup');
    $popup.fadeOut();
    resetPartnersForm($popup.find('.form-partners'));
    $('html, body').removeClass('ovh');
    activePopup = null;
  });

  // -----------------------
  // Клик внутри попапа не закрывает
  // -----------------------
  $('.popup__inner').on('click', function (e) {
    e.stopPropagation();
  });



  if($(window).width() < 1280) {
    $("[data-popup='popup-partners']").on("click", function() {
      $(".menu__heading-close").click();
    })
  }
});