$(document).ready(function () {

    $('.burger').on('click', function () {
        $(this).toggleClass('active');
        $('.header__overlay').toggleClass('active');
        $('.header__wrapper').toggleClass('active');
    });

    function slider(item, dots) {
        $(item).slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            adaptiveHeight: true,
            prevArrow: $('.slider-actions__arrow.arr-prev'),
            nextArrow: $('.slider-actions__arrow.arr-next'),
            appendDots: $(dots),
            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        dots: true,
                        slidesToShow: 1
                    }
                }
            ]

        });
    };

    slider('.masters .slider', '.masters .slider-actions-dots');
    slider('.discounts .slider', '.discounts .slider-actions-dots');

    $(window).on('resize', function(e){
        let initLib = $('.gallery__items').data('init-slider');
      
        if(window.innerWidth < 576){
          if(initLib != 1){
            $('.gallery__items').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2500,
                dots: true,
                arrows: false,
                appendDots: $('.gallery .slider-actions-dots'),
            }).data({'init-slider': 1});
          }
        } else {
          if(initLib == 1){
            $('.gallery__items').slick('unslick').data({'init-slider': 0});
          }
        }

      }).trigger('resize');


    (function ($) {
        jQuery.fn.carteTabs = function (options) {

            var createTabs = function () {
                tabs = this;
                i = 0;

                showPage = function (i) {
                    $(tabs).children("div").children("div").hide();
                    $(tabs).children("div").children("div").eq(i).show();
                    $(tabs).children("ul").children("li").removeClass("active");
                    $(tabs).children("ul").children("li").eq(i).addClass("active");
                }

                showPage(0);

                $(tabs).children("ul").children("li").each(function (index, element) {
                    $(element).attr("data-page", i);
                    i++;
                });

                $(tabs).children("ul").children("li").click(function () {
                    showPage(parseInt($(this).attr("data-page")));
                });
            };
            return this.each(createTabs);
        };
    })(jQuery);
    
    $(".carte__tabs").carteTabs();
    
    $('.gallery__items').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-with-zoom',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title');
			}
		},
        zoom: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out',
            opener: function(openerElement) {
              return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
          }
	});


});