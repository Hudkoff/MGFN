$(function () {
	/**
	 * Main object that holds global variables and methods of the page
	 *
	 * IMPORTANT:
	 * please insert at top of your js following line if you want to use this object:
	 *
	 * var globalStorage = window.globalStorage || {};
	 */
	window.globalStorage = {
		x: 'x',
		BREAKPOINT_1_START: 320,
		BREAKPOINT_2_START: 768,
		BREAKPOINT_3_START: 1024,
		BREAKPOINT_4_START: 1366,

		getWinSize: function () {
			var winWidth = window.innerWidth || screen.width;
			if (window.globalStorage.browser.msie && window.globalStorage.browser.version == "8.0") {
				winWidth = $("body").width();
			}
			if (winWidth < globalStorage.BREAKPOINT_2_START) {												// 0-767
				globalStorage.IS_MOBILE =  true;
				globalStorage.IS_TABLET =  false;
				globalStorage.IS_DESKTOP = false;
				globalStorage.IS_WIDE =    false;
			} else if (winWidth >= globalStorage.BREAKPOINT_2_START && winWidth < globalStorage.BREAKPOINT_3_START) {	// 768-1023
				globalStorage.IS_MOBILE =  false;
				globalStorage.IS_TABLET =  true;
				globalStorage.IS_DESKTOP = false;
				globalStorage.IS_WIDE =    false;
			} else if (winWidth >= globalStorage.BREAKPOINT_3_START && winWidth < globalStorage.BREAKPOINT_4_START) {	// 1024-1365
				globalStorage.IS_MOBILE =  false;
				globalStorage.IS_TABLET =  false;
				globalStorage.IS_DESKTOP = true;
				globalStorage.IS_WIDE =    false;
			} else if (winWidth >= globalStorage.BREAKPOINT_4_START) {										// 1366 - auto
				globalStorage.IS_MOBILE =  false;
				globalStorage.IS_TABLET =  false;
				globalStorage.IS_DESKTOP = false;
				globalStorage.IS_WIDE =    true;
			}
		},
		init: function () {
			globalStorage.getWinSize();
			$(window).resize(function () {
				globalStorage.getWinSize();
			});
		}
	};
	if (!window.globalStorage.browser) {
		var uaMatch = function (ua) {
			ua = ua.toLowerCase();
			var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
				/(webkit)[ \/]([\w.]+)/.exec(ua) ||
				/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
				/(msie) ([\w.]+)/.exec(ua) ||
				ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
				[];
			return match[2] || '0';
		};
		var uAgent = navigator.userAgent || '';
		window.globalStorage.browser = {
			ios: /ipad|ipod|iphone/i.test(uAgent),
			msie_mobile: /iemobile/i.test(uAgent),
			msie_tablet: /Trident\/7.0/i.test(uAgent),
			mozilla: /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase()),
			webkit: /webkit/.test(navigator.userAgent.toLowerCase()),
			opera: /opera/.test(navigator.userAgent.toLowerCase()),
			msie: (/msie/i.test(uAgent) && !/opera/i.test(uAgent)),
			android: /android/i.test(uAgent),
			wpie: (navigator.userAgent.toLowerCase().indexOf('mozilla/5.0') > -1 && navigator.userAgent.toLowerCase().indexOf('msie') > -1 && navigator.userAgent.toLowerCase().indexOf('iemobile') > -1),
			version: uaMatch(navigator.userAgent),
			isTouchDevice: ('ontouchstart' in window || 'msPointerEnabled' in window.navigator)
		};
	}

	var globalStorage = window.globalStorage = window.globalStorage || {};
	$(globalStorage.init());

});