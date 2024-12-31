jQuery(function($) {

  // Blog Categories
  var blogCategories = $(".blog-category-list").html();
  $(".blogCategories").append(blogCategories);

  // Hide Arrows If Amount of Categories Doesn't Overflow
  var totalCategoryCombinedWidth = 0;
  var totalVisibleWidth = 825;
  $('.blog-category-list a').each(function(index) {
    totalCategoryCombinedWidth += parseInt($(this).outerWidth(true), 10);
  });
  
  if (totalCategoryCombinedWidth > totalVisibleWidth) {
    $(".leftArrow, .rightArrow").css("display", "flex");
	$(".blogCategories").css("margin-left", "50px");
	$(".blogCategories").css("margin-right", "50px");
  }
  
  // Blog Category Left Arrow Animate and Detect When It Has a CSS Style of 50px
  $(".fa-chevron-left").on("click", function() {
    if($('.blogCategories').css('margin-left') == '50px' ) {
      $(".fa-chevron-left").click(false);
    } 
    else {
     event.preventDefault();
      $('.blogCategories').animate({
        marginLeft: "+=50px"
      }, "fast");
    }
  });
  
  // Blog Category Right Arrow Animate and Detect When The End of the Cateogories is Reached
  $('.fa-chevron-right').click(function() {
    var $elem=$('.blogCategories');
    var newScrollLeft = $elem.scrollLeft(),
    width=$elem.outerWidth(true),
	widthNew=width+100,
    scrollWidth=$elem.get(0).scrollWidth;
    if (scrollWidth-newScrollLeft==widthNew) {
      $(".fa-chevron-right").click(false);
    }
    else {
      event.preventDefault();
      $('.blogCategories').animate({
        marginLeft: "-=50px"
      }, "fast");
    }
  });
  
  // First Blog Post Label
  $(".wsite-blog-index .blog-post:nth-child(1)").append('<div class="postOneLabel">Just In</div>');
  
  // Second Blog Post Label
  $(".wsite-blog-index .blog-post:nth-child(6)").append('<div class="postOneLabel">More News</div>');

  // Blog Homepage Exclusives
  var url = window.location.href;
  if (url.indexOf("category") < 0 && url.indexOf("archives") < 0 && url.indexOf("previous") < 0) {
    $(".postOneLabel").fadeIn();
  }
  if (url.indexOf("category/all") > 0) {
    $(".postOneLabel").fadeIn();
  }
  
  // Sticky Navigation
  var navStick = $('#nav').offset().top;
  $(window).scroll(function() {
    var scrollPos = $(document).scrollTop();
	if (scrollPos >= navStick) {
	  $('#nav, #nav .container, #wrapper').addClass('sticky');
	} 
	else if (scrollPos < navStick) {
	  $('#nav, #nav .container, #wrapper').removeClass('sticky');
	}
  });
  
  // Scroll To Top Button
  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 1) {
      $(".scroll").removeClass("animated zoomOut");
      $(".scroll").css('display', 'flex');
      $(".scroll").addClass("animated zoomIn");
    } 
	else {
      $(".scroll").removeClass("animated zoomIn");
      $(".scroll").addClass("animated zoomOut");
    }
  });

  $(".scroll, .search").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  // Blog Date Format
  $(".blog-post").each(function() {
    var postDate = $(this).find(".blog-date .date-text").text();
    var monthSplit = postDate.split('/').slice(0,1).join('/');
    var daySplit = postDate.split("/")[1];
    var yearSplit = postDate.split("/")[2];
    var thisPost = $(this).find(".blog-date"); 
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep", "Oct", "Nov", "Dec"]; 
    $(this).find(".blog-date .date-text").html(months[parseInt(monthSplit)-1] + " " + daySplit + ", " + yearSplit)
  });

  // Grab Blog Post First Image Regardless of Location
  $(".wsite-blog-index .blog-post").each(function() {
    $(this).find(".wsite-image").first().parent().addClass("firstImage");
	var titleLink = $(this).find(".blog-title a").attr("href");
    $(this).find(".firstImage a").attr("href", titleLink);
	
	$(".firstImage").parent().parent().parent().parent().parent().parent().parent().addClass("firstColumn");
  });
  
  $(".wsite-blog-index .blog-post").each(function() {
    var firstParagraph = $(this).find(".paragraph").clone();
	$(this).find(".blog-header").append(firstParagraph);
  });

  // Home Icon
  var homeURL = window.location.origin;
  $(".home-icon").attr("href", homeURL);

  // Breadcrumbs
  var pathname = window.location.pathname;
  var hyphenRemove = pathname.replace(/\-/g, ' ');
  var arr = hyphenRemove.split('/');
  
  $(".crumb-line-1").html(arr[1]);
  var slashRemove = (pathname.split('/').slice(0,2).join('/'));
  $('.crumb-line-1').attr('href', slashRemove);
  
  $(".crumb-line-2").html(arr[2]);

  // Add class to nav items with subnav
  $('.wsite-menu-default').find('li.wsite-menu-item-wrap, li.wsite-menu-subitem-wrap').each(function(){
    var $me = $(this);

    if($me.children('.wsite-menu-wrap, .wsite-menu-subitem-wrap').length > 0) {
      $me.addClass('has-submenu');
      $('<span class="icon-caret"></span>').insertAfter($me.children('a.wsite-menu-item, a.wsite-menu-subitem'));
    }
  });
  
  // Subnav toggle
  $('li.has-submenu span.icon-caret').on('click', function() {
    var $me = $(this);

    if($me.siblings('.wsite-menu-wrap').hasClass('open')) {
      $me.siblings('.wsite-menu-wrap').removeClass('open');
    } else {
       $me.siblings('.wsite-menu-wrap').addClass('open');
    }
  });
  
  // Check your elements
  $.fn.checkNavPositioning = function($el, $nav, scrollClass) {
    var navHeight = $nav.outerHeight();

    if(((this.outerHeight() - $(window).scrollTop()) < $nav.outerHeight()) && !$el.hasClass(scrollClass)) {
      $el.addClass(scrollClass);
      $el.css('padding-top', navHeight);
    } else if((this.outerHeight() >= $(window).scrollTop()) && $el.hasClass(scrollClass)) {
      $el.removeClass(scrollClass);
      $el.css('padding-top', 0);
    }
  }
  
  // Hamburger Transition
  $('#menu-button').on('click', function(){
    $('#mobile-nav').toggleClass('slide');
    $('#menu-button span').toggleClass('fade');
    $('#menu-button').toggleClass('rotate');
  });
  
  // Mobile Navigation Sub Navigation Toggle
  $('li.has-submenu span.icon-caret').on('click', function() {
    var $me = $(this);

    if($me.siblings('.wsite-menu-wrap').is(':visible')) {
      $me.siblings('.wsite-menu-wrap').slideToggle(300);
    } else {
       $me.siblings('.wsite-menu-wrap').slideToggle(300);
    }
  });
  
  $(".icon-caret").on("click", function() {
    $(this).toggleClass("rotate");
  });

  // Define Theme specific functions
  var Theme = {
    // Swiping mobile galleries wwith Hammer.js
    swipeGallery: function() {
      setTimeout(function() {
        var touchGallery = document.getElementsByClassName("fancybox-wrap")[0];
        var mc = new Hammer(touchGallery);
        mc.on("panleft panright", function(ev) {
          if (ev.type == "panleft") {
            $("a.fancybox-next").trigger("click");
          } else if (ev.type == "panright") {
            $("a.fancybox-prev").trigger("click");
          }
          Theme.swipeGallery();
        });
      }, 500);
    },
    swipeInit: function() {
      if ('ontouchstart' in window) {
        $("body").on("click", "a.w-fancybox", function() {
          Theme.swipeGallery();
        });
      }
    },
    hideCart: function(){
      $('#banner, #main, #footer').on('click', function () {
          $('#wsite-mini-cart').fadeOut("fast");
      });
    }
  }

  $(document).ready(function() {
    Theme.swipeInit();
    Theme.hideCart();
  });

});
