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
