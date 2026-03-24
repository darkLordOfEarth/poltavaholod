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
  };
  $(".hero__slider-prev").on("click", function() {
    $(".hero__slider .slick-prev").click();
  });
  $(".hero__slider-next").on("click", function() {
    $(".hero__slider .slick-next").click();
  });
  // hero slider





});
