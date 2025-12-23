$(function () {

  function setHiddenImg() {

    $('.reviews__slide-project__images, .production .template1__image').each(function () {
      const $wrap = $(this);

      $wrap.find('.hiddenImagesBlock').remove();

      const $items = $wrap.find('a');
      const $visibleItems = $items.filter(':visible');

      const hiddenCount = $items.length - $visibleItems.length;

      if (hiddenCount > 0 && $visibleItems.length) {
        $visibleItems.last().append(
          "<div class='hiddenImagesBlock text_simple'>+" + hiddenCount + "</div>"
        );
      }
    });

  }

  setHiddenImg();

  $(window).on('resize', setHiddenImg);

  $('.owl-carousel').on('changed.owl.carousel refreshed.owl.carousel', function () {
    setTimeout(setHiddenImg, 50);
  });

});

