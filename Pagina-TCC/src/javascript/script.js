$(document).ready(function() {
    
    $('#mobile_btn').on('click', function(){
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    }); 

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

    ScrollReveal().reveal('#faq', {
        origin: 'left', duration: 2000, distance: '20%', reset: true
    });

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

    $('.faq-question').on('click', function() {
        var $item = $(this).closest('.faq-item');
        $item.toggleClass('active');
        $item.find('.faq-answer').slideToggle(300);
    });
    
    

    
    const SUPABASE_URL = 'https://qmnibfnhfbaojdqlqsxb.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtbmliZm5oZmJhb2pkcWxxc3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NjY2OTAsImV4cCI6MjA3NzI0MjY5MH0.yMFZb02zm2XMrSHteUKEmag5sz8kSdkq-UFDOLrnXVo';

    const { createClient } = supabase;
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    const $aboutWrapper = $('.about-swiper .swiper-wrapper');
    const $aboutSwiperEl = $('.about-swiper');
    const $aboutLoadingText = $('.about-loading');
    
    if ($aboutSwiperEl.length > 0) {
        $aboutSwiperEl.addClass('loading');
    
        async function loadAboutCarousel() {
            try {
                const { data, error } = await supabaseClient
                    .from('portfolio')
                    .select('image_url');
                    
                if (error) {
                    throw error;
                }
                
                if (data && data.length > 0) {
                    let slidesHtml = '';
                    data.forEach(item => {
                        slidesHtml += `
                            <div class="swiper-slide">
                                <img src="${item.image_url}" alt="Foto do Ateliê">
                            </div>
                        `;
                    });
                    
                    $aboutWrapper.html(slidesHtml);
                    $aboutLoadingText.addClass('loaded');
                    $aboutSwiperEl.removeClass('loading');
                    
                    const aboutSwiper = new Swiper('.about-swiper', {
                        direction: 'horizontal',
                        loop: true,
                        autoplay: {
                            delay: 4000,
                            disableOnInteraction: false,
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    });
                    
                } else {
                     $aboutLoadingText.text('Nenhuma foto encontrada.');
                }
                
            } catch (error) {
                console.error('Erro ao carregar carrossel:', error.message);
                $aboutLoadingText.text('Erro ao carregar fotos.');
                $aboutLoadingText.css('color', 'red');
            }
        }
        
        loadAboutCarousel();
    }
    
});