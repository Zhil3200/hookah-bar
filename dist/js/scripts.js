$(document).ready(function () {

    const header = $('.header'),
        burger =  $('.burger'),
        overlay = $('.header__overlay'),
        headerWrapper = $('.header__wrapper'),
        form = $('.order__form');

    function headerWrapperClose () {
        burger.removeClass('active');
        overlay.removeClass('active');
        headerWrapper.removeClass('active');
        $(document.body).removeClass('no-scroll');
    }

    burger.on('click', function () {
        $(this).toggleClass('active');
        overlay.toggleClass('active');
        headerWrapper.toggleClass('active');
        $(document.body).toggleClass('no-scroll');

        $('.header__menu-link').on('click', function () {
            headerWrapperClose ();
        });

        overlay.on('click', function (e) {
            if ($(e.target).is($(this))) {
                headerWrapperClose ();
            }
        });
    });

    function slider(item, dots, arrPrev, arrNext) {
        $(item).slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            adaptiveHeight: true,
            prevArrow: $(arrPrev),
            nextArrow: $(arrNext),
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

    slider('.masters .slider', '.masters .slider-actions-dots', '.masters .arr-prev', '.masters .arr-next');
    slider('.discounts .slider', '.discounts .slider-actions-dots', '.discounts .arr-prev', '.discounts .arr-next');

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

    $(window).scroll(function () {
        if ($(window).scrollTop()> 350) {
            header.addClass('header__sticky');
        } else {
            header.removeClass('header__sticky');
        }
    });

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    new WOW(
        {offset:200,
        animateClass: 'animate__animated'}
    ).init();


    form.submit(function (e) {
        e.preventDefault();
        let hasError = false;

        form.find('input').css('border-color', 'var(--color-accent)');

        form.find('input').each(function () {
            if (!$(this).val()) {
                $(this).css('border-color', 'var(--color-error)');
                $(this).next().show();
                hasError = true;
            } else {
                $(this).next().hide();
                $(this).css('border-color', 'var(--color-accent)');
            }
        });

        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {name: form.find('[name=name]').val(), phone: form.find('[name=phone]').val()}
            }).done(function (msg) {
                if (msg.success) {
                    form.trigger('reset');
                    form.hide();
                    form.prev().hide();
                    form.next().fadeIn();
                    setTimeout(function (){
                        form.next().hide();
                        form.prev().fadeIn();
                        form.fadeIn();
                    }, 5000);
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                }
            });
        }
    });
});