$(document).ready(function() {
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 0) { 
      $('header').addClass('scrolled');
    } else { 
      $('header').removeClass('scrolled');
    }
  });




  $(function () {
  const $videos = $('video');

  if ($videos.length === 0) return;

  $videos.each(function () {
    const $video = $(this);
    const $wrap = $video.closest('.videoBlock');
    const $playBtn = $wrap.find('.play__btn');

    $playBtn.off('click');
    $video.off('click');

    $playBtn.on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const vid = $video.get(0);
      if (!vid) return;

      vid.play();
      $playBtn.fadeOut(150);
    });

    $video.on('click', function () {
      const vid = this;

      if (vid.paused) {
        vid.play();
        $playBtn.fadeOut(150);
      } else {
        vid.pause();
        $playBtn.fadeIn(150);
      }
    });

    $video.on('ended', function () {
      $playBtn.fadeIn(150);
    });
  });
});



$('.virtualTour__toggle-btn').on('click', function () {
  $('.virtualTour__toggle-btn').removeClass('active');
  $(this).addClass('active');
  let video = $(this).attr("data-video");
  let link = $(this).attr("data-link");
  let elem = $(".virtualTour .video-element");
  let btn = $(".virtualTour__link");
  elem.attr("src", video);
  btn.attr("href", link);
  let $play = $(this).parents(".virtualTour").find(".play__btn");
  $play.fadeIn(150);
});



});
