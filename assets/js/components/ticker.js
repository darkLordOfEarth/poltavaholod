const items = [
      "Морозиво",
      "Напівфабрикати",
      "Хумус",
      "Закуски бутербродні",
      "Охолоджена продукція",
    ];
 
    function buildSet() {
      return items.map(function(text) {
        return '<span class="ticker-item">' + text + '<span class="ticker-dot"></span></span>';
      }).join('');
    }
 
    function initTicker() {
      const $track = $('#track');
      const $wrap = $('.ticker-wrap');
 
      // Вставляем один набор, измеряем его ширину
      $track.html(buildSet());
      const setWidth = $track.width();
      const screenWidth = $wrap.width();
 
      // Считаем сколько копий нужно чтобы заполнить экран + запас
      const copies = Math.ceil((screenWidth * 2) / setWidth) + 2;
 
      let html = '';
      for (let i = 0; i < copies; i++) {
        html += buildSet();
      }
      $track.html(html);
 
      // Анимируем ровно на ширину одного набора (бесшовная петля)
      $track.css({
        'animation': 'none',
        'transform': 'translateX(0)'
      });
 
      let pos = 0;
      const speed = .5; // пикселей за кадр (увеличь для скорости)
 
      function animate() {
        pos -= speed;
        if (Math.abs(pos) >= setWidth) {
          pos = 0;
        }
        $track.css('transform', 'translateX(' + pos + 'px)');
        requestAnimationFrame(animate);
      }
 
      // Пауза при наведении
      let paused = false;
      $('.ticker-wrap').on('mouseenter', function() { paused = true; });
      $('.ticker-wrap').on('mouseleave', function() { paused = false; });
 
      function animatePausable() {
        if (!paused) {
          pos -= speed;
          if (Math.abs(pos) >= setWidth) {
            pos = 0;
          }
          $track.css('transform', 'translateX(' + pos + 'px)');
        }
        requestAnimationFrame(animatePausable);
      }
 
      animatePausable();
    }
 
    $(document).ready(function() {
      // Убираем CSS-анимацию, используем JS
      $('#track').css('animation', 'none');
      initTicker();
    });