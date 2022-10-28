$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/icon/left_arrow.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icon/right_arrow.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                  dots: true,
                  arrows: false
                }
            },
        ]
    });
});