$(document).ready(function() {
    // MOBILE BURGER MENU
    $('#sideMenu').on('click', function() {
      $('body').addClass('overflow-hidden');
      $('.header__nav').addClass('opened');
    });

    $('#closeSideMenu').on('click', function() {
      $('body').removeClass('overflow-hidden');
      $('.header__nav').removeClass('opened');
    });

    // HOVER DROPDOWN MENU
    $('.navbar__submenu').parent().on('mouseenter', function() {
      $('#header').css('background', 'rgba(255, 255, 255, 0.26)')
    });

    $('.navbar__submenu').parent().on('mouseleave', function() {
      $('.header').css('background', 'transparent');
    });

    // NEWS SECTION SLIDER
    if ($('.news__swiper').length) {
      let news_block = new Swiper('.news__swiper', {
        direction: 'horizontal',
        freeMode: true,
        slidesPerView: 1.212,
        spaceBetween: 20,
        breakpoints: {
          1024: {
             slidesPerView: 3
          },
        }
      });

      if ($(window).width() > 1259) {
        news_block.destroy();
      }
    }

});