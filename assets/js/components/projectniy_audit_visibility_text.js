// // Зберігаємо стан для кожного опису
// const descStates = new Map();

// function updateDescVisibility() {
//   const windowWidth = $(window).width();
  
//   $('.product__info-desc').each(function () {
//     const $descBox = $(this);
//     const $desc = $descBox.find('p');
//     const $btn = $descBox.find('.product__info-desc__btn');
//     const descId = $descBox.index('.product__info-desc');
    
//     if (!descStates.has(descId)) {
//       descStates.set(descId, { userClosed: false });
//     }
    
//     const state = descStates.get(descId);
    
//     if (windowWidth >= 1024) {
//       $btn.hide();
//       $desc.attr('data-state', 'open').addClass('open').css('display', '');
//       state.userClosed = false;
//       setTimeout(() => refreshOwlHeight($descBox), 100);
//     } else {
//       $btn.show();
      
//       if (state.userClosed) {
//         $desc.attr('data-state', 'closed').removeClass('open').hide();
//         $btn.text('Читати опис');
//       } else {
//         $desc.attr('data-state', 'open').addClass('open').css('display', '');
//         $btn.text('Сховати опис');
//       }
//       setTimeout(() => refreshOwlHeight($descBox), 100);
//     }
//   });
// }

// // Функція для оновлення висоти Owl Carousel
// function refreshOwlHeight($element) {
//   // ЗАВЖДИ шукаємо основний слайдер за класом, а не через closest owl-item
//   const $mainSlider = $element.closest('.projectAuditExpertise__slider');
  
//   if ($mainSlider.length === 0) {
//     return;
//   }
  
//   const owl = $mainSlider.data('owl.carousel');
  
//   if (!owl) {
//     return;
//   }
  
//   // Знаходимо owl-stage-outer основного слайдера
//   const $stageOuter = $mainSlider.children('.owl-stage-outer');
  
//   if ($stageOuter.length === 0) {
//     return;
//   }
  
//   // Знаходимо активні слайди основного слайдера
//   const $activeItems = $mainSlider.find('> .owl-stage-outer > .owl-stage > .owl-item.active').not('.cloned');
  
//   if ($activeItems.length === 0) {
//     return;
//   }
  
//   // Беремо перший активний слайд
//   const $targetSlide = $activeItems.first();
  
//   // Шукаємо .projectAuditExpertise__slide всередині активного слайду
//   const $slideContent = $targetSlide.find('.projectAuditExpertise__slide');
  
//   let $measureElement;
  
//   if ($slideContent.length > 0) {
//     $measureElement = $slideContent.first();
//   } else {
//     // Якщо не знайшли, беремо прямого нащадка owl-item
//     $measureElement = $targetSlide.children().first();
//   }
  
//   // Примусово викликаємо reflow
//   if ($measureElement[0]) {
//     $measureElement[0].offsetHeight;
//   }
  
//   const newHeight = $measureElement.outerHeight(true);
  
//   if (newHeight && newHeight > 0) {
//     // Зменшена тривалість анімації до 200ms
//     $stageOuter.stop(true, false).animate({
//       height: newHeight
//     }, 100);
//   }
// }

// // Функція для ініціалізації touch-обробників
// function initTouchHandlers() {
//   $('.projectAuditExpertise__slide').off('touchstart touchmove touchend touchcancel');
  
//   if ($(window).width() <= 576) {
//     let startX = 0;
//     let startY = 0;

//     $('.projectAuditExpertise__slide').on('touchstart', function (e) {
//       const touch = e.originalEvent.touches[0];
//       startX = touch.clientX;
//       startY = touch.clientY;
//     });

//     $('.projectAuditExpertise__slide').on('touchmove', function (e) {
//       const touch = e.originalEvent.touches[0];
//       const diffX = Math.abs(touch.clientX - startX);
//       const diffY = Math.abs(touch.clientY - startY);

//       const $slider = $(this).closest('.projectAuditExpertise__slider');
//       const owl = $slider.data('owl.carousel');
//       if (!owl) return;

//       if (diffY > diffX) {
//         owl.options.touchDrag = false;
//         owl.options.mouseDrag = false;
//         return;
//       }

//       owl.options.touchDrag = true;
//       owl.options.mouseDrag = true;
//     });

//     $('.projectAuditExpertise__slide').on('touchend touchcancel', function () {
//       const $slider = $(this).closest('.projectAuditExpertise__slider');
//       const owl = $slider.data('owl.carousel');
//       if (!owl) return;

//       owl.options.touchDrag = true;
//       owl.options.mouseDrag = true;
//     });
//   }
// }

// // Обробка кліку на кнопку
// $(document).on('click', '.product__info-desc__btn', function () {
//   const $btn = $(this);
//   const $descBox = $btn.closest('.product__info-desc');
//   const $desc = $descBox.find('p');
//   const descId = $descBox.index('.product__info-desc');
  
//   const state = descStates.get(descId) || { userClosed: false };
//   const currentState = $desc.attr('data-state');

//   if (currentState === 'open') {
//     // Закриваємо опис - зменшена тривалість до 200ms
//     $btn.text('Читати опис');
//     $desc.attr('data-state', 'closed').removeClass('open').slideUp({
//       duration: 0,
//       progress: function() {
//         refreshOwlHeight($descBox);
//       },
//       complete: function() {
//         state.userClosed = true;
//         descStates.set(descId, state);
//         setTimeout(function() {
//           refreshOwlHeight($descBox);
//         }, 30);
//       }
//     });
//   } else {
//     // Відкриваємо опис - зменшена тривалість до 200ms
//     $btn.text('Сховати опис');
//     $desc.attr('data-state', 'open').addClass('open').slideDown({
//       duration: 0,
//       progress: function() {
//         refreshOwlHeight($descBox);
//       },
//       complete: function() {
//         state.userClosed = false;
//         descStates.set(descId, state);
//         setTimeout(function() {
//           refreshOwlHeight($descBox);
//         }, 30);
//       }
//     });
//   }
// });

// // Початкова ініціалізація
// $(document).ready(function() {
//   updateDescVisibility();
//   initTouchHandlers();
// });

// // Debounce функція для оптимізації resize
// let resizeTimer;
// $(window).on('resize orientationchange', function () {
//   clearTimeout(resizeTimer);
//   resizeTimer = setTimeout(function() {
//     updateDescVisibility();
//     initTouchHandlers();
//   }, 50);
// });