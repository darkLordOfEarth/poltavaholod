$(function () {
  // var windowWidth = window.innerWidth;
  // var windowHeight = window.innerHeight;
  // alert('width:' + windowWidth + ' ' + 'height:' + windowHeight);

  function checkHeaderScroll() {
    if ($(window).scrollTop() > 50) {
      $('header').addClass('scrolled');
    } else {
      $('header').removeClass('scrolled');
    }
    let mainHeight = $('.main').outerHeight();
    if ($(window).scrollTop() > 0) {
      $('.main__group-btns').addClass('scrolled');
    } else {
      $('.main__group-btns').removeClass('scrolled');
    }
  }

  $(window).on('scroll', checkHeaderScroll);
  $(window).on('load', checkHeaderScroll);

  $('.product__info-desc__btn')
    .off('click')
    .on('click', function () {
      const $btn = $(this);
      const $desc = $btn.parent().find('.product__info-desc');

      $desc.slideToggle(300, function () {
        // По окончании анимации
        const isOpen = $desc.hasClass('open');

        if (isOpen) {
          $btn.text('Читати опис');
          $desc.removeClass('open');
        } else {
          $desc.addClass('open');
          $btn.text('Сховати опис');
        }

        // ❗ Пересчитать высоту после изменения
        $('.projectAuditExpertise__slider').trigger('refresh.owl.carousel');
      });
    });

  // const headerHeight = $('.header').outerHeight();

  // $('a[href^="#"]').on('click', function (e) {
  //   e.preventDefault();

  //   const target = $($.attr(this, 'href'));

  //   if (target.length) {
  //     $('html, body').animate(
  //       {
  //         scrollTop: target.offset().top - headerHeight + 50,
  //       },
  //       200,
  //     );
  //   }
  // });

  $('.main-navigation a').each(function () {
    const $link = $(this);
    const href = $link.attr('href');

    // если это якорь
    if (href && href.startsWith('#')) {
      const text = $link.text();
      const classes = $link.attr('class') || '';

      const $button = $('<button>', {
        type: 'button',
        class: classes + ' menu-anchor-btn',
        text: text,
        'data-target': href,
      });

      $link.replaceWith($button);
    }
  });

  const headerHeight = $('.header').outerHeight();
  // обработчик клика по якорям

  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();

    const target = $($.attr(this, 'href'));

    if (target.length) {
      const targetPosition = target.offset().top - headerHeight + 50;

      $('html, body').animate(
        {
          scrollTop: targetPosition,
        },
        300, // Увеличил немного время
        'swing', // Или 'linear' для равномерной скорости
      );
    }
  });

  $(document).on('click', '.menu-anchor-btn', function () {
    const target = $(this).data('target');
    if ($(target).length) {
      $('html, body').animate(
        {
          scrollTop: $(target).offset().top,
        },
        300,
        'swing',
      );
    }
  });

  $('.toggle-password')
    .css('cursor', 'pointer')
    .on('click', function () {
      const $icon = $(this);
      const $input = $icon.siblings('input');

      const showIcon = $icon.data('show');
      const hideIcon = $icon.data('hide');

      if ($input.attr('type') === 'password') {
        $input.attr('type', 'text');
        $icon.attr('src', showIcon).attr('alt', 'Сховати пароль');
      } else {
        $input.attr('type', 'password');
        $icon.attr('src', hideIcon).attr('alt', 'Показати пароль');
      }
    });

  let mouseDownTarget = null;

  // Запоминаем где был mousedown
  $(document).on('mousedown', function (e) {
    mouseDownTarget = e.target;
  });

  // Закрываем только если и mousedown и mouseup были вне popup__inner
  $(document).on('mouseup', function (e) {
    const $popupInner = $('.popup__inner');

    // Проверяем: mousedown и mouseup оба снаружи popup__inner
    const isMouseDownOutside = !$(mouseDownTarget).closest('.popup__inner').length;
    const isMouseUpOutside = !$(e.target).closest('.popup__inner').length;

    if (isMouseDownOutside && isMouseUpOutside) {
      $('.popup').fadeOut();
    }

    mouseDownTarget = null;
  });
});
