$(function () {
  // var windowWidth = window.innerWidth;
  // var windowHeight = window.innerHeight;
  // alert('width:' + windowWidth + ' ' + 'height:' + windowHeight);

  function checkHeaderScroll() {
    if ($(window).scrollTop() > 0) {
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

  $('.virtualTour__toggle-btn').on('click', function () {
    $('.virtualTour__toggle-btn').removeClass('active');
    $(this).addClass('active');
    let video = $(this).attr('data-video');
    let link = $(this).attr('data-link');
    let elem = $('.virtualTour .video-element');
    let btn = $('.virtualTour__link');
    elem.attr('src', video);
    btn.attr('href', link);
    let $play = $(this).parents('.virtualTour').find('.play__btn');
    $play.fadeIn(150);
  });
$(".temporary-btn").on("click", function() {
  $(this).parents(".virtualTour").find(".videoBlockWrapper").addClass("temporary-img")
})
$(".temporary-btn-clear").on("click", function() {
  $(this).parents(".virtualTour").find(".videoBlockWrapper").removeClass("temporary-img")
})

$('.product__info-desc__btn').off('click').on('click', function () {
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
        $(".projectAuditExpertise__slider").trigger("refresh.owl.carousel");
    });
});


const headerHeight = $('.header').outerHeight();

$('a[href^="#"]').on('click', function (e) {
    e.preventDefault();

    const target = $($.attr(this, 'href'));

    if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top - headerHeight
        }, 500);
    }
});



$(function () {
  function checkScrollbar() {
    const $form = $('.form');
    const hasScroll = $form[0].scrollHeight > $form[0].clientHeight;

    if (hasScroll) {
      $form.addClass('has-scroll');
    } else {
      $form.removeClass('has-scroll');
    }
  }

  // Проверить при загрузке
  checkScrollbar();

  // Проверить при ресайзе (меняется высота)
  $(window).on('resize', checkScrollbar);
});




  
});
