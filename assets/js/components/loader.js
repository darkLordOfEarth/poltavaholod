const fill = document.getElementById('logoProgressFill');
const SVG_WIDTH = 240;
let progress = 0;

// Простая анимация до 90%
function animateToTarget(target, onComplete) {
  function step() {
    progress += (target - progress) * 0.2;
    
    if (Math.abs(target - progress) < 1) {
      progress = target;
      fill.setAttribute('width', (SVG_WIDTH * progress) / 100);
      if (onComplete) onComplete();
      return;
    }
    
    fill.setAttribute('width', (SVG_WIDTH * progress) / 100);
    requestAnimationFrame(step);
  }
  step();
}

// Быстро заполняем до 90%
animateToTarget(90);

// Когда страница загружена - дозаполняем и скрываем
window.addEventListener('load', () => {
  animateToTarget(100, () => {
    const loader = document.getElementById('pageLoader');
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
  });
});

// Страховка: если за 5 секунд не загрузилось - всё равно скрываем
setTimeout(() => {
  if (progress < 100) {
    animateToTarget(100, () => {
      const loader = document.getElementById('pageLoader');
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    });
  }
}, 5000);

// const fill = document.getElementById('logoProgressFill');
// const SVG_WIDTH = 240;

// let progress = 0;
// let targetProgress = 0;
// let forceComplete = false;

// // Отслеживаем все ресурсы: images, stylesheets, scripts
// function trackResources() {
//   const images = Array.from(document.images);
//   const stylesheets = Array.from(document.styleSheets);
//   const scripts = Array.from(document.scripts);
  
//   let totalResources = images.length + stylesheets.length;
//   let loadedResources = 0;

//   // Проверка изображений
//   images.forEach(img => {
//     if (img.complete) loadedResources++;
//     else {
//       img.addEventListener('load', () => { loadedResources++; updateTarget(); });
//       img.addEventListener('error', () => { loadedResources++; updateTarget(); });
//     }
//   });

//   // Проверка стилей (если они не загрузились - считаем ошибкой)
//   stylesheets.forEach(sheet => {
//     try {
//       // Попытка доступа к правилам - если файл загружен, ошибки не будет
//       const rules = sheet.cssRules || sheet.rules;
//       loadedResources++;
//     } catch (e) {
//       // CORS или файл не загружен - считаем как загруженный с ошибкой
//       loadedResources++;
//     }
//   });

//   return { totalResources, loadedResources };
// }

// const { totalResources, loadedResources: initialLoaded } = trackResources();
// let loadedResources = initialLoaded;

// function calculateTarget() {
//   let domProgress = 0;
//   if (document.readyState === "loading") domProgress = 0;
//   else if (document.readyState === "interactive") domProgress = 50;
//   else if (document.readyState === "complete") domProgress = 70;

//   let resourceProgress = totalResources ? (loadedResources / totalResources) * 30 : 30;

//   let target = domProgress + resourceProgress;
//   return Math.min(target, 100);
// }

// function updateTarget() {
//   targetProgress = calculateTarget();
  
//   // Принудительное завершение через 5 секунд после complete
//   if (document.readyState === "complete" && !forceComplete) {
//     setTimeout(() => {
//       forceComplete = true;
//       targetProgress = 100;
//     }, 5000);
//   }
// }

// function animate() {
//   const diff = targetProgress - progress;
//   progress += diff * 0.15; // ещё быстрее

//   if (Math.abs(diff) < 0.5 || forceComplete) {
//     progress = targetProgress;
//   }

//   fill.setAttribute('width', (SVG_WIDTH * progress) / 100);

//   if (progress >= 100) {
//     const loader = document.getElementById('pageLoader');
//     loader.style.opacity = '0';
//     setTimeout(() => loader.remove(), 500);
//   } else {
//     requestAnimationFrame(animate);
//   }
// }

// // События
// document.addEventListener('readystatechange', updateTarget);
// window.addEventListener('load', () => {
//   targetProgress = 100;
// });

// // Старт
// updateTarget();
// requestAnimationFrame(animate);