$(function () {
  // hero slider
  const $hero_slider = $('.hero__slider');
  if ($hero_slider.length) {
    $hero_slider.slick({
      slidesToShow: 1,
      fade: true,
      arrows: true,
      dots: false,
      infinite: true,
      speed: 800,
      autoplay: false,
      pauseOnFocus: false,
      pauseOnHover: false,
      autoplaySpeed: 3000,
      adaptiveHeight: false,
      cssEase: 'ease',
      prevArrow: '<button type="button" class="slick-prev slick-arrow"></button>',
      nextArrow: '<button type="button" class="slick-next slick-arrow"></button>',
    });
  }
  $('.hero__slider-prev').on('click', function () {
    $('.hero__slider .slick-prev').click();
  });
  $('.hero__slider-next').on('click', function () {
    $('.hero__slider .slick-next').click();
  });
  // hero slider

  // product slider
  $('.gallery__main-images').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.gallery__thumbs',
  });
  $('.gallery__thumbs').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.gallery__main-images',
    dots: false,
    centerMode: true,
    focusOnSelect: true
  });
  $(".gallery__arrow--prev").on("click", function() {
    $(this).parents(".gallery").find(".slick-prev").click();
  })
  $(".gallery__arrow--next").on("click", function() {
    $(this).parents(".gallery").find(".slick-next").click();
  })
  if($(".gallery__main-images img").length < 4) {
    $(".gallery__arrow").hide();
  }
   // product slider
});
