$(function () {
  // var windowWidth = window.innerWidth;
  // var windowHeight = window.innerHeight;
  // alert('width:' + windowWidth + ' ' + 'height:' + windowHeight);

  function checkHeaderScroll() {
    if ($(window).scrollTop() > 50) {
      $('header').addClass('scrolled');
    } else {
      $('header').removeClass('scrolled');
    }
    let mainHeight = $('.main').outerHeight();
    if ($(window).scrollTop() > 0) {
      $('.main__group-btns').addClass('scrolled');
    } else {
      $('.main__group-btns').removeClass('scrolled');
    }
  }

  $(window).on('scroll', checkHeaderScroll);
  $(window).on('load', checkHeaderScroll);

 

  $('.product__info-desc__btn')
    .off('click')
    .on('click', function () {
      const $btn = $(this);
      const $desc = $btn.parent().find('.product__info-desc');

      $desc.slideToggle(300, function () {
        // По окончании анимации
        const isOpen = $desc.hasClass('open');

        if (isOpen) {
          $btn.text('Читати опис');
          $desc.removeClass('open');
        } else {
          $desc.addClass('open');
          $btn.text('Сховати опис');
        }

        // ❗ Пересчитать высоту после изменения
        $('.projectAuditExpertise__slider').trigger('refresh.owl.carousel');
      });
    });

  const headerHeight = $('.header').outerHeight();

  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();

    const target = $($.attr(this, 'href'));

    if (target.length) {
      $('html, body').animate(
        {
          scrollTop: target.offset().top - headerHeight + 50,
        },
        500,
      );
    }
  });

  
});
