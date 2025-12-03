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
    if ($(window).scrollTop() > mainHeight / 2) {
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


$('.product__info-desc__btn').off('click').on('click', function () {
    const $desc = $(this).parent().find('.product__info-desc');
    $desc.slideToggle();
    const isOpen = $desc.hasClass('open');
    if (isOpen) {
          $(this).text('Читати опис');
          $desc.removeClass('open');
      } else {
          $desc.addClass('open');
          $(this).text('Сховати опис');
      }
  });
  
});
