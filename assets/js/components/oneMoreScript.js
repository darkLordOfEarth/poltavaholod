$(".header__lang .button").click(function() {
    $(this).parent().find(".button").removeClass("button__active");
    $(this).addClass("button__active");
});

$(".header__burger").click(function() {
    $(".burger__menu").addClass("active");
});
$(".burger__close").click(function() {
    $(".burger__menu").removeClass("active");
});

$(".header-bottom__custom-button").click(function() {
    $(".header-bottom__catalog").slideToggle();
    $(".banners__top").toggleClass("row-rewerse");
    $(".banners__static").toggleClass("opacity0");
    $(".main").toggleClass("catalog__active");
    $(".main__example").toggleClass("hide");
    $(".banners__slider ").toggleClass("active");
    $(".banners__slider .owl-item.active").toggleClass("full");
    $(".service").toggleClass("active");
});

$(".popular__aside-link").click(function(e) {
    $(this).parent().parent().find(".active").removeClass("active");
    $(this).parent().addClass("active");
    let index = $(this).parent().index();
    $(".popular__aside-nav").find(".active").removeClass("active");
    $(".popular__aside-nav span").eq(index).addClass("active");
    e.preventDefault();
});
$(".popular__aside-nav span").click(function() {
    $(this).parent().find(".active").removeClass("active");
    $(this).addClass("active");
    let index = $(this).index();
    $(".popular__aside-list").find(".active").removeClass("active");
    $(".popular__aside-item").eq(index).addClass("active");
});


    $(".news__next").click(function() {
        $(".news__content .owl-next").click();
    });
    $(".reviews__nav_prev").click(function() {
        $(".reviews__list  .owl-prev").click();
    });
    $(".reviews__nav_next").click(function() {
        $(".reviews__list  .owl-next").click();
    });


    $(".categorySlider__bottom-btns img:first-child").click(function() {
        $(".slick-prev").click();
    });
    $(".categorySlider__bottom-btns img:last-child").click(function() {
        $(".slick-next").click();
    });


$(".categoryFilter__view").on("click", function() {
    $(this).parent().find(".active").removeClass("active");
    $(this).addClass("active");
    
})
$(".categoryFilter__view:first-child").on("click", function() {
    $(".categoryFilter__result-bottom").addClass("active");
})
$(".categoryFilter__view:last-child").on("click", function() {
    $(".categoryFilter__result-bottom").removeClass("active");
})


$(".filter__btn_mobile").on("click", function() {
    $(".categoryFilter__aside").addClass("active");
    let filter__bg = document.createElement("div");
    $(filter__bg).addClass("filter__bg");
    $("body").append(filter__bg);
    $("body").addClass("filter__active");
})
$(".filter__title img").on("click", function() {
    $(".categoryFilter__aside").removeClass("active");
    $(".filter__bg").remove();
    $("body").removeClass("filter__active");
})

$(".categoryFilter__result-nav__item").on("click", function(e) {
    e.preventDefault();
    $(this).parent().find(".active").removeClass("active");
    $(this).addClass("active");
})
$(".categoryFilter__result-nav__prev").on("click", function() {
    let item = $(".categoryFilter__result-nav__list").find(".active");
    $(item).removeClass("active")
    $(item).prev().addClass("active")
})
$(".categoryFilter__result-nav__next").on("click", function() {
    let item = $(".categoryFilter__result-nav__list").find(".active");
    $(item).removeClass("active")
    $(item).next().addClass("active")
})
$(".header__link:first-child").on("click", function() {
     $(".header__icons input").slideToggle();
})




///////select options
(function($) {
	function setChecked(target) {
		var checked = $(target).find("input[type='checkbox']:checked").length;
		if (checked) {
			$(target).find('select option:first').html('Выбрано: ' + checked);
		} else {
			$(target).find('select option:first').html('Выберите из списка');
		}
	}
 
	$.fn.checkselect = function() {
		this.wrapInner('<div class="checkselect-popup"></div>');
		this.prepend(
			'<div class="checkselect-control">' +
				'<select class="form-control"><option></option></select>' +
				'<div class="checkselect-over"></div>' +
			'</div>'
		);	
 
		this.each(function(){
			setChecked(this);
		});		
		this.find('input[type="checkbox"]').click(function(){
			setChecked($(this).parents('.checkselect'));
		});
 
		this.parent().find('.checkselect-control').on('click', function(){
			$popup = $(this).next();
			$('.checkselect-popup').not($popup).css('display', 'none');
			if ($popup.is(':hidden')) {
				$popup.css('display', 'block');
				$(this).find('select').focus();
			} else {
				$popup.css('display', 'none');
			}
		});
 
		$('html, body').on('click', function(e){
			if ($(e.target).closest('.checkselect').length == 0){
				$('.checkselect-popup').css('display', 'none');
			}
		});
	};
})(jQuery);	
 
$('.checkselect').checkselect();