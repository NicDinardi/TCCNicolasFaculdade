//script para mudar a navbar para o botão mobile

$(document).ready(function() {
   $('#mobile_btn').on('click', function(){
      $('#mobile_menu').toggleClass('active');
      $('#mobile_btn').find('i').toggleClass('fa-x');
   }); 


   //Animaçoes da NavBar
   
   const sections = $('section');
   const navItems = $('.nav-item');

   $(window).on('scroll', function() {
      const header = $('header');
      const scrollPos = $(window).scrollTop() - header.outerHeight();

      let activeSecIndex = 0;

      if(scrollPos <= 0) {
         header.css('box-shadow', 'none');
      }
      else {
         header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1');
      }

      sections.each(function(i) {
         const section = $(this);
         const sectionTop = section.offset().top - 96;
         const sectionBot = sectionTop+ section.outerHeight();

         if(scrollPos >= sectionTop && scrollPos < sectionBot) {
            activeSecIndex = i;
            return false;
         }
      })

      navItems.removeClass('active');
      $(navItems[activeSecIndex]).addClass('active');

   })

   // Aqui comoça o script das animaçoes ao scrollar 

   ScrollReveal().reveal('#cta', {
      origin: 'left', duration: 2000, distance: '20%', reset: true
   })

   ScrollReveal().reveal('#serv', {
      origin: 'left', duration: 2000, distance: '20%', reset: true
   })
   

})