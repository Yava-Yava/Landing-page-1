$(document).ready(function () {

    var window_width = $(window).width();
    var window_height = $(window).height();
    var scroll_top;

    //висота першого вікна
    if(window_height < 700){
        $('#section-1').css('height', 700 + 'px');
    }else{
        $('#section-1').css('height', window_height);
    }

    //фіксація меню
    function fixed_menu(){
        scroll_top = $(window).scrollTop();
        window_width = $(window).width();
        if(scroll_top >= 35 || window_width < 768){
            $('header').css({
                'position':'fixed',
                'background':'rgb(73, 69, 68)',
                'margin-top':'0',
                'padding':'20px 0 15px',
                'border-bottom':'1px solid #fed136'
            })
        }else{
            $('header').css({
                'position':'absolute',
                'background':'none',
                'margin-top':'50px',
                'padding':'0',
                'border-bottom':'none'
            })
        }
    }

    //закриття меню при кліці на пункт меню в мобільній версії
    function collapse_menu () {
        window_width = $(window).width();
        if(window_width < 768){
            $('.menu ul li a').click(function () {
                $('.navbar-toggle').click();
            })
        }else{
            $('.menu ul li a').off('click');
        }
    }

    fixed_menu();
    collapse_menu();

    $(window).on('scroll', function () { //виклик функцій при скролінгу
        fixed_menu();
        parallax_main_img();
    });
    $(window).resize(function () { //виклик функцій при зміні ширини вікна
        fixed_menu();
        collapse_menu();
    });

    //плавна прокрутка до якоря
    $(function($){
        $(document).on('click', 'a[href^=#]', function () {
            $('html, body').animate({ scrollTop:  $('a[id="'+this.hash.slice(1)+'"]').offset().top }, 1000 );
            return false;
        });
    });

    //паралакс ефект для головного зображення
    function parallax_main_img () {
        if($('#section-1').innerHeight() > scroll_top){
            var offset_main_img = scroll_top / 10;
            $('.main-img').css('margin-top', -offset_main_img);
        }
    }

    //ініціалізація WOW плагіна
    var wow = new WOW(
        {
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       200,          // distance to the element when triggering the animation (default is 0)
            mobile:       true,       // trigger animations on mobile devices (default is true)
            live:         true,       // act on asynchronously loaded content (default is true)
            scrollContainer: null // optional scroll container selector, otherwise use window
        }
    );
    wow.init();

    //анімація для парних та непарних блоків about-us-div
    $('.about-us-div').filter(':even').addClass('slideInLeft');
    $('.about-us-div').filter(':odd').addClass('slideInRight');

    //анімація для for-ico img в SECTION-2
    $('.for-ico img').hover(function () {
        $(this).addClass('flip').addClass('animated');
    }, function () {
        $(this).removeClass('flip').remove('animated');
    });

    //відображення історій ABOUT US
    var showed_stories = 4;
    var limit_stories = 4;
    var about_us_image_wrap = $('.about-us-image-wrap');
    var count_about_us_image_wrap = about_us_image_wrap.length;

    if(count_about_us_image_wrap > limit_stories + 1){ //ховаємо історії, якщо їх більше 4
        for(i=limit_stories; i < count_about_us_image_wrap - 1 ; i++){
            $('#section-4 .row.relative').eq(i).hide();
        }
    }

    $('#next-about-us').click(function () { //при кліку на кнопці відображаємо наступні 4 історії
        showed_stories = showed_stories + 2;
        for(i=0; i < showed_stories;i++){
            $('#section-4 .row.relative').eq(i).slideDown(500);
            scroll_top = $(window).scrollTop();
            $('html, body').animate({ scrollTop:  scroll_top + 1}, 1 );
        }
        if(showed_stories >= count_about_us_image_wrap - 1){
            $(this).parent().parent().prev('.relative').find('.about-us-image-wrap').css('margin',' 0 auto');
            $(this).parent().parent().slideUp(500);
        }
    });


});