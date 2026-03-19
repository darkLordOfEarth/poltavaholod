// Зберігаємо стан для кожного опису
const descStates = new Map();

// Планшетний діапазон: 576px–1280px
function isTablet() {
  const w = $(window).width();
  return w >= 576 && w <= 1280;
}

// Функція для оновлення видимості описів
function updateDescVisibility() {
  const windowWidth = $(window).width();

  // Для сторінки projectAuditExpertise (зі слайдером)
  $('.projectAuditExpertise .product__info-desc').each(function () {
    const $descBox = $(this);
    const $desc = $descBox.find('p');
    const $btn = $descBox.find('.product__info-desc__btn');
    const descId = 'audit-' + $descBox.index('.projectAuditExpertise .product__info-desc');

    if (!descStates.has(descId)) {
      descStates.set(descId, { userClosed: false });
    }

    const state = descStates.get(descId);

    if (windowWidth >= 1024) {
      $btn.hide();
      $desc.attr('data-state', 'open').addClass('open').show();
      state.userClosed = false;
      setTimeout(() => refreshOwlHeight($descBox), 50);
    } else {
      $btn.show();

      if (state.userClosed) {
        $desc.attr('data-state', 'closed').removeClass('open').hide();
        if ($('html').attr('lang') == 'uk') {
          $btn.text('Читати опис');
        } else {
          $btn.text('Читать описание');
        }
      } else {
        $desc.attr('data-state', 'open').addClass('open').show();
        if ($('html').attr('lang') == 'uk') {
          $btn.text('Сховати опис');
        } else {
          $btn.text('Спрятать описание');
        }
      }
      setTimeout(() => refreshOwlHeight($descBox), 50);
    }
  });

  // Для сторінки constructionsList (без слайдера)
  $('.constructionsList .product__info-desc').each(function () {
    const $desc = $(this);
    const $btn = $desc.prev('.product__info-desc__btn');

    if ($btn.length === 0) return;

    const descId = 'construction-' + $desc.index('.constructionsList .product__info-desc');

    if (!descStates.has(descId)) {
      descStates.set(descId, {
        // На планшеті і десктопі — одразу відкрито, на мобілі — закрито
        userClosed: windowWidth < 576,
      });
    }

    const state = descStates.get(descId);

    if (windowWidth >= 1024) {
      // Десктоп: кнопка прихована, опис завжди відкритий
      $btn.hide();
      $desc.attr('data-state', 'open').addClass('is-open').css('max-height', 'initial');
      state.userClosed = false;
    } else if (isTablet()) {
      // Планшет: кнопка видима, опис розгорнутий за замовчуванням
      // $btn.show();
      if ($('html').attr('lang') == 'uk') {
        $btn.text('Сховати опис');
      } else {
        $btn.text('Спрятать описание');
      }
      $desc.attr('data-state', 'open').addClass('is-open').css('max-height', 'initial');
      state.userClosed = false;
    } else {
      // Мобіл < 576px: кнопка видима, стан залежить від userClosed
      $btn.show();

      if (state.userClosed) {
        $desc.attr('data-state', 'closed').removeClass('is-open').css('max-height', '');
        if ($('html').attr('lang') == 'uk') {
          $btn.text('Читати опис');
        } else {
          $btn.text('Читать описание');
        }
      } else {
        $desc.attr('data-state', 'open').addClass('is-open').css('max-height', 'initial');
        if ($('html').attr('lang') == 'uk') {
          $btn.text('Сховати опис');
        } else {
          $btn.text('Спрятать описание');
        }
      }
    }
  });
}

// Функція для оновлення висоти Owl Carousel (тільки для projectAuditExpertise)
function refreshOwlHeight($element) {
  const $mainSlider = $element.closest('.projectAuditExpertise__slider');

  if ($mainSlider.length === 0) return;

  const owl = $mainSlider.data('owl.carousel');
  if (!owl) return;

  const $stageOuter = $mainSlider.children('.owl-stage-outer');
  if ($stageOuter.length === 0) return;

  const $activeItems = $mainSlider
    .find('> .owl-stage-outer > .owl-stage > .owl-item.active')
    .not('.cloned');

  if ($activeItems.length === 0) return;

  const $targetSlide = $activeItems.first();
  const $slideContent = $targetSlide.find('.projectAuditExpertise__slide');

  let $measureElement;

  if ($slideContent.length > 0) {
    $measureElement = $slideContent.first();
  } else {
    $measureElement = $targetSlide.children().first();
  }

  if ($measureElement[0]) {
    $measureElement[0].offsetHeight;
  }

  const newHeight = $measureElement.outerHeight(true);

  if (newHeight && newHeight > 0) {
    $stageOuter.stop(true, false).animate({ height: newHeight }, 150);
  }
}

// Функція для ініціалізації touch-обробників (тільки для projectAuditExpertise)
function initTouchHandlers() {
  $('.projectAuditExpertise__slide').off('touchstart touchmove touchend touchcancel');

  if ($(window).width() <= 576) {
    let startX = 0;
    let startY = 0;

    $('.projectAuditExpertise__slide').on('touchstart', function (e) {
      const touch = e.originalEvent.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    });

    $('.projectAuditExpertise__slide').on('touchmove', function (e) {
      const touch = e.originalEvent.touches[0];
      const diffX = Math.abs(touch.clientX - startX);
      const diffY = Math.abs(touch.clientY - startY);

      const $slider = $(this).closest('.projectAuditExpertise__slider');
      const owl = $slider.data('owl.carousel');
      if (!owl) return;

      if (diffY > diffX) {
        owl.options.touchDrag = false;
        owl.options.mouseDrag = false;
        return;
      }

      owl.options.touchDrag = true;
      owl.options.mouseDrag = true;
    });

    $('.projectAuditExpertise__slide').on('touchend touchcancel', function () {
      const $slider = $(this).closest('.projectAuditExpertise__slider');
      const owl = $slider.data('owl.carousel');
      if (!owl) return;

      owl.options.touchDrag = true;
      owl.options.mouseDrag = true;
    });
  }
}

// Обробка кліку на кнопку - для обох сторінок
$(document).on('click', '.product__info-desc__btn', function () {
  const $btn = $(this);

  const isAuditPage = $btn.closest('.projectAuditExpertise').length > 0;
  const isConstructionsPage = $btn.closest('.constructionsList').length > 0;

  if (isAuditPage) {
    const $descBox = $btn.closest('.product__info-desc');
    const $desc = $descBox.find('p');
    const descId = 'audit-' + $descBox.index('.projectAuditExpertise .product__info-desc');

    const state = descStates.get(descId) || { userClosed: false };
    const currentState = $desc.attr('data-state');

    if (currentState === 'open') {
      if ($('html').attr('lang') == 'uk') {
          $btn.text('Читати опис');
        } else {
          $btn.text('Читать описание');
        }
      $desc
        .attr('data-state', 'closed')
        .removeClass('open')
        .slideUp({
          duration: 150,
          progress: function () {
            refreshOwlHeight($descBox);
          },
          complete: function () {
            state.userClosed = true;
            descStates.set(descId, state);
            setTimeout(function () {
              refreshOwlHeight($descBox);
            }, 20);
          },
        });
    } else {
      if ($('html').attr('lang') == 'uk') {
        $btn.text('Сховати опис');
      } else {
        $btn.text('Спрятать описание');
      }

      $desc
        .attr('data-state', 'open')
        .addClass('open')
        .slideDown({
          duration: 150,
          progress: function () {
            refreshOwlHeight($descBox);
          },
          complete: function () {
            state.userClosed = false;
            descStates.set(descId, state);
            setTimeout(function () {
              refreshOwlHeight($descBox);
            }, 20);
          },
        });
    }
  } else if (isConstructionsPage) {
    // На планшеті кнопка прихована, клік не спрацює — але на всяк випадок guard
    // if (isTablet()) return;

    function getCollapsedHeight($el) {
      const lineHeight = parseFloat($el.css('line-height'));
      return lineHeight * 3;
    }

    function openDesc($el) {
      const currentHeight = $el.outerHeight();
      $el.css('max-height', currentHeight).addClass('is-open');
      const fullHeight = $el[0].scrollHeight;
      requestAnimationFrame(() => {
        $el.css('max-height', fullHeight);
      });
      setTimeout(() => {
        $el.css('max-height', 'initial');
      }, 300);
    }

    function closeDesc($el) {
      const fullHeight = $el.outerHeight();
      const collapsedHeight = getCollapsedHeight($el);
      $el.css('max-height', fullHeight).removeClass('is-open');
      requestAnimationFrame(() => {
        $el.css('max-height', collapsedHeight);
      });
    }

    const $desc = $btn.next('.product__info-desc');
    const descId = 'construction-' + $desc.index('.constructionsList .product__info-desc');

    const state = descStates.get(descId) || { userClosed: true };
    const isOpen = $desc.attr('data-state') === 'open';

    if (isOpen) {
      closeDesc($desc);
      $desc.attr('data-state', 'closed');
      if ($('html').attr('lang') == 'uk') {
          $btn.text('Читати опис');
        } else {
          $btn.text('Читать описание');
        }
      state.userClosed = true;
    } else {
      openDesc($desc);
      $desc.attr('data-state', 'open');
      if ($('html').attr('lang') == 'uk') {
        $btn.text('Сховати опис');
      } else {
        $btn.text('Спрятать описание');
      }
      state.userClosed = false;
    }

    descStates.set(descId, state);
  }
});

// Початкова ініціалізація
$(document).ready(function () {
  updateDescVisibility();
  initTouchHandlers();
});

// Debounce для resize
let resizeTimer;
$(window).on('resize orientationchange', function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    // При зміні орієнтації планшета скидаємо userClosed для constructions
    if (isTablet()) {
      descStates.forEach((state, key) => {
        if (key.startsWith('construction-')) {
          state.userClosed = false;
        }
      });
    }
    updateDescVisibility();
    initTouchHandlers();
  }, 250);
});
