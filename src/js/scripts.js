$('.burger').on('click', function () {
    $(this).toggleClass('active');
    $('.header__overlay').toggleClass('active');
    $('.header__wrapper').toggleClass('active');
});