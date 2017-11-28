
var config = {
	easing: 'hustle',
	reset:  false,
	over:     '1s',
	delay:  'onload',
	mobile:   false,
	scale:    { direction: 'up', power: '0%' },
	vFactor: 0.30
}
window.sr = new scrollReveal( config );


	// window.onresize = function(event)
	// {
	//     var sitewidth = document.getElementById('amex-hero').offsetWidth;
	//     if(sitewidth < 481 ){
	//         $(".slide-down").unbind('click').click(function (){$('html, body').animate({scrollTop: $(".slide-down-container").offset().top}, 1000);});
	//     }
	//     else{
	//         $(".slide-down").unbind('click').click(function (){$('html, body').animate({scrollTop: $(".slide-down-container").offset().top}, 1000);});
	//     }
	// };

	
	$(".slide-down").click(function (){$('html, body').animate({scrollTop: $(".slide-down-container").offset().top}, 1000);});



	$( ".amex-toggle-nav" ).click( function () {
		$( ".amex-sub-nav" ).toggle( 0 , function () {});
		$(".amex-nav-btn").toggleClass("amex-nav-btn--active");
	});


	var p = $( "#amex-compare" );
	var offset = p.offset();

	$(window).scroll(function(){

		if ($('.amex-sticky-nav').length) {

		if ($(this).scrollTop() > offset.top-80) {
			$('.amex-sticky-nav').addClass("show-sticky-nav");
		} else {
			$('.amex-sticky-nav').removeClass("show-sticky-nav");
		}
	}
	});


	var owl = $("#amex-carousel");

	owl.owlCarousel({
		itemsCustom : [
	        [0, 1],
	        [450, 3],
	        [600, 3],
	        [700, 4],
	        [1000, 5],
	        [1200, 6],
	        [1400, 8],
	        [1600, 8]
	      ],
		navigation : false
		
	});

	
