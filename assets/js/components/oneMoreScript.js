$(".header__lang .button").click(function() {
    $(this).parent().find(".button").removeClass("button__active");
    $(this).addClass("button__active");
});

$(".header__burger").click(function() {
    $(".burger__menu").addClass("active");
});
$(".burger__close").click(function() {
    $(".burger__menu").removeClass("active");
});

$(".header-bottom__custom-button").click(function() {
    $(".header-bottom__catalog").slideToggle();
    $(".banners__top").toggleClass("row-rewerse");
    $(".banners__static").toggleClass("opacity0");
    $(".main").toggleClass("catalog__active");
    $(".main__example").toggleClass("hide");
    $(".banners__slider ").toggleClass("active");
    $(".banners__slider .owl-item.active").toggleClass("full");
});




if ($(window).width() < 768) {
    $(".whyUs__wrapper").addClass("whyUs__wrapper-slider");
}
$( window ).resize(function() {
    if ($(window).width() < 768) {
        $(".whyUs__wrapper").addClass("whyUs__wrapper-slider");
    }
    else {

        $(".whyUs__wrapper").removeClass("whyUs__wrapper-slider");
    }
  });
