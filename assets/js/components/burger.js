$('.burger').on('click', function () {
  $('.menu').addClass('open');
  $('html, body').addClass('ovh');
  $('.overlay').show();
});
$('.menu__heading-close').on('click', function () {
  $('html, body').removeClass('ovh');
});
$('.menu__heading-close, .overlay').on('click', function () {
  $('.menu, .menu-item').removeClass('open');
  $('.overlay').hide();
});
// $('.menu__list-link, .header .menu-item > a, .header .menu button, .menu-anchor-btn')
//   .off('click')
//   .on('click', function (e) {
//     if ($(window).width() < 1280) {
//       const parent = $(this).closest('.menu-item');
//       const submenu = parent.children('.sub-menu');

//       if (submenu.length) {
//         // если подменю закрыто — открываем
//         if (!parent.hasClass('open')) {
//           e.preventDefault();

//           parent.addClass('open');
//           submenu.slideDown(200);

//           return;
//         }

//         // если уже открыто — переход по ссылке
//         // return;
//       }

//       // если подменю нет — закрываем бургер
//       $('.menu, .menu-item').removeClass('open');
//       $('.overlay').hide();
//       $('html, body').removeClass('ovh');
//     }
//   });
// $(document).on('click', function (e) {
//   const menu = $('.header__menu');

//   if (
//     menu.hasClass('open') &&
//     !$(e.target).closest('.menu-item').length &&
//     $(e.target).closest('.header__menu').length
//   ) {
//     $('.menu-item').removeClass('open');
//     $('.sub-menu').slideUp(200);
//   }
// });

$('.submenu__link, .header .sub-menu button')
  .off('click')
  .on('click', function (e) {
    // e.preventDefault(); e.stopPropagation();
  });
$('.main-navigation > .menu__list > .menu-item').on('click', function (e) {
    $(this).toggleClass("open")
  });
