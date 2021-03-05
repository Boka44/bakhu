(function($) {
  
  "use strict";

  // Sticky Nav
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 200) {
            $('.scrolling-navbar').addClass('top-nav-collapse');
        } else {
            $('.scrolling-navbar').removeClass('top-nav-collapse');
        }
    });

    /* 
   One Page Navigation & wow js
   ========================================================================== */
    //Initiat WOW JS
    new WOW().init();


    // one page navigation 
    $('.main-navigation').onePageNav({
            currentClass: 'active'
    }); 

    $(window).on('load', function() {
       
        $('body').scrollspy({
            target: '.navbar-collapse',
            offset: 195
        });

        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 200) {
                $('.fixed-top').addClass('menu-bg');
            } else {
                $('.fixed-top').removeClass('menu-bg');
            }
        });

    });

    // Slick Nav 
    $('.mobile-menu').slicknav({
      prependTo: '.navbar-header',
      parentTag: 'span',
      allowParentLinks: true,
      duplicate: false,
      label: '',
    });


/* 
   CounterUp
   ========================================================================== */
    $('.counter').counterUp({
      time: 1000
    });

/* 
   MixitUp
   ========================================================================== */
  $('#portfolio').mixItUp();

/* 
   Touch Owl Carousel
   ========================================================================== */
    var owl = $(".touch-slider");
    owl.owlCarousel({
      navigation: false,
      pagination: true,
      slideSpeed: 1000,
      stopOnHover: true,
      autoPlay: true,
      items: 2,
      itemsDesktop : [1199,2],
      itemsDesktopSmall: [1024, 2],
      itemsTablet: [600, 1],
      itemsMobile: [479, 1]
    });

    $('.touch-slider').find('.owl-prev').html('<i class="fa fa-chevron-left"></i>');
    $('.touch-slider').find('.owl-next').html('<i class="fa fa-chevron-right"></i>');

/* 
   Sticky Nav
   ========================================================================== */
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 200) {
            $('.header-top-area').addClass('menu-bg');
        } else {
            $('.header-top-area').removeClass('menu-bg');
        }
    });

/* 
   VIDEO POP-UP
   ========================================================================== */
    $('.video-popup').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
    });


  /* 
   SMOOTH SCROLL
   ========================================================================== */
    var scrollAnimationTime = 1200,
        scrollAnimation = 'easeInOutExpo';

    $('a.scrollto').on('bind', 'click.smoothscroll', function (event) {
        event.preventDefault();
        var target = this.hash;
        
        $('html, body').stop().animate({
            'scrollTop': $(target).offset().top
        }, scrollAnimationTime, scrollAnimation, function () {
            window.location.hash = target;
        });
    });

/* 
   Back Top Link
   ========================================================================== */
    var offset = 200;
    var duration = 500;
    $(window).scroll(function() {
      if ($(this).scrollTop() > offset) {
        $('.back-to-top').fadeIn(400);
      } else {
        $('.back-to-top').fadeOut(400);
      }
    });

    $('.back-to-top').on('click',function(event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 600);
      return false;
    })

/* Nivo Lightbox
  ========================================================*/   
   $('.lightbox').nivoLightbox({
    effect: 'fadeScale',
    keyboardNav: true,
  });


/* stellar js
  ========================================================*/
  $.stellar({
    horizontalScrolling: true,
    verticalOffset: 40,
    responsive: true
  });

/* 
   Page Loader
   ========================================================================== */
  $('#loader').fadeOut();


/*
   Press Release
   ========================================================================== */

   function constructBlogItem(date, title, link, isLast) {
     let parent = $('#blog-container');
     let dateElement = "<div class='blogDate'>" + date + "</div>";
     let titleElement = "<a class='blogTitle' href='" + link + "' target='_blank'>" + title + "</a>";
     let child = "<div class='blogItem col-sm-12'>" + dateElement + titleElement + "</div>";
     if(!isLast) {
       child += "<hr class='hrBlog col-sm-12'>";
     };
     parent.append(child);
   };

  let pressArray = [
    {
      date: "June 14, 2019",
      title: "Bakhu Holdings News Release",
      link: "https://vibraphone-oriole-3498.squarespace.com/s/Bakhu-News-Release-06142019.docx"
    },
    {
      date: "April 30, 2019",
      title: "Bakhu Holdings 10Q-Quarter ended",
      link: "https://vibraphone-oriole-3498.squarespace.com/s/Bakhu-10Q-Quarter-ended-4302019.pdf"
    },
    {
      date: "January 31, 2019",
      title: "Bakhu Holdings 10Q",
      link: "https://vibraphone-oriole-3498.squarespace.com/s/Bakhu-Holdings-10Q.pdf"
    },
    {
      date: "July 31, 2018",
      title: "Bakhu Holding 10K-Year ended",
      link: "https://vibraphone-oriole-3498.squarespace.com/s/Bakhu-10K.pdf"
    },
    {
      date: "April 30, 2018",
      title: "Bakhu Holdings 10Q-Quarter ended",
      link: "https://vibraphone-oriole-3498.squarespace.com/s/Bakhu-10Q.pdf"
    },
    {
      date: "December 28, 2018",
      title: "Bakhu Holdings 8k",
      link: "https://vibraphone-oriole-3498.squarespace.com/s/BKUH-8-K-SEC-filing-12-27-2018.pdf"
    },
    {
      date: "December 28, 2018",
      title: "Bakhu Holdings News Release",
      link: "https://vibraphone-oriole-3498.squarespace.com/s/Bakhu-News-Release"
    }
  ];

  pressArray.forEach((e, i) => {
    // account for overflow, and create pagination
    var isLast;
    pressArray.length == i + 1 ? isLast = true : isLast = false;
    constructBlogItem(e.date, e.title, e.link, isLast);
  });

}(jQuery));

