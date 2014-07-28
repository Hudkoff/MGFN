$(function () {
	/**
	 * Accordions animation
	 */
	/** structure
	 {optional} [via js]
	 <ul class="acc-wrapper">
	 <li class="acc-section {acc-desktop} [acc-state_active]">
	 <a class="acc-header"></a>
	 <ul class="acc-subsection">...</ul>
	 </li>
	 <li class="acc-section {acc-desktop} [acc-state_active]">
	 <a class="acc-header"></a>
	 <ul class="acc-subsection">...</ul>
	 </li>
	 </ul>
	 */

	$(".acc-header").click(function (e) {
		e.preventDefault();
		// FIX: MSIE render artefacts while animation in element with box-shadow
		if ((globalStorage.browser.msie || globalStorage.browser.msie_tablet) && globalStorage.IS_WIDE) {
			$('.js-shadow-element').addClass('no-shadow');
		}

		// mobile && tablet && desktop
		if ($(this).parent(".acc-section").hasClass("acc-desktop")) {
			if (!globalStorage.IS_WIDE) {
				slideAcc($(this));
			}
		// only mobile
		} else if ($(this).parent(".acc-section").hasClass("acc-mobile")) {
			if (globalStorage.IS_MOBILE) {
				slideAcc($(this));
			}
		}
		// any resolution
		else {
			slideAcc($(this));
		}
	});

	function slideAcc(el) {
		el.parent(".acc-section").toggleClass('acc-state_active');
		el.next().stop().slideToggle("fast", function () {
			// FIX: MSIE render artefacts while animation in element with box-shadow
			if ((globalStorage.browser.msie || globalStorage.browser.msie_tablet) && globalStorage.IS_MOBILE) {
				$('.js-shadow-element').removeClass('no-shadow');
			}
		});
	}

	// use .acc-desktop to fire accordion on mobiles only
	// document ready needs for surface, without tablet incorrect define breakpoints
	$(document).ready(function () {
		$(window).resize(function () {
			$('.acc-subsection').css({height: '', margin: '', padding: ''});
			if (!globalStorage.IS_WIDE) {
				$(".acc-desktop > .acc-subsection").hide();
				$(".acc-desktop.acc-state_active > .acc-subsection").show();

			} else {
				$(".acc-desktop > .acc-subsection").show();
			}


			if (globalStorage.IS_MOBILE) {
				$(".acc-mobile > .acc-subsection").hide();
				$(".acc-mobile.acc-state_active > .acc-subsection").show();
			} else {
				$(".acc-mobile > .acc-subsection").show(); //.css('display', '');
			}
		});
	});


});
