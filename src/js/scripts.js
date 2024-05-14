

$(document).ready(function(){
    
    $('.burger').on('click', function () {
        $(this).toggleClass('active');
        $('.header__overlay').toggleClass('active');
        $('.header__wrapper').toggleClass('active');
    });
    
    $('.masters__slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        adaptiveHeight: true,
        prevArrow: $('.masters__arrow.arr-prev'),
        nextArrow: $('.masters__arrow.arr-next'),
        appendDots: $('.masters__dots'),
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


});