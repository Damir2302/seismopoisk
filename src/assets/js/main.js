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
        slidesPerView: 1.288,
        spaceBetween: 20,

        breakpoints: {

          768: {
            slidesPerView: 2.618,
            spaceBetween: 15,
          },

          1260: {
            slidesPerView: 2.122,
            spaceBetween: 20,
          }

        },

        navigation: {
          nextEl: '.swiper-arrow-next',
          prevEl: '.swiper-arrow-prev',
        }

      });
    }

});