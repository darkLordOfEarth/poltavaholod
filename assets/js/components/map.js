$(function () {

  const $mapWrapper = $('.map-wrapper');
  const $svg        = $('.map-wrapper svg');
  const $pointsBox  = $('.map-points');
  const $list       = $('.points-list');

  let points = [];

  function addPoint(xPercent, yPercent) {
    const id = Date.now();

    const $point = $('<div/>', {
      class: 'point',
      'data-id': id
    }).css({
      left: xPercent + '%',
      top: yPercent + '%'
    });

    $pointsBox.append($point);

    points.push({ id, x: xPercent, y: yPercent });

    $list.append(`
      <div class="point-item" data-id="${id}">
        Точка ${id}: X: ${xPercent.toFixed(2)}%, Y: ${yPercent.toFixed(2)}%
      </div>
    `);
  }

  $svg.on('click', function (e) {

    const offset = $mapWrapper.offset();
    const w = $mapWrapper.width();
    const h = $mapWrapper.height();

    const clickX = e.pageX - offset.left;
    const clickY = e.pageY - offset.top;

    const xPercent = (clickX / w) * 100;
    const yPercent = (clickY / h) * 100;

    addPoint(xPercent, yPercent);
  });

});
