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
});
$('.recommended__slider').owlCarousel({
    loop:true,
    margin:30,
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
        670:{
            items:3
        },
        992:{
            items:4
        }
    }
});

$('.news__content').owlCarousel({
    loop:true,
    margin:15,
    nav:true,
    mouseDrag:true,
    touchDrag: true,
    pullDrag:false,
    freeDrag:false,
    URLhashListener:false,
    dots:false,
    autoplay:false,
    responsive:{
        0:{
            items:1
        },
        450:{
            items:1
        },
        768:{
            items:1
        }
    }
});
$('.news__list_mobile').owlCarousel({
    loop:true,
    margin:15,
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
            items:1
        },
        450:{
            items:1
        },
        768:{
            items:1
        }
    }
});
$('.reviews__list').owlCarousel({
    loop:true,
    margin:15,
    items:3,
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
            items:1
        },
        768:{
            items:2,
            margin:30
        },
        992:{
            items:3
        }
    }
});

$('.slider-category').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    fade: false,
    asNavFor: '.slider-category-nav'
  });
  $('.slider-category-nav').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: '.slider-category',
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    focusOnSelect: true,
    responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
    ]
  });
  
$('.productPage__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
    fade: false,
    asNavFor: '.productPage__slider-nav'
  });
  $('.productPage__slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.productPage__slider',
    dots: false,
    centerMode: true,
    centerPadding: '30',
    focusOnSelect: true,
    responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
    ]
  });