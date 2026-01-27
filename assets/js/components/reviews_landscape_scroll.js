$(function () {
  const phoneLandscapeMQ = window.matchMedia(
    '(orientation: landscape) and (hover: none) and (pointer: coarse)',
  );

  if (phoneLandscapeMQ.matches) {
    initCustomScrollbar();
  }

  phoneLandscapeMQ.addEventListener('change', (e) => {
    if (e.matches) {
      initCustomScrollbar();
    } else {
      destroyCustomScrollbar();
    }
  });

  // let scrollbarInited = false;
  function initCustomScrollbar() {
  $('.reviews__slide').each(function () {
    const $slide = $(this);

    if ($slide.find('.custom-scroll-content').length) return;
    if ($slide.data('custom-scroll')) return;

    $slide.data('custom-scroll', true);

    const $content = $slide
      .wrapInner('<div class="custom-scroll-content"></div>')
      .find('.custom-scroll-content');

    $content.css({
      maxHeight: $slide.outerHeight(),
      overflowY: 'auto',
      scrollbarWidth: 'none',
    });

    const $scrollbar = $('<div class="custom-scrollbar"><div class="custom-scrollbar-thumb"></div></div>');
    $slide.append($scrollbar);

    const $thumb = $scrollbar.find('.custom-scrollbar-thumb');

    function updateThumb() {
      const contentHeight = $content[0].scrollHeight;
      const visibleHeight = $content.innerHeight();
      if (contentHeight <= visibleHeight) {
        $scrollbar.hide();
        return;
      }
      $scrollbar.show();

      const scrollbarHeight = $scrollbar.innerHeight();
      const thumbHeight = Math.max(20, (visibleHeight / contentHeight) * scrollbarHeight);
      const scrollRatio = $content[0].scrollTop / (contentHeight - visibleHeight);

      $thumb.height(thumbHeight);
      $thumb.css('top', scrollRatio * (scrollbarHeight - thumbHeight));
    }

    $content.on('scroll', updateThumb);

    const resizeObserver = new ResizeObserver(updateThumb);
    resizeObserver.observe($content[0]);

    $slide.data('custom-scroll-data', {
      resizeObserver,
      $scrollbar,
    });

    updateThumb();
  });
}


  function destroyCustomScrollbar() {
  $(document).off('mousemove mouseup');

  $('.reviews__slide').each(function () {
    const $slide = $(this);
    const data = $slide.data('custom-scroll-data');

    if (data?.resizeObserver) {
      data.resizeObserver.disconnect();
    }

    $slide.find('.custom-scrollbar').remove();

    $slide.find('.custom-scroll-content').each(function () {
      $(this)
        .css({
          maxHeight: '',
          overflowY: '',
          scrollbarWidth: '',
        })
        .children()
        .unwrap();
    });

    $slide.removeData('custom-scroll custom-scroll-data');
  });
}

});
