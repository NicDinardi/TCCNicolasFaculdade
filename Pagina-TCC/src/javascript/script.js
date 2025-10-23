$(document).ready(function() {
    // Script para mudar a navbar para o botão mobile
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
                var headerHeight = $('header').outerHeight();
                targetPosition = $(hash).offset().top - headerHeight;
            }
            $('html, body').animate({
                scrollTop: targetPosition
            }, 800, function(){
                history.pushState(null, null, hash);
            });
        }
    });

    // Animações da NavBar (sombra e item ativo)
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

    // Animações ao scrollar (ScrollReveal)
    ScrollReveal().reveal('#cta', {
        origin: 'left', duration: 2000, distance: '20%', reset: true
    });

    ScrollReveal().reveal('#menu', {
        origin: 'left', duration: 2000, distance: '20%', reset: true
    });
    
    ScrollReveal().reveal('.about-image', {
        origin: 'left', duration: 2000, distance: '20%', reset: true
    });

    ScrollReveal().reveal('.about-content', {
        origin: 'right', duration: 2000, distance: '20%', reset: true
    });

    // Lógica dos Pop-ups (Modais)
    const serviceCards = $('.service-card');
    const closeButtons = $('.close-button');

    serviceCards.on('click', function() {
        const modalId = $(this).data('modal-target');
        $(modalId).addClass('active');
    });

    function closeModal(modal) {
        $(modal).removeClass('active');
    }

    closeButtons.on('click', function() {
        const modal = $(this).closest('.modal');
        closeModal(modal);
    });

    $('.modal').on('click', function(event) {
        if (event.target === this) {
            closeModal(this);
        }
    });
});