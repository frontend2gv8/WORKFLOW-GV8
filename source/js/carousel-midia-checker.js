$.fn.carouselResponsive = function(){
	window.carouselMidia = 'xs';

	var Responsive = (function(){
		function Responsive(el){
			this.xs = $(el).data('xs') || 1;
			this.sm = $(el).data('sm') || this.xs;
			this.md = $(el).data('md') || this.sm;
			this.lg = $(el).data('lg') || this.md;
			this.xl = $(el).data('xl') || this.lg;
		}

		return Responsive;
	})();
	var jaResize = false;
	var verifyMidia = function(){
		var w = $(window).width();

		if(w < 576){
			window.carouselMidia = 'xs';
		}

		if(w >= 576){
			window.carouselMidia  = 'sm';
		}

		if(w >= 768){
			window.carouselMidia = 'md';
		}

		if(w >= 992){
			window.carouselMidia = 'lg';
		}

		if(w >= 1200){
			window.carouselMidia = 'xl';
		}
	}

	verifyMidia();

	$(window).resize(function(){
		if (jaResize) return;

		setTimeout(function(){
			jaResize = false;
		}, 100)

		verifyMidia();
	});

	return this.each(function(){
		var responsive 	= new Responsive(this);
		var carousel 	= $(this);
		var inner 		= carousel.find('.carousel-inner');
		var items 		= carousel.find('.carousel-inner > *');

		function wrapCarosuel(){
			inner.find('.carousel-item > *').unwrap('<div class="carousel-item"></div>');

			for(var i=0; i < items.length; i++){
				carousel.find('.carousel-inner > *').slice(i, (i + responsive[window.carouselMidia]) ).wrapAll('<div class="carousel-item"></div>');
			}

			carousel.find('.carousel-item:first-child').addClass('active');
		}

		wrapCarosuel();

		$(window).resize(function(){
			wrapCarosuel();
		});
		
	});
}

$('.carousel-responsive').carouselResponsive();

$('.carousel[data-interval]').each(function(index, el){
	$(this).carousel({
		interval: $(this).data('carousel')
	})
});

$('a[data-carousel="prev"]').click(function(event) {
	event.preventDefault();

	$($(this).attr('href')).carousel('prev');
});

$('a[data-carousel="next"]').click(function(event) {
	event.preventDefault();

	$($(this).attr('href')).carousel('next');
});

$('.carousel').on('swipeleft',function(){
	$(this).carousel('next');
});

$('.carousel').on('swiperight',function(){
	$(this).carousel('prev');
});