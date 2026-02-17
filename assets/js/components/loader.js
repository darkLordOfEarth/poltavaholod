// Показываем нужное лого в зависимости от языка
let currentLang = $('html').attr('lang');
console.log(currentLang);
if (currentLang == 'uk') {
  $('.logo_loader_ua').show();
} else if (currentLang == 'ru-RU') {
  $('.logo_loader_ru').show();
}

function animateProgress(fillElement, svgWidth, startProgress = 0) {
  let progress = startProgress;

  function animateToTarget(target, onComplete) {
    function step() {
      progress += (target - progress) * 0.2;

      if (Math.abs(target - progress) < 1) {
        progress = target;
        fillElement.setAttribute('width', (svgWidth * progress) / 100);
        if (onComplete) onComplete();
        return;
      }

      fillElement.setAttribute('width', (svgWidth * progress) / 100);
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
}

// Для украинской версии
const fill_ua = document.getElementById('logoProgressFill');
animateProgress(fill_ua, 240);

// Для русской версии (если у тебя второй SVG и другой rect)
const fill_ru = document.getElementById('logoProgressFill_ru'); // поменяй на правильный id второго rect
animateProgress(fill_ru, 240);
