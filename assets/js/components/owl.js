$('.header-bottom__category').owlCarousel({
    loop:true,
    nav:true,
    mouseDrag:true,
    touchDrag: true,
    pullDrag:false,
    freeDrag:false,
    URLhashListener:false,
    dots:true,
    autoplay:false,
    responsive:{
        0:{
            items:3
        },
        576:{
            items:5
        },
        1400:{
            items:7
        }
    }
});
$(".header-bottom__category-button").on("click", ()=> {
    $(".header-bottom__category .owl-next").click();
});


$('.banners__slider').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    mouseDrag:true,
    touchDrag: true,
    pullDrag:false,
    freeDrag:false,
    URLhashListener:false,
    dots:true,
    autoplay:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});

$('.products').owlCarousel({
    loop:true,
    margin:15,
    nav:false,
    mouseDrag:true,
    touchDrag: true,
    pullDrag:false,
    freeDrag:false,
    URLhashListener:false,
    dots:true,
    autoplay:false,
    responsive:{
        0:{
            items:1
        },
        450:{
            items:2
        },
        576:{
            items:3
        }
    }
})