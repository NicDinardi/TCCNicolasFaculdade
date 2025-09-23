$(document).ready(function() {
    //script para mudar a navbar para o botão mobile
    $('#mobile_btn').on('click', function(){
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    }); 

    // Scroll Suave
    $('#nav_list a[href^="#"], #mobile_nav_list a[href^="#"]').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            var targetPosition;

            if (hash === '#home') {
                targetPosition = 0;
            } else {
                targetPosition = $(hash).offset().top;
            }

            $('html, body').animate({
                scrollTop: targetPosition
            }, 800, function(){
                history.pushState(null, null, hash);
            });
        }
    });


    //Animações da NavBar
    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function() {
        const header = $('header');
        const scrollPos = $(window).scrollTop();

        if(scrollPos <= 10) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - header.outerHeight();
            const sectionBot = sectionTop + section.outerHeight();

            if(scrollPos >= sectionTop && scrollPos < sectionBot) {
                navItems.removeClass('active');
                $(navItems[i]).addClass('active');
                return false; 
            }
        });
    });

    // Aqui começa o script das animações ao scrollar 
    ScrollReveal().reveal('#cta', {
        origin: 'left', duration: 2000, distance: '20%', reset: true
    });

    ScrollReveal().reveal('#menu', {
        origin: 'left', duration: 2000, distance: '20%', reset: true
    });
});