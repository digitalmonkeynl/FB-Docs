// MR MILES SWITCH

// function explode(){
//  $( ".mrmiles" ).remove();
//  $( ".noshow" ).fadeIn("fast");
//  fbvideo.play(); 
// }
// setTimeout(explode, 8000);

// Video

function playPause() { 
	if (fbvideo.paused) 
		fbvideo.play(); 
	else 
		fbvideo.pause(); 
}

function pauseVideo() { 
	fbvideo.pause(); 
}

function playVideo() { 
	fbvideo.play(); 
}

function getfocusSearch() {
	document.getElementById("main-search").focus();
}


// Private Sales

$(".fbps-filter-btn").click(function() {
	$('#' + $(this).data('target')).slideToggle("fast");
	$(this).toggleClass('fbps-filter-btn--checked');
});

// BUY MILES
$(".fb-button-buymiles").click(function() {
	$('.ux-content').hide(0);
	$('#' + $(this).data('target')).slideToggle("fast");

	$(".fb-button-buymiles").removeClass('fb-button-buymiles--active');
	$(this).toggleClass('fb-button-buymiles--active');

	$('html, body').animate(
		{scrollTop: $(this).offset().top},
		{
			duration: 500, // how fast we are animating
			easing: 'easeInOutCubic' // the type of easing
		}
	);
});
$(".fb-btn-close").click(function() {
	$(".fb-button-buymiles").removeClass('fb-button-buymiles--active');
	$(this).closest(".ux-content").slideToggle("fast");
	// console.log($(this).closest(".ux-content")());
});

// Toggle Edit Fields
$(".my-account-summary-edit").click(function() {
	$('#' + $(this).data('level') + '-edit').show();
	$('#' + $(this).data('level') + '-view').hide();
});

$(".my-account-summary-cancel").click(function() {

	$('#' + $(this).data('level') + '-edit').hide();
	$('#' + $(this).data('level') + '-view').show();
	return false;
	// event.preventDefault();
});

// SCROLL TO

$(".scroll-to").click(function() {
	
	$('html, body').animate(
		{scrollTop: $('.' + $(this).data('level')).offset().top},
		{
			duration: 1000, // how fast we are animating
			easing: 'easeInOutCubic' // the type of easing
		}
		);
});

// Contrast
$('.hdr-switch--normal').click(function()
{
	$("html").removeClass('g-page-contrast-boy g-page-contrast-bow g-page-contrast-yob');
});
$('.hdr-switch--BOW').click(function()
{
	$("html").removeClass('g-page-contrast-boy g-page-contrast-yob');
	$("html").addClass('g-page-contrast-bow');
});
$('.hdr-switch--BOY').click(function()
{
	$("html").removeClass('g-page-contrast-bow g-page-contrast-yob');
	$("html").addClass('g-page-contrast-boy');
});
$('.hdr-switch--YOB').click(function()
{
	$("html").removeClass('g-page-contrast-bow g-page-contrast-boy');
	$("html").addClass('g-page-contrast-yob');
});

// Toggle password
$(function(){
	$(".showpassword").each(function(index,input) {
		var $input = $(input);
		$('<div class="togglePasswordField"/>').append(
			$("<input type='checkbox' class='showpasswordcheckbox' title='Show PIN code' />").click(function() {
				var change = $(this).is(":checked") ? "text" : "password";
				var rep = $("<input type='" + change + "' />")
				.attr("id", $input.attr("id"))
				.attr("name", $input.attr("name"))
				.attr('class', $input.attr('class'))
				.val($input.val())
				.insertBefore($input);
				$input.remove();
				$input = rep;
				$('.togglePasswordField').toggleClass('togglePasswordField--show');
			})
			).insertAfter($input);
	});

	// Mobile Menu

	$('.show-second-level').click(function()
	{
		$('.' + $(this).data('level')).toggleClass('fb-mobile-main-menu--expand');
	});

	$('.show-third-level').click(function()
	{
		$('.' + $(this).data('level')).toggleClass('fb-mobile-main-menu--expand');
	});

	$('.first-level-back').click(function()
	{
		$('.fb-mobile-main-menu--secondlevel').removeClass('fb-mobile-main-menu--expand');
	});

	$('.second-level-back').click(function()
	{
		$('.fb-mobile-main-menu--thirdlevel').removeClass('fb-mobile-main-menu--expand');
	});

	// Search

	$('.fb-search-icon').click(function()
	{
		$('.main-search').toggle();
	}); 

	// Push

	$(".fb-dev-menu-btn").click(function() 
	{
		$('.push-wrapper').toggleClass('menu-open');
	});



	$(window).resize(function(){
		var tabletls = 990;
		var siteWidth = $(".push-wrapper").width();

		if (siteWidth > tabletls){
			$('.push-wrapper').removeClass("menu-open");
		}
	});

	pusher();
	
	$(window).resize(function() {
		pusher();
	});

	// Add classes for mobile pushmenu
	function pusher()
	{
		var headerWidth = $(".fb-dev-header").width();
		if (headerWidth < 769){
			$( ".mobile-push" ).addClass( "push-wrapper" );
			$( ".mobile-push-content" ).addClass( "push-content" );
		}
		else{
			$( ".mobile-push" ).removeClass( "push-wrapper" );
			$( ".mobile-push-content" ).removeClass( "push-content" );
			$('.mobile-login').css("display","none");
		}
	}


	//$(".show-language-selector").click(function() 
	//{
	//	$('.language-selector').fadeToggle("fast");
	//}); 

	// Mobile user menu

	$(".mobile-sign-in").click(function() 
	{
		$('.fb-dev-header-mobile-user-menu').slideToggle("300");
		$(this).toggleClass('close-mobile-user-menu');
	}); 

	$(".fb-dev-header-mobile-user-menu-close--btn").click(function() 
	{
		$('.fb-dev-header-mobile-user-menu').slideToggle("300");
	});
});


// Scroll down stickybar
	var headerheight = $(".fb-dev-header").height() + $(".fb-passion-visual").height(); //get #myDiv
	// alert(headerheight);

	$(window).scroll(function(){
		if ($(this).scrollTop() > headerheight) {
			$('.fb-stickybar').addClass("fb-stickybar--show");
		} else {
			$('.fb-stickybar').removeClass("fb-stickybar--show");
		}
	});

	// $(".mobile-push-content").scroll(function(){	
	// 	if ($(this).scrollTop() > headerheight) {
	// 		$('.fb-stickybar').addClass("fb-stickybar--show");
	// 	} else {
	// 		$('.fb-stickybar').removeClass("fb-stickybar--show");
	// 	}
	// });



// var demo = new CountUp("myTargetElement", 0, $('.counter').html(), 0, 2.5, options);

if ($('.wow').length > 0)
{
	var wow = new WOW(
	{
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       0,          // distance to the element when triggering the animation (default is 0)
		mobile:       false,       // trigger animations on mobile devices (default is true)
		live:         true,       // act on asynchronously loaded content (default is true)
		callback:     function(box) {
		  // the callback is fired every time an animation is started
		  // the argument that is passed in is the DOM node being animated
		}
	}
	);
	wow.init();
}

$('.fb-video-layer').click(function()
{
	$('.fb-video-layer').fadeToggle("300");
	$("body").css("overflow", "auto");
	$(".fb-video-wrapper").html(' ');
}); 

// $('.fb-sign-in').click(function()
// {
// 	$('.desktop-login').fadeToggle('fast');
// }); 

// $('.fb-sign-in--mobile').click(function()
// {
// 	$('.mobile-login').slideToggle('fast');
// }); 

$('.fb-user-show-menu').click(function()
{
	$('.fb-my-account-member-menu').fadeToggle('fast');
	$(this).toggleClass('fb-user-inactive fb-user-active');
}); 

// on click/tap outside, close window
$(document).on({'mousedown touchevent': function(e) {
	var target = $(e.target);
	var $panel = $('.fb-my-account-member-menu:visible');
	if($panel.length == 0){
		return;
	}
	//console.log(e.target);
	if($.contains($panel[0], e.target) || $(target).hasClass('fb-my-account-member-menu')){
		console.log(e.target);
	} else {
		//console.log($(target).hasClass('fb-my-account-member-menu'));
		$('.fb-my-account-member-menu').hide();
		$('.fb-user-show-menu').removeClass('fb-user-active').addClass('fb-user-inactive');
	}
}});

$(document).on({'mousedown touchevent': function(e) {
	var target = $(e.target);
	var $panel = $('.fb-dev-header-login:visible');
	if($panel.length == 0){
		return;
	}
	//console.log(e.target);
	if($.contains($panel[0], e.target) || $(target).hasClass('fb-dev-header-login')){
		console.log(e.target);
	} else {
		//console.log($(target).hasClass('fb-my-account-member-menu'));
		$('.fb-dev-header-login').hide();
		$(".fb-sign-in--mobile").toggleClass('close-mobile-user-menu');
	}
}});

$('.fb-user-navigation-show-member-menu').click(function()
{
	$('.fb-my-account-member-menu').fadeToggle('fast');
	$(this).toggleClass('member-menu-inactive member-menu-active');
}); 

$('.fb-notification-close').click(function()
{
	$('.fb-notification').fadeToggle("300");
}); 

// SUPPORT

$('.fb-support-cat').click(function()
{
	// alert($(this).data('cat'));
	$('.fb-support-desk').hide();
	$('.fb-support-cat').removeClass('fb-support-cat-active');
	$(this).toggleClass('fb-support-cat-active');
	$('#' + $(this).data('cat')).fadeToggle(500);

	$('html, body').animate(
		{scrollTop: $(this).offset().top},
		{
			duration: 500, // how fast we are animating
			easing: 'easeInOutCubic' // the type of easing
		}
	);
});


$('.fb-support-item-question').click(function()
{	
	$(this).parent().toggleClass('fb-support-item--active');
	$(this).parent().find('.fb-support-item-answer').slideToggle('fast');
}); 
$('.show-opening-hours').click(function()
{
	$('.opening-hours').fadeToggle(500);
});

$('.fb-support-cat-show-form').click(function()
{
	$('.fb-support-cat').removeClass('fb-support-cat-active');
	$(this).toggleClass('fb-support-cat-formactive');
	$('.support-contactform').fadeToggle(0);
});

$('.close-cat-list').click(function()
{	
	$('.fb-support-cat').removeClass('fb-support-cat-active');
	$(this).parent().fadeToggle(500);
}); 

$('.close-opening-hours').click(function()
{	
	$('.opening-hours').fadeToggle(500);
});

$('.close-contact-form').click(function()
{	
	$('.fb-support-cat-show-form').removeClass('fb-support-cat-formactive');
	$(this).parent().fadeToggle(0);
});

function autoPlayVideo(vcode){
	"use strict";
	$(".fb-video-wrapper").html('<iframe class="fb-video-object" src="https://www.youtube.com/embed/'+vcode+'?autoplay=1&loop=1&rel=0&wmode=transparent" frameborder="0" allowfullscreen wmode="Opaque"></iframe>');
}


// $('.fb-video-thumbnail').click(function()
// {
// 	autoPlayVideoAboutFlyingBlue('s_AbSEi5L3k');
// 	$(".item").removeClass("item--active");
// 	$('.play-video-1').closest(".item").addClass("item--active");
// }); 

// $('.play-video-1').click(function()
// {
// 	autoPlayVideoAboutFlyingBlue('s_AbSEi5L3k');
// 	$(".item").removeClass("item--active");
// 	$(this).closest(".item").addClass("item--active");
// });
// $('.play-video-2').click(function()
// {
// 	autoPlayVideoAboutFlyingBlue('L6boXMtsEmQ');
// 	$(".item").removeClass("item--active");
// 	$(this).closest(".item").addClass("item--active");
// });
// $('.play-video-3').click(function()
// {
// 	autoPlayVideoAboutFlyingBlue('L6boXMtsEmQ');
// 	$(".item").removeClass("item--active");
// 	$(this).closest(".item").addClass("item--active");
// });
// $('.play-video-4').click(function()
// {
// 	autoPlayVideoAboutFlyingBlue('L6boXMtsEmQ');
// 	$(".item").removeClass("item--active");
// 	$(this).closest(".item").addClass("item--active");
// });
// $('.play-video-5').click(function()
// {
// 	autoPlayVideoAboutFlyingBlue('L6boXMtsEmQ');
// 	$(".item").removeClass("item--active");
// 	$(this).closest(".item").addClass("item--active");
// });
// $('.play-video-6').click(function()
// {
// 	autoPlayVideoAboutFlyingBlue('L6boXMtsEmQ');
// 	$(".item").removeClass("item--active");
// 	$(this).closest(".item").addClass("item--active");
// });
// $('.play-video-7').click(function()
// {
// 	autoPlayVideoAboutFlyingBlue('L6boXMtsEmQ');
// 	$(".item").removeClass("item--active");
// 	$(this).closest(".item").addClass("item--active");
// });
// $('.play-video-8').click(function()
// {
// 	autoPlayVideoAboutFlyingBlue('L6boXMtsEmQ');
// 	$(".item").removeClass("item--active");
// 	$(this).closest(".item").addClass("item--active");
// });

$('.play-video').each(function() {
	$(this).on('click', function () {
		autoPlayVideoAboutFlyingBlue($(this).data('package').videoid);
		$('.item--active').removeClass("item--active");
		$(this).closest(".item").addClass("item--active");
	})
});

function autoPlayVideoAboutFlyingBlue(vcode){
	"use strict";
	$(".fb-video-thumbnail").css("display","none")
	$("#play-video-about-flyingblue").css("display","block")
	$("#play-video-about-flyingblue").html('<iframe class="fb-video-object" src="https://www.youtube.com/embed/'+vcode+'?autoplay=1&loop=1&rel=0&wmode=transparent" frameborder="0" allowfullscreen wmode="Opaque"></iframe>');
}



$('.tooltip').tooltipster({
	contentAsHTML: true
});

// Toggle collapse the header navigation
$('.fb-main-navigation-expand').click(function()
{
	$(".fb-main-navigation").slideToggle("slow");
	if ($(".fb-mobile-search").css("display") == 'block')
	{
		$('.fb-mobile-search').slideToggle("slow");
	}
}); 

	// Hide the cookie message
	$('.allow-cookies').click(function()
	{
		$('.fb-cookie-bar').slideToggle("slow");
	}); 
	
	
	// Animate the navigation
	//$(".fb-user-navigation").delay(300).animate({ opacity: 1 }, 400);
	
	 // Open and close search results


	 
	 $('.fb-search-suggestions-list-item').click(function()
	 {
	 	$('.fb-search-results').fadeToggle("fast");
	 }); 

	 $('.fb-search-reslults-close-link').click(function()
	 {
	 	$('.fb-search-results').fadeToggle("fast");
	 }); 



	// Make sure we can see all the navigation items when fooling around with responsive
	showHeaderNavigation();
	showMenuItems();
	hideMobileSearch();
	
	$(window).resize(function() {
		showHeaderNavigation();
		showMenuItems();
		hideMobileSearch();
	});

	function showHeaderNavigation()
	{
		var headerWidth = $(".fb-header").width();
		if (headerWidth > 568){
			$( ".fb-main-navigation" ).addClass( "display-block" );
		}
		else{
			$( ".fb-main-navigation" ).removeClass( "display-block" );
		}       

		$( ".show" ).text( headerWidth );   
	}
	
	
	

	
	// Toggle collapse the mobile searchbar
	$('.show-search-btn').click(function()
	{
		$('.fb-mobile-search').slideToggle("slow");
	});

	

	$('.close-alert-message').click(function()
	{
		$('.fb-alert-message').fadeToggle(500);
	});
	
	// Toggle language selector
	
	
	
	function hideMobileSearch()
	{
		var headerWidth = $(".fb-header").width();
		if (headerWidth > 768){
			$( ".fb-mobile-search" ).addClass( "display-none" );
		}
		else{
			$( ".fb-mobile-search" ).removeClass( "display-none" );
		}   
	}
	
	
	function showMenuItems()
	{
		var containerWidth = $(".fb-main-navigation").width();

		var menuItemsWidth = 0;
		$( ".fb-main-navigation-listitem").each(function( index ) {
			menuItemsWidth += parseFloat($(this).width());
		}); 

		var spaceLeft = containerWidth-menuItemsWidth-11;
		$( ".menuWidth" ).text( spaceLeft );        

	}

	$('.fb-show-more').click(function() {
		$('.fb-more-benefits').slideToggle("slow", function()
		{
			if ($('.fb-more-benefits').css('display') == 'block')
			{
				$('.fb-show-more').addClass('fb-show-less').html("Show less categories");
			}
			else
			{
				$('.fb-show-more').removeClass('fb-show-less').html("Show all categories");
			}
		});
		return false;
	});



	var arr = $.makeArray()
	$('.fb-footer-navigation-list').each(function(){
		arr.push($(this).outerHeight());
	});
	// $('.fb-footer-navigation-list').css('height', Math.max.apply( Math, arr ));

		// Toggle collapse the footer navigation links
		$('.fb-footer-navigation-expand').click(function()
		{
			$(this).parent().find("ul").toggle(0);
			$(this).toggleClass('fb-footer-navigation-expand fb-footer-navigation-collapse').toggleClass('fb-footer-navigation-expand');
		});
		
		
		// Make sure we can see all the navigation items when fooling around with responsive
		showFooterNavigation();
		$(window).resize(function() {
			showFooterNavigation();
		});
		function showFooterNavigation()
		{
			var footerWidth = $(".fb-footer").width();
			if (footerWidth > 768){
				$( ".fb-footer-navigation-list" ).addClass( "displayBlock" );
			}
			else{
				$( ".fb-footer-navigation-list" ).removeClass( "displayBlock" );
			}       
		}

		$(".services li a").mouseover(function(){
			$("#imgContainer").attr("src", $(this).attr("name"));
		});

		$(".accordian h3").click(function(){
			//slide up all the link lists
			$(".accordian .accordian-content").slideUp();
			$( ".accordian li" ).removeClass( "active" );
			$(this).parent().addClass( "active" );
			
			//slide down the link list below the h3 clicked - only if its closed
			if(!$(this).next().is(":visible"))
			{
				$(this).next().slideDown();
			}
		})


		var owl = $("#video-carousel");

		owl.owlCarousel({
			itemsCustom : [
			[0, 2],
			[450, 3],
			[600, 3],
			[700, 3],
			[1000, 5],
			[1200, 5],
			[1400, 5],
			[1600, 5]
			],
			pagination : true,
			lazyLoad: true,
			scrollPerPage: true,
			touchDrag : true,
			mouseDrag : true
		});

		$(".owl-button--next").click(function(){
			owl.trigger('owl.next');
		});
		$(".owl-button--prev").click(function(){
			owl.trigger('owl.prev');
		});


		var culture = $("#culture-carousel");

		culture.owlCarousel({
			itemsCustom : [
			[0, 1],
			[1600, 1]
			],
			autoPlay : true,
			stopOnHover : true,
			pagination : true,
			lazyLoad: true,
			scrollPerPage: true,
			touchDrag : true,
			mouseDrag : true
		});




		$(".fb-sub-nav-link-parent").click(function(e){
			$(this).closest("li").children(".fb-sub-nav-section").slideToggle(500,"swing");
			$(this).toggleClass("fb-sub-nav-link-parent--active");
		});


		$(".fb-faq-list-question").click(function(e){
			$(this).closest("li").children(".fb-faq-list-answer").slideToggle(500,"swing");
			$(this).toggleClass("fb-faq-list-question--active");
		});


// Sortable Tables


$("#myTable").tablesorter( {
	sortList: [[0,0]],
	dateFormat : "dd/mm/yy",
	headers: { 0:{ sorter: "shortDate"}, 2: { sorter: false}, 4: {sorter: false}, 5: {sorter: false} }
} ); 

// Dropzone

$("div#myId").dropzone({ 
	url: "/file/post",
	dictDefaultMessage: "Drop files here or click to upload.<strong>.jpeg/.pdf/.png/.bmp (10MB max.)</strong>",
});

// Modal

$('.toggle-modal').click(function()
{
    // $('.fb-modal').fadeToggle("slow");
    $('.fb-modal').addClass("fb-modal-open");
    $('body').addClass("modal-open");
});

$('.fb-modal-close, .fb-modal-close2').click(function()
{
	$('.fb-modal').removeClass("fb-modal-open");
    // $('.fb-modal').fadeToggle("slow");
    $('body').removeClass("modal-open");
});

$('.showinlinemodal').click(function()
{
	$('.fb-modal-inline').slideToggle("slow");
});

$('.fb-modal-inline-close').click(function()
{
	$('.fb-modal-inline').slideToggle("slow");
});

// SHOW IOS WALLET
if( /webOS|iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
	$('.fb-ios-wallet').show();
}

// BENEFIT TABLE

var tiercheck = 0;

$('.tier-check').click(function()
{
	$(this).toggleClass("tier-check--checked");
	$('.' + $(this).data('level')).toggleClass('selected');
	$('.' + $(this).data('level')).toggleClass('selected-bg');
	tiercheck = $(".tier-check--checked").length;
	if(tiercheck > 1){
		$('.benefit-filter').addClass('filter-active');
	}
	// alert(tiercheck)
});

// RESET FILTER
$('.benefit-reset').click(function()
{
	// $('.filter-active').addClass('filter-active');
	$('.tier-check').removeClass('tier-check--checked');
	$('.tier-filter').removeClass('selected');
	$('.tier-filter').removeClass('filtered');
	tiercheck = 0;
});

// FILTER
$('.benefit-filter').click(function()
{
	if(tiercheck > 1){
		$('.tier-filter').not('.selected').addClass('filtered');
		// $('.tier-check').removeClass('tier-check--checked');
		$('.tier-filter').removeClass('selected-bg');
		tiercheck = $(".tier-check--checked").length;
	}
	else{
		alert("Select more than one membership")
	}
	
});

// FB TOGGLE
$('.fb-toggle-link').click(function()
{
	$(this).closest(".fb-toggle").find(".fb-toggle-content").slideToggle("fast");
	$(this).toggleClass("active");
	if ($(this).attr('aria-expanded') == 'false') {
		
		$(this).attr('aria-expanded', true);
		
	} else {
		
		$(this).attr('aria-expanded', false);
		
	}
});

// Card flip
// var flipcardheight = $(".front").height();
// // // alert(flipcardheight);
// // $(window).resize(function(){
// // 	$('.card').css("height", flipcardheight);
// // });

$(".flipcard").flip({trigger: 'hover'});


// $('.benefit-table-scroll-left').click(function()
// {
// 	var scrollLeft = $( ".benefit-table" ).scrollLeft();
// 	$(".benefit-table").animate( {scrollLeft: scrollLeft+230}, 200 );
// 	// alert(scrollLeft);
// });

// $('.benefit-table-scroll-right').click(function()
// {
// 	var scrollRight = $( ".benefit-table" ).scrollLeft();
// 	$(".benefit-table").animate( {scrollLeft: scrollRight-230}, 200 );
// 	// alert("test");
// });

// HARMONICA


$('.fb-harmonica-toggle').click(function()
{	
	$(".fb-harmonica .fb-harmonica-content").slideUp(300, function(){
		// Animation complete
	});
	$( ".fb-harmonica-toggle" ).removeClass( "active" );

	

	if(!$(this).next().is(":visible"))
	{
		

		$(this).next().slideDown(300, function(){
		// Animation complete

		});
		$(this).addClass("active");
	}

	$('html, body').animate(
		{scrollTop: $(this).offset().top},
		{
			duration: 500, // how fast we are animating
			easing: 'easeInOutCubic' // the type of easing
		}
	);
});

// Slides
$('.next-btn').click(function()
{
	// console.log($(this).closest('.slide'));
	// console.log($(this).closest('.slide').next('.slide'));
	var statusWidth = $(this).data('step') * 12.5 + 12.5; // 8 steps

	// alert(statusWidth+statusWidth);
	// alert($(this).data('step'));

	$('.fb-status-bar').css("width", statusWidth + "%");
	$(this).closest('.slide').fadeOut( "slow", function() {
		$(this).closest('.slide').next('.slide').fadeIn( "slow", function() {
		// Animation complete. 
	});
	});
	
});

// MAKING VISUAL FIT

var p = $( "#cb1" );
var o = $( "#cb2" );
$("#cv1").css("height", p.outerHeight() );
$("#cv2").css("height", o.outerHeight() ); 

$( window ).resize(function() {
	$("#cv1").css("height", p.outerHeight() );
	$("#cv2").css("height", o.outerHeight() );
});

// $(".accordian h3").click(function(){
// 			//slide up all the link lists
// 			$(".accordian .accordian-content").slideUp();
// 			$( ".accordian li" ).removeClass( "active" );

// 			//slide down the link list below the h3 clicked - only if its closed
// 			if(!$(this).next().is(":visible"))
// 			{
// 				$(this).next().slideDown();
// 			}
// 		})

  $('<div class="quantity-nav"><div class="quantity-button quantity-up"><i class="fa fa-chevron-up" aria-hidden="true"></i></div><div class="quantity-button quantity-down"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>').insertAfter('.quantity input');
    $('.quantity').each(function() {
      var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
      	var oldValue = parseFloat(input.val());

      	if (!$.isNumeric(oldValue)) {
      		var oldValue = 0;
      	}

        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }

        

        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });

// Sticky to header
var headerheight = $(".fb-dev-header").outerHeight();
var stickyheight = $(".fb-sticky-header").outerHeight();

$(window).scroll(function(){
	if ($(this).scrollTop() > headerheight) {
		$('.fb-sticky-header').addClass("fb-sticky-to-header");
		$('#main-content').css("margin-top",stickyheight);
		
	} else {
		$('.fb-sticky-header').removeClass("fb-sticky-to-header");
		$('#main-content').css("margin-top","0px");
	}
});


// EDIT PROFILE
$('.edit-myprofile').click(function()
{	
	$(".fb-my-profile-content").css("display","none");
	$(".fb-footer").css("display","none");
	$(".fb-overlay").css("display","block");
	$('html, body').animate(
		{scrollTop: $(window).top},
		{
			duration: 500, // how fast we are animating
			easing: 'easeInOutCubic' // the type of easing
		}
	);
});
$('.fb-close-overlay').click(function()
{	
	$(".fb-my-profile-content").css("display","block");
	$(".fb-footer").css("display","block");
	$(".fb-overlay").css("display","none");
});

$('.append-button').click(function()
{	
	// alert("asdas");
	$(".append-test").toggleClass("animate-ok");
});

