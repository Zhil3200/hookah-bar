

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

    (function($){				
        jQuery.fn.carteTabs = function(options){
            
            var createTabs = function(){
                tabs = this;
                i = 0;
                
                showPage = function(i){
                    $(tabs).children("div").children("div").hide();
                    $(tabs).children("div").children("div").eq(i).show();
                    $(tabs).children("ul").children("li").removeClass("active");
                    $(tabs).children("ul").children("li").eq(i).addClass("active");
                }
                
                showPage(0);				
                
                $(tabs).children("ul").children("li").each(function(index, element){
                    $(element).attr("data-page", i);
                    i++;                        
                });
                
                $(tabs).children("ul").children("li").click(function(){
                    showPage(parseInt($(this).attr("data-page")));
                });				
            };		
            return this.each(createTabs);
        };	
    })(jQuery);
    $(document).ready(function(){
        $(".carte__tabs").carteTabs();
    });


});