window.onload = function() {
    $(".burger").click(function() {
        $("body").addClass("open");
        $("burger__menu").addClass("translateX_0");
    })
    
}
$(".mobile__menu_close").click(function() {
    $("body").removeClass("open");
    $(".burger__menu").removeClass("translateX_0");
})
$(".catalog__button").click(function() {
     $(".catalog__menu").addClass("d__block");
     $(".catalog__menu").addClass("translateY_0");
})
$(".catalog__menu_close").click(function() {
    $(".catalog__menu").removeClass("d__block");
    $(".catalog__menu").removeClass("translateY_0");
})

$( window ).resize(function() {
    if ($(window).width() > 768) {
        $(".mobile__menu_close").click();
        $(".catalog__menu_close").click();
    }
})