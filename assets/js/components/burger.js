window.onload = function() {
    $(".header__burger").click(function() {
        $(".header__menu_mobile").slideToggle();
        $(this).find("img").toggleClass("hide");
    });
    $(".header__menu-item").on("click", function() {
        $(this).parent().find(".active").removeClass("active");
        $(this).addClass("active");
    });
};

$( window ).resize(function() {
    if ($(window).width() > 768) {
        
    }
});