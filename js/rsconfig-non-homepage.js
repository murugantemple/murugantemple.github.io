/* PAGE BASED LOGIC */
jQuery(document).ready(function() {
	//var thisPage = window.location.href.split('#')[0];
	var thisPage = window.location.pathname.split('#')[0];
	
	if (thisPage == '/events/2019-12-07-annual-fund-raiser/') {
		// All functions for '/events/2019-12-07-annual-fund-raiser/' page
		$(".simpleCart_checkout").addClass("btn btn-success");
		$(".simpleCart_empty").addClass("btn btn-warning");
		
	}

    $('#auditoriumslick').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay: true,
	  autoplaySpeed: 6000,
	});
});
