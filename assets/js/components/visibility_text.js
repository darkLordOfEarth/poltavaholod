// Зберігаємо стан для кожного опису
const descStates = new Map();

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
      $desc.attr('data-state', 'open').addClass('open').css('display', '');
      state.userClosed = false;
      setTimeout(() => refreshOwlHeight($descBox), 50);
    } else {
      $btn.show();
      
      if (state.userClosed) {
        $desc.attr('data-state', 'closed').removeClass('open').hide();
        $btn.text('Читати опис');
      } else {
        $desc.attr('data-state', 'open').addClass('open').css('display', '');
        $btn.text('Сховати опис');
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
      descStates.set(descId, { userClosed: false });
    }
    
    const state = descStates.get(descId);
    
    if (windowWidth >= 1024) {
      $btn.hide();
      $desc.attr('data-state', 'open').css('display', '');
      state.userClosed = false;
    } else {
      $btn.show();
      
      if (state.userClosed) {
        $desc.attr('data-state', 'closed').hide();
        $btn.text('Читати опис');
      } else {
        $desc.attr('data-state', 'open').show();
        $btn.text('Сховати опис');
      }
    }
  });
}

// Функція для оновлення висоти Owl Carousel (тільки для projectAuditExpertise)
function refreshOwlHeight($element) {
  const $mainSlider = $element.closest('.projectAuditExpertise__slider');
  
  if ($mainSlider.length === 0) {
    return;
  }
  
  const owl = $mainSlider.data('owl.carousel');
  
  if (!owl) {
    return;
  }
  
  const $stageOuter = $mainSlider.children('.owl-stage-outer');
  
  if ($stageOuter.length === 0) {
    return;
  }
  
  const $activeItems = $mainSlider.find('> .owl-stage-outer > .owl-stage > .owl-item.active').not('.cloned');
  
  if ($activeItems.length === 0) {
    return;
  }
  
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
    // Швидка анімація для слайдера - 150ms
    $stageOuter.stop(true, false).animate({
      height: newHeight
    }, 150);
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
  
  // Визначаємо, на якій сторінці ми знаходимося
  const isAuditPage = $btn.closest('.projectAuditExpertise').length > 0;
  const isConstructionsPage = $btn.closest('.constructionsList').length > 0;
  
  if (isAuditPage) {
    // Логіка для projectAuditExpertise - ШВИДКА анімація 150ms
    const $descBox = $btn.closest('.product__info-desc');
    const $desc = $descBox.find('p');
    const descId = 'audit-' + $descBox.index('.projectAuditExpertise .product__info-desc');
    
    const state = descStates.get(descId) || { userClosed: false };
    const currentState = $desc.attr('data-state');

    if (currentState === 'open') {
      $btn.text('Читати опис');
      $desc.attr('data-state', 'closed').removeClass('open').slideUp({
        duration: 150,
        progress: function() {
          refreshOwlHeight($descBox);
        },
        complete: function() {
          state.userClosed = true;
          descStates.set(descId, state);
          setTimeout(function() {
            refreshOwlHeight($descBox);
          }, 20);
        }
      });
    } else {
      $btn.text('Сховати опис');
      $desc.attr('data-state', 'open').addClass('open').slideDown({
        duration: 150,
        progress: function() {
          refreshOwlHeight($descBox);
        },
        complete: function() {
          state.userClosed = false;
          descStates.set(descId, state);
          setTimeout(function() {
            refreshOwlHeight($descBox);
          }, 20);
        }
      });
    }
  } else if (isConstructionsPage) {
    // Логіка для constructionsList - ПОВІЛЬНІША анімація 300ms
    const $desc = $btn.next('.product__info-desc');
    const descId = 'construction-' + $desc.index('.constructionsList .product__info-desc');
    
    const state = descStates.get(descId) || { userClosed: false };
    const currentState = $desc.attr('data-state');

    if (currentState === 'closed') {
      $btn.text('Сховати опис');
      $desc.attr('data-state', 'open').slideDown({
        duration: 300
      });
      state.userClosed = false;
    } else {
      $btn.text('Читати опис');
      $desc.attr('data-state', 'closed').slideUp({
        duration: 300
      });
      state.userClosed = true;
    }
    
    descStates.set(descId, state);
  }
});

// Початкова ініціалізація
$(document).ready(function() {
  updateDescVisibility();
  initTouchHandlers();
});

// Debounce функція для оптимізації resize
let resizeTimer;
$(window).on('resize orientationchange', function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    updateDescVisibility();
    initTouchHandlers();
  }, 250);
});