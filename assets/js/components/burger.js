$('.burger').on('click', function () {
  $('.menu').addClass('open');
  $('.overlay').show();
});
$('.menu__heading-close, .overlay').on('click', function () {
  $('.menu').removeClass('open');
  $('.overlay').hide();
});

$('.header__menu-item').on('click', function () {
  $(this).parent().find('.active').removeClass('active');
  $(this).addClass('active');
});

$(window).on('resize', function () {
  if ($(window).width() > 768) {
    // сюда логика для больших экранов
  }
});
