$(function () {

	var bannerItem = $('.b-banner__item');
	var wrapper = $('.b-banner__markers')[0];
	var currentIndex = 0;

	// building markers
	for (var i = 0; i < bannerItem.length; i++) {
		var span = document.createElement('span');
		span.setAttribute('class', 'b-banner__marker');
		if (i == 0) {
			span.setAttribute('class', 'b-banner__marker b-banner__marker_active');
		}
		wrapper.appendChild(span);
		var marker = $('.b-banner__marker');
	}

	// shows banner with given index
	function showBanner(N) {
		$(bannerItem).removeClass('b-banner__item_active');
		$(marker).removeClass('b-banner__marker_active');

		$(bannerItem[N]).addClass('b-banner__item_active');
		$(marker[N]).addClass('b-banner__marker_active');
	}

	// events of controls
	marker.click(function (e) {
		e.preventDefault();
		clearInterval(swipe);
		currentIndex = $(this).index();
		showBanner(currentIndex);
	});
	$('.b-banners-slider__next').click(function (e) {
		e.preventDefault();
		clearInterval(swipe);
		currentIndex = currentIndex + 1;
		if (currentIndex > bannerItem.length - 1) {
			currentIndex = 0;
		}
		showBanner(currentIndex);
	});
	$('.b-banners-slider__prev').click(function (e) {
		e.preventDefault();
		clearInterval(swipe);
		currentIndex = currentIndex - 1;
		if (currentIndex < 0) {
			currentIndex = bannerItem.length - 1;
		}
		showBanner(currentIndex);
	});

	// slideshow
	var swipe = setInterval(function(){
		currentIndex = currentIndex + 1;
		if (currentIndex > bannerItem.length - 1) {
			currentIndex = 0;
		}
		showBanner(currentIndex);
	}, 8000);

	// correct height of banner controls
	function doResizeHeight () {
		var headerH = $(".b-header__content").height();
		var menuH = $(".b-menu").height();
		var bannerH = $(".b-banner__item").height();
		$(".b-banner-controls").height(bannerH);
		if (globalStorage.IS_DESKTOP) {
			$(".b-banner-controls").height(bannerH - 50);
		}
		if (globalStorage.IS_WIDE) {
			$(".b-banner-controls").height(bannerH - headerH - 120 - menuH);
		}
	}
	setTimeout(doResizeHeight,80);
	$(window).on('resize', false, function () {
		doResizeHeight();
	});

});

