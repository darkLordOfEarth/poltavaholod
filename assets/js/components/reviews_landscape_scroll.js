$(function () {
  $('.reviews__slide').each(function () {
    const $slide = $(this);
    const $slideHeight = $slide.outerHeight();

    const $content = $slide.wrapInner('<div class="custom-scroll-content"></div>').find('.custom-scroll-content');
    $content.css({
      maxHeight: $slideHeight,
      overflowY: 'auto',
      scrollbarWidth: 'none'
    });

    const $scrollbar = $('<div class="custom-scrollbar"><div class="custom-scrollbar-thumb"></div></div>');
    $slide.append($scrollbar);

    const $thumb = $scrollbar.find('.custom-scrollbar-thumb');

    function updateThumb() {
      const contentHeight = $content[0].scrollHeight;
      const visibleHeight = $content.innerHeight();
      const scrollRatio = $content[0].scrollTop / (contentHeight - visibleHeight);

      const scrollbarHeight = $scrollbar.innerHeight();
      const thumbHeight = Math.max(20, (visibleHeight / contentHeight) * scrollbarHeight); // минимум 20px
      $thumb.height(thumbHeight);

      const maxThumbTop = scrollbarHeight - thumbHeight;
      const thumbTop = scrollRatio * maxThumbTop;
      $thumb.css('top', thumbTop);
    }

    let dragging = false;
    let startY = 0;
    let startScrollTop = 0;

    $thumb.on('mousedown', function (e) {
      dragging = true;
      startY = e.pageY;
      startScrollTop = $content[0].scrollTop;
      $('body').css('user-select', 'none');
    });

    $(document).on('mousemove', function (e) {
      if (!dragging) return;
      const delta = e.pageY - startY;
      const scrollbarHeight = $scrollbar.innerHeight();
      const thumbHeight = $thumb.innerHeight();
      const scrollRatio = delta / (scrollbarHeight - thumbHeight);
      const maxScrollTop = $content[0].scrollHeight - $content.innerHeight();
      $content[0].scrollTop = startScrollTop + scrollRatio * maxScrollTop;
      updateThumb();
    });

    $(document).on('mouseup', function () {
      dragging = false;
      $('body').css('user-select', '');
    });

    $content.on('scroll', updateThumb);

    // Обновление при изменении размеров или подгрузке контента
    const resizeObserver = new ResizeObserver(updateThumb);
    resizeObserver.observe($content[0]);

    updateThumb(); // первичная инициализация
  });
});