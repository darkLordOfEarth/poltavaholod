function initCustomScroll() {
  var isLandscape = window.matchMedia('(max-width: 1280px) and (max-height: 450px)').matches;
  var isPortrait = window.matchMedia('(max-width: 480px) and (orientation: portrait)').matches;

  var $elements;

  if (isLandscape) {
    $elements = $('.reviews__slide');
  } else if (isPortrait) {
    $elements = $('.reviews__slide .redactor_wp');
  } else {
    $elements = $(); // пусто
  }

  // сброс
  $('.reviews__slide, .reviews__slide .redactor_wp').each(function () {
    var $el = $(this);
    if ($el.data('original-content')) {
      $el.html($el.data('original-content'));
      $el.removeData('original-content');
    }
  });

  // если ничего не подходит
  if (!$elements.length) return;

  $elements.each(function () {
    var $slide = $(this);

    // уже инициализирован
    if ($slide.find('.custom-scroll-wrapper').length) return;

    $slide.data('original-content', $slide.html());

    var content = $slide.html();

    $slide.html(`
      <div class="custom-scroll-wrapper">
        <div class="custom-scroll-content">${content}</div>
        <div class="custom-scrollbar">
          <div class="custom-scroll-thumb"></div>
        </div>
      </div>
    `);

    var $wrapper = $slide.find('.custom-scroll-wrapper');
    var $content = $slide.find('.custom-scroll-content');
    var $thumb = $slide.find('.custom-scroll-thumb');

    function updateThumb() {
      var contentHeight = $content[0].scrollHeight;
      var wrapperHeight = $wrapper.height();

      if (contentHeight <= wrapperHeight) {
        $thumb.hide();
        return;
      }

      var ratio = wrapperHeight / contentHeight;
      var thumbHeight = wrapperHeight * ratio;

      $thumb.height(Math.max(30, thumbHeight));
      $thumb.show();
    }

    function syncThumb() {
      var scrollTop = $content.scrollTop();
      var contentHeight = $content[0].scrollHeight;
      var wrapperHeight = $wrapper.height();

      var maxScroll = contentHeight - wrapperHeight;
      var maxThumbTop = wrapperHeight - $thumb.height();

      var thumbTop = (scrollTop / maxScroll) * maxThumbTop;

      $thumb.css('transform', 'translateY(' + thumbTop + 'px)');
    }

    $content.on('scroll', syncThumb);

    // drag
    var isDragging = false;
    var startY = 0;
    var startTop = 0;

    $thumb.on('mousedown', function (e) {
      isDragging = true;
      startY = e.pageY;

      var matrix = $thumb.css('transform');
      startTop = matrix !== 'none' ? parseInt(matrix.split(',')[5]) : 0;

      $('body').addClass('no-select');
    });

    $(document).on('mousemove.customScroll', function (e) {
      if (!isDragging) return;

      var delta = e.pageY - startY;
      var newTop = startTop + delta;

      var maxTop = $wrapper.height() - $thumb.height();
      newTop = Math.max(0, Math.min(maxTop, newTop));

      var ratio = newTop / maxTop;
      var scrollTop = ratio * ($content[0].scrollHeight - $wrapper.height());

      $content.scrollTop(scrollTop);
    });

    $(document).on('mouseup.customScroll', function () {
      isDragging = false;
      $('body').removeClass('no-select');
    });

    setTimeout(function () {
      updateThumb();
      syncThumb();
    }, 0);

    $(window).on('resize.customScroll', function () {
      updateThumb();
      syncThumb();
    });
  });
}

// init
initCustomScroll();
$(window).on('resize', initCustomScroll);


