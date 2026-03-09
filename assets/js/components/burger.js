$('.burger').on('click', function () {
  $('.menu').addClass('open');
  $('.overlay').show();
});
$('.menu__heading-close, .overlay').on('click', function () {
  $('.menu').removeClass('open');
  $('.overlay').hide();
});
$('.menu__list-link, .header .menu-item > a, .header .menu button, .menu-anchor-btn')
  .off('click')
  .on('click', function (e) {
    if ($(window).width() < 1280) {
      const parent = $(this).parent();
      const submenu = parent.find('.sub-menu');

      // если есть подменю — открываем его
      if (submenu.length > 0) {
        e.preventDefault();
        e.stopPropagation();

        parent.toggleClass('open');
        submenu.toggleClass('open');

        return; // важно — прекращаем выполнение
      }

      // если подменю нет — закрываем бургер
      $('.menu').removeClass('open');
      $('.overlay').hide();
    }
  });

$('.submenu__link, .header .sub-menu button')
  .off('click')
  .on('click', function (e) {
    // e.preventDefault();
    e.stopPropagation();
  });

// $(window).on('resize', function () {
//   if ($(window).width() > 768) {
//   }
// });
