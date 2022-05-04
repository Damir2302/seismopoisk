$(document).ready(function() {
    // INIT WOW.JS
    new WOW().init();

    // MOBILE BURGER MENU
    $('#sideMenu').on('click', function() {
      $('body').addClass('overflow-hidden');
      $('.header__nav').addClass('opened');
    });

    $('#closeSideMenu').on('click', function() {
      $('body').removeClass('overflow-hidden');
      $('.header__nav').removeClass('opened');
    });

    $('html').click(function(e) {
      if (!$(e.target).closest('.header__nav.opened').length && !$(e.target).closest('#sideMenu').length) {
          $('body').removeClass('overflow-hidden');
          $('.header__nav.opened').removeClass('opened');
        }
    });

    // HOVER DROPDOWN MENU
    if ($(window).width() > 1259) {
      $('.navbar__submenu').parent().on('mouseenter', function() {
        $('#header').css('background', 'rgba(255, 255, 255, 0.26)')
      });

      $('.navbar__submenu').parent().on('mouseleave', function() {
        $('.header').css('background', 'transparent');
      });
    }

    // SHOW SEARCH INPUT
    $('#searchInput').on('click', function(e) {
      e.preventDefault();
      $(this).addClass('hide-search-btn');
      $('#searchBtn').removeClass('hide-search-btn');
      $('.header-search-input').addClass('active');
    });

    $('#searchBtn').on('click', function(e) {
      if (!$('#input-search').val().length) {
        e.preventDefault();
        $('#searchInput').removeClass('hide-search-btn');
        $(this).addClass('hide-search-btn');
        $('#input-search').removeClass('active');
      }
    });

    $('html').click(function(e) {
      if (!$(e.target).closest('.header-search-form').length) {
          $('#searchInput').removeClass('hide-search-btn');
          $('#searchBtn').addClass('hide-search-btn');
          $('#input-search').removeClass('active');
        }
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

          1200: {
            slidesPerView: 2.122,
            spaceBetween: 20,
          },

          1400: {
            slidesPerView: 2.122,
            spaceBetween: 24,
          }

        },

        navigation: {
          nextEl: '.swiper-arrow-next',
          prevEl: '.swiper-arrow-prev',
        }

      });
    }

    // CAREER PAGE SLIDER
    if ($('.career-works__swiper').length) {
      let news_block = new Swiper('.career-works__swiper', {
        direction: 'horizontal',
        freeMode: true,
        slidesPerView: 1.288,
        spaceBetween: 20,

        breakpoints: {

          768: {
            slidesPerView: 1.67,
            spaceBetween: 30,
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

    // VACANCIES PAGE SWIPER MOBILE
    if ($('.vacancies-list__swiper').length && $(window).width() < 1024) {
      let news_block = new Swiper('.vacancies-list__swiper', {
        direction: 'horizontal',
        freeMode: true,
        slidesPerView: 'auto'
      });

      if ($(window).width() > 1023) {
        news_block.destroy();
      }
    }

    // VACANCIES PAGE FORM
    $('#fileUpload').on('change', function() {
      if ($(this).val().length) {
        let fileName = $('#fileUpload').val().split("\\");
        $('#fileUploadLabel').html(fileName[fileName.length - 1]);
      }
    });

    $('#successClose').on('click', function() {
      $('.success-modal').remove();
    });

    $('html').on('click', function() {
      if (!$(this).closest('.success-container')) {
        $('.success-modal').remove();
      };
    })

    // VACANCIES PAGE PRACTICE FORM
    $('.input-date input').on('mouseout', function() {
      if ($(this).val().length == 0) {
        $(this).attr('type', 'text');
        $(this).blur();
      }
    });

    $('input[type="tel"]').inputmask({"mask": "+7 (999) 99-99-99"});

});