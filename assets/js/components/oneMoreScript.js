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

    
///catalog open
// let catalog = document.querySelector('.header-bottom__custom-button');
// let menu = document.querySelector('.header-bottom__catalog');

// const toggleMenu = () => {
//     menu.classList.toggle('active');
// }

// catalog.addEventListener('click', e => {
//   e.stopPropagation();
//   toggleMenu();
// });

// document.addEventListener('click', e => {
//   let target = e.target;
//   let its_menu = target == menu || menu.contains(target);
//   let its_catalog = target == catalog;
//   let menu_is_active = menu.classList.contains('active');
  
//   if (!its_menu && !its_catalog && menu_is_active) {
//     toggleMenu();
//   }
// });


$(".popular__aside-link").click(function(e) {
    $(this).parent().parent().find(".active").removeClass("active");
    $(this).parent().addClass("active");
    let index = $(this).parent().index();
    $(".popular__aside-nav").find(".active").removeClass("active");
    $(".popular__aside-nav span").eq(index).addClass("active");
    $(".products__popular .popular__tab-item").addClass("hide");
    $(".popular__tab-item").eq(index).removeClass("hide");
    e.preventDefault();
});
$(".popular__aside-nav span").click(function() {
    $(this).parent().find(".active").removeClass("active");
    $(this).addClass("active");
    let index = $(this).index();
    $(".popular__aside-list").find(".active").removeClass("active");
    $(".popular__aside-item").eq(index).addClass("active");
    $(".products__popular .popular__tab-item").addClass("hide");
    $(".popular__tab-item").eq(index).removeClass("hide");
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


$(".categoryFilter__view").on("click", function() {
    $(this).parent().find(".active").removeClass("active");
    $(this).addClass("active");
    
})
$(".categoryFilter__view:first-child").on("click", function() {
    $(".categoryFilter__result-bottom").addClass("active");
})
$(".categoryFilter__view:last-child").on("click", function() {
    $(".categoryFilter__result-bottom").removeClass("active");
})


$(".filter__btn_mobile").on("click", function() {
    $(".categoryFilter__aside").addClass("active");
    let filter__bg = document.createElement("div");
    $(filter__bg).addClass("filter__bg");
    $("body").append(filter__bg);
    $("body").addClass("filter__active");
})
$(".filter__title img").on("click", function() {
    $(".categoryFilter__aside").removeClass("active");
    $(".filter__bg").remove();
    $("body").removeClass("filter__active");
})

$(".categoryFilter__result-nav__item").on("click", function(e) {
    e.preventDefault();
    $(this).parent().find(".active").removeClass("active");
    $(this).addClass("active");
})
$(".categoryFilter__result-nav__prev").on("click", function() {
    let item = $(".categoryFilter__result-nav__list").find(".active");
    $(item).removeClass("active")
    $(item).prev().addClass("active")
})
$(".categoryFilter__result-nav__next").on("click", function() {
    let item = $(".categoryFilter__result-nav__list").find(".active");
    $(item).removeClass("active")
    $(item).next().addClass("active")
})
$(".header__item-search").on("click", function() {
     $(".header__icons input").animate({'width': 'toggle'});
})



//slider nav
$("").on("click", function() {
     $(".slick-prev").click();
})
$("").on("click", function() {
     $(".slick-next").click();
})
$("").click(function() {
    $(".owl-next").click();
});
$("").click(function() {
    $(".owl-prev").click();
});




///////product tabs
$(".productTabs__item").on("click", function() {
    $(this).parent().find(".active").removeClass("active");
    $(this).addClass("active");
    let index = $(this).index();
    $(".productTabs__block").addClass("hide");
    $(".productTabs__block").eq(index).toggleClass("hide");
})

//recommended slider nav
$(".recommended__nav img:first-child").on("click", function() {
    $(this).parent().parent().find(".owl-prev").click();
})
$(".recommended__nav img:last-child").on("click", function() {
    $(this).parent().parent().find(".owl-next").click();
})


//popups
$(document).ready(function() {
    if ($(window).width() < 992) {
      $(".product-card__bottom").addClass("active");
    };
  
    $(".ocf-search-btn-static").text("Применить фильтр");
    $(".ocf-close-mobile").addClass("fltrclose");
  
  
    $("#popup-delivery").mask("+38 (999) 999-99-99");
    $("#popup-manager").mask("+38 (999) 999-99-99");
    $("#popup-byClick").mask("+38 (999) 999-99-99");


    $(".popup__button_delivery").on("click", function() {
      $(".popup-delivery").parent().removeClass("hide");
      popup();
    })
    $(".popup__button_manager").on("click", function() {
      $(".popup-manager").parent().removeClass("hide");
      popup();
    })
    $(".popup__button_byClick").on("click", function() {
      $(".popup-byClick").parent().removeClass("hide");
      popup();
    })
    function popup() {
      let div = document.createElement("div");
      $(div).addClass("popup-active");
      $("body").append(div);
      $("body").addClass("popap-open");
    }
  
    $(".popup__close").on("click", function() {
      $(this).parent().parent().addClass("hide");
      $("body").find(".popup-active").remove();
      $("body").removeClass("popap-open");
    });
    
  });


  $("body").click(function(e) {
       if($(e.target).hasClass("popup-active")) {
        $(".popup__close").click();
      } else {
        return;
      }
  });

  //вертикальный слайдер
  //Документация https://frontips.ru/variant-vertikalnogo-slajdera-s-prevyu-na-osnove-swiper/
    // Инициализация превью слайдера
    const sliderThumbs = new Swiper('.slider__thumbs .swiper-container', { // ищем слайдер превью по селектору
        // задаем параметры
        direction: 'vertical', // вертикальная прокрутка
        slidesPerView: 4, // показывать по 3 превью
        mousewheel: true,
        spaceBetween: 6, // расстояние между слайдами
        loop: true,
        navigation: { // задаем кнопки навигации
            nextEl: '.slider__next', // кнопка Next
            prevEl: '.slider__prev' // кнопка Prev
        },
        freeMode: true, // при перетаскивании превью ведет себя как при скролле
        breakpoints: { // условия для разных размеров окна браузера
            0: { // при 0px и выше
                direction: 'vertical', // горизонтальная прокрутка
                slidesPerView: 3
            },
            768: { // при 768px и выше
                direction: 'vertical', // вертикальная прокрутка
                slidesPerView: 4
            }
        }
    });
    // Инициализация слайдера изображений
    const sliderImages = new Swiper('.slider__images .swiper-container', { // ищем слайдер превью по селектору
        // задаем параметры
        direction: 'vertical', // вертикальная прокрутка
        slidesPerView: 1, // показывать по 1 изображению
        spaceBetween: 32, // расстояние между слайдами
        mousewheel: true, // можно прокручивать изображения колёсиком мыши
        loop: true,
        navigation: { // задаем кнопки навигации
            nextEl: '.slider__next', // кнопка Next
            prevEl: '.slider__prev' // кнопка Prev
        },
        grabCursor: true, // менять иконку курсора
        thumbs: { // указываем на превью слайдер
            swiper: sliderThumbs // указываем имя превью слайдера
        },
        breakpoints: { // условия для разных размеров окна браузера
            0: { // при 0px и выше
                direction: 'vertical', // горизонтальная прокрутка
            },
            768: { // при 768px и выше
                direction: 'vertical', // вертикальная прокрутка
            }
        }
    });



    // select
    // $(".js-select2").select2({
    //     closeOnSelect : false,
    //     placeholder : "Оббивка",
    //     allowHtml: true,
    //     allowClear: true
    // });
    // $(".js-select3").select2({
    //     closeOnSelect : false,
    //     placeholder : "Ножки",
    //     allowHtml: true,
    //     allowClear: true
    // });
    // $(".js-select4").select2({
    //     closeOnSelect : false,
    //     placeholder : "Каркас",
    //     allowHtml: true,
    //     allowClear: true
    // });
    // $(".js-select5").select2({
    //     closeOnSelect : false,
    //     placeholder : "Размер",
    //     allowHtml: true,
    //     allowClear: true
    // });
    // $(".js-select6").select2({
    //     closeOnSelect : false,
    //     placeholder : "Пружинный блок",
    //     allowHtml: true,
    //     allowClear: true
    // });
    // $(".js-select7").select2({
    //     closeOnSelect : false,
    //     placeholder : "Механизм",
    //     allowHtml: true,
    //     allowClear: true
    // });