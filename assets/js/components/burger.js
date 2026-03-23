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


$('.submenu__link, .header .sub-menu button')
  .off('click')
  .on('click', function (e) {
    // e.preventDefault(); e.stopPropagation();
  });
$('.main-navigation > .menu__list > .menu-item').on('click', function (e) {
    $(this).toggleClass("open")
  });


  $(".lang__item").on("click", function() {
    $(".lang__item").removeClass("active");
    $(this).addClass("active");
  })

  if($(window).width() < 1280) {
    if( $(".menu__list-item").find(".submenu").length > 0) {
        $(".menu__list-item").addClass("open")
    }
    $(".menu-item").on("click", function() {
        if($(this).find(".submenu").length > 0) {
            $(this).find(".submenu").slideToggle();
            $(this).toggleClass("open");
        }
    })
  }