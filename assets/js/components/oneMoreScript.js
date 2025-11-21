$(function () {
  function checkHeaderScroll() {
    if ($(window).scrollTop() > 0) {
      $('header').addClass('scrolled');
    } else {
      $('header').removeClass('scrolled');
    }
    let mainHeight = $(".main").outerHeight();
    if ($(window).scrollTop() > mainHeight/2) {
      $('.main__group-btns').addClass('scrolled');
    } else {
      $('.main__group-btns').removeClass('scrolled');
    }
  }

  $(window).on('scroll', checkHeaderScroll);
  $(window).on('load', checkHeaderScroll);

$(function () {
    const $videoBlocks = $('.videoBlock');

    if ($videoBlocks.length === 0) return;

    $videoBlocks.each(function () {
        const $block = $(this);
        const $video = $block.find('video');
        const $playBtn = $block.find('.play__btn');
        const $closeBtn = $block.find('.videoBlock__close');

        if (!$video.length) return;

        // Клик на кнопку Play
        $playBtn.off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Закрываем другие видео
            $('.videoBlock').removeClass('open').find('video').each(function () {
                this.pause();
            });

            $block.addClass('open');
            $video[0].play();
            $playBtn.fadeOut(150);
        });

        // Клик на само видео
        $video.off('click').on('click', function () {
            $block.addClass('open');
            if (this.paused) {
                this.play();
                $playBtn.fadeOut(150);
            } else {
                this.pause();
                $playBtn.fadeIn(150);
            }
        });

        // Когда видео закончилось
        $video.off('ended').on('ended', function () {
            $playBtn.fadeIn(150);
        });

        // Закрытие видео блока
        $closeBtn.off('click').on('click', function () {
            $video[0].pause();
            $block.removeClass('open');
            $playBtn.fadeIn(150);
        });
    });
});




  $('.virtualTour__toggle-btn').on('click', function () {
    $('.virtualTour__toggle-btn').removeClass('active');
    $(this).addClass('active');
    let video = $(this).attr('data-video');
    let link = $(this).attr('data-link');
    let elem = $('.virtualTour .video-element');
    let btn = $('.virtualTour__link');
    elem.attr('src', video);
    btn.attr('href', link);
    let $play = $(this).parents('.virtualTour').find('.play__btn');
    $play.fadeIn(150);
  });
});
