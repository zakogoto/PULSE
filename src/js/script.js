// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1200,
//         // adaptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"><img src="img/icon/left_arrow.svg"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="img/icon/right_arrow.svg"></button>',
//         responsive: [
//             {
//                 breakpoint: 992,
//                 settings: {
//                     autoplay: true,
//                     dots: true,
//                     arrows: false
//                 }
//             },
//         ]
// //     });

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 1,
    gutter: 0,
    adaptiveHeight: true,
    controls: false,
    autoplay: false,
    loop: true,
    speed: 1200,
    responsive: {
        320: {
            nav: true,
            touch: true
        },
        
        576: {
            nav: true
        },

        768: {
            nav: false 
        }
    } 
});

document.querySelector('.prev').onclick = function () {
    slider.goTo('prev');
};

document.querySelector('.next').onclick = function () {
    slider.goTo('next');
};
    
$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    
$('.catalog-item__link').each(function(i) {
    $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    });
});

$('.catalog-item__back').each(function(i) {
    $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    });
});

// Modal

$('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');  
});

$('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
});

$(document).keydown(function(e) {        
    if (e.keyCode == 27) {
        $('.overlay, #consultation, #order, #thanks').close();
    }
});

// $('.overlay').on('click', function() {
//     $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
// });

$('.button_mini').each(function(i) {
    $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
    })
});

function validateForm(form) {
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phone: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Пожалуйста, введите ваше имя",
                minlength: jQuery.validator.format("Имя должно содержать не менее {0} символов")
            },
            phone: {
                required: "Пожалуйста, ведите ваш телефон"
            },
            email: {
                required: "Пожалуйста, введи почту",
                email: "Пожалуйста, введите корректный адрес"
            }
        }
    })
}
validateForm('#consultation-form');
validateForm('#consultation form');
validateForm('#order form')

$('input[name=phone]').mask("+7(999)999-99-99");

$("form").submit(function(e) {
    e.preventDefault();

    if (!$(this).valid()) {
        return;
    };

    $.ajax({
        type: "POST",
        url: "../mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn();

        $('form').trigger('reset');
    });
    return false;
})

// smoth scroll and pageUp

$(window).scroll(function(){
    if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
})
$("a[href=#up], a[href=#catalog]").click(function() {
    const _href = $(this).attr("href");
    $('html, body').animate({scrollTop: $(_href).offset().top+"px"});
    return false;
})

new WOW().init();