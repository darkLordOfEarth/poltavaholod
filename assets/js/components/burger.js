$('.burger').on('click', function () {
  $('.menu').addClass('open');
  $('.overlay').show();
});
$('.menu__heading-close, .overlay').on('click', function () {
  $('.menu').removeClass('open');
  $('.overlay').hide();
});
  $('.menu__list-link').off('click').on('click', function (e) {
    if ($(window).width() < 1280) {
        const submenu = $(this).parent().find('.submenu');
        if (submenu.length > 0) { 
            e.preventDefault();
            e.stopPropagation();
            $(this).parent().toggleClass('open');
            submenu.toggleClass('open');
        }
    }
});

  $('.submenu__link').off('click').on('click', function (e) {
    // e.preventDefault();
    e.stopPropagation();
  });





// $(window).on('resize', function () {
//   if ($(window).width() > 768) {
//   }
// });
