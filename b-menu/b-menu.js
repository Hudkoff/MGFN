$(function () {
	var globalStorage = window.globalStorage || {};
	var body = $("body");
	var menuButton = $(".b-button_menu");

	function menuShown() {
		return body.hasClass("menu_opened");
	}

	function collapse() {
		body.removeClass("menu_opened");
		$(".p__body").animate({
			'right': "0",
			'left': "0"
		}, 300, "linear", function () {
			$(".b-menu__wrapper").hide();
		});
	}

	function checkHeight() {
		var top = $(document).scrollTop();
		if (globalStorage.IS_WIDE) { // WIDE
			if (top < 40) {
				body.removeClass("menu_float");
				menuButton.hide();
				$(".b-menu__wrapper").show();
			} else {
				body.addClass("menu_float");
				menuButton.show();
				if (menuShown() != true) {
					$(".b-menu__wrapper").hide();
					body.removeClass("menu_opened");
				}
			}
		} else { // MOBILE
			if (top == 0) {
				body.removeClass("menu_float");
			} else {
				body.addClass("menu_float");
			}
		}
	}

	menuButton.click(function (e) {
		e.preventDefault();
		if (globalStorage.IS_WIDE) { // WIDE
			if (menuShown() != true) {
				$(".b-menu__wrapper").show();
				body.addClass("menu_opened");
			} else {
				$(".b-menu__wrapper").hide();
				body.removeClass("menu_opened");
			}
		} else { // MOBILE
			if (menuShown() != true) {
				$(".b-menu__wrapper").show();
				body.addClass("menu_opened");
				$(".p__body").css({'left': "auto"}).animate({
					'right': "85%",
					'left': "-85%"
				}, 300, "linear", function () {
				});
			} else {
				collapse();
			}
		}
	});

	// if floating header
	$(window).scroll(checkHeight);
	
	checkHeight();
	changeClickToHover($(".b-menu__item.acc-section, .b-additionalmenu__item.acc-section"));

	// check state if resize
	$(window).on('orientationchange', false, function () {
		if (globalStorage.IS_WIDE) {
			if (menuShown()) {
				collapse();
			}
		} else {
			menuButton.show();
		}
		checkHeight();
		changeClickToHover($(".b-menu__item.acc-section, .b-additionalmenu__item.acc-section"));
	});

	$(window).on('resize', false, function () {
		if (globalStorage.IS_WIDE) {
			if (menuShown()) {
				collapse();
			}
		} else {
			menuButton.show();
		}
		checkHeight();
		changeClickToHover($(".b-menu__item.acc-section, .b-additionalmenu__item.acc-section"));
	});

	function changeClickToHover (t) {
		setTimeout(function(){
			if (globalStorage.IS_WIDE) {
				t.bind("mouseenter", function() {
					$(this).addClass("acc-state_active")
						.find(".acc-subsection").stop(true).slideDown(150);
				});
				t.bind("mouseleave", function() {
					$(this).removeClass("acc-state_active")
						.find(".acc-subsection").stop(true).slideUp(150);
				});
				t.find("a").each(function() {
					$(this).bind("click", function(){
						window.location = $(this).attr("href");
					});
				});
			} else {
				t.unbind("mouseenter mouseleave");
			}
			//t.find(".acc-subsection")//.hide();
		}, 40);
	}


	// fix width bug
//	if (!globalStorage.browser.msie) {
//		setTimeout(function(){
//			if (globalStorage.IS_WIDE) {
//				$(".b-menu").css("display", "block").css("display", "table");
//			} else {
//				$(".b-menu").css("display", "block");
//			}
//		},40)
//	}
//	$(window).on('resize', false, function () {
//		if (globalStorage.IS_WIDE || globalStorage.browser.msie) {
//			$(".b-menu").css("display", "table");
//		} else {
//			$(".b-menu").css("display", "block");
//		}
//	});


});



