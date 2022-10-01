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
    $(".service").toggleClass("active");
});

$(".popular__aside-link").click(function(e) {
    $(this).parent().parent().find(".active").removeClass("active");
    $(this).parent().addClass("active");
    let index = $(this).parent().index();
    $(".popular__aside-nav").find(".active").removeClass("active");
    $(".popular__aside-nav span").eq(index).addClass("active");
    e.preventDefault();
});
$(".popular__aside-nav span").click(function() {
    $(this).parent().find(".active").removeClass("active");
    $(this).addClass("active");
    let index = $(this).index();
    $(".popular__aside-list").find(".active").removeClass("active");
    $(".popular__aside-item").eq(index).addClass("active");
});


    $(".news__next").click(function() {
        $(".news__content .owl-next").click();
    });
    $(".reviews__nav_prev").click(function() {
        $(".reviews__list  .owl-prev").click();
    });
    $(".reviews__nav_next").click(function() {
        $(".reviews__list  .owl-next").click();
    });


    $(".categorySlider__bottom-btns img:first-child").click(function() {
        $(".slick-prev").click();
    });
    $(".categorySlider__bottom-btns img:last-child").click(function() {
        $(".slick-next").click();
    });


//  $(".product__icon_refresh").click( function() {
//     $(this).find("img").css("transform", "rotateZ(3600deg)");
//     $(this).find("img").css("transition", "1s");
//     setTimeout('$(".product__icon_refresh img").css("transform", "rotateZ(0deg)")', 300)
    
//  })


// $(".product").mouseenter( function() {
    
//     $(this).find(".product__bottom").slideToggle();
// })
// $(".product").mouseleave( function() {
    
//     $(this).find(".product__bottom").slideToggle();
// })

// if ($(window).width() < 768) {
//     $(".whyUs__wrapper").addClass("whyUs__wrapper-slider");
// }
// $( window ).resize(function() {
//     if ($(window).width() < 768) {
//         $(".whyUs__wrapper").addClass("whyUs__wrapper-slider");
//     }
//     else {

//         $(".whyUs__wrapper").removeClass("whyUs__wrapper-slider");
//     }
//   });
