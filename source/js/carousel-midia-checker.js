/*
	RESPONSIVE BS CAROUSEL v 2.0
	Agora para ter o seu bootstrap carousel responsivo basta add a classe 'carousel-responsive' e add nos attrs
	'data-md', 'data-sm' e 'data-xs' , a quantidade de itens que vc queira mostrar para tal midia:

	Exemplo:
		Um carousel com  4 itens no desktop, 3 no tablet e 1 no mobile

		<div class="carousel carousel-responsive">
			<div class="carousel-inner">

				<div class="col-md-3 col-sm-4"> ... </div>
				<div class="col-md-3 col-sm-4"> ... </div>
				<div class="col-md-3 col-sm-4"> ... </div>
				<div class="col-md-3 col-sm-4"> ... </div>

			</div>
		</div>
	OBS:
		- Os attrs 'data-md', 'data-sm' e 'data-xs' carregam consigo como valor default 1.
		- É OBRIGATÓRIO a atribuição de um 'id' para o carousel, caso o constrário, o mesmo não funcionará.
*/
$.fn.carouselResponsive = function() {
	return this.each(function(index, el) {
		var alvo = $('#'+$(this).attr('id'));
		var items = alvo.find('.carousel-inner > *');
		var responsive = {
			'xs': $(this).data('xs') || 1,
			'sm': $(this).data('sm') || 1,
			'md': $(this).data('md') || 1
		};
		var midia = 'xs';

		if($(window).width() > 700){
			midia = 'sm';
		}

		if($(window).width() > 991){
			midia = 'md';
		}

		function wrapCarousel(count){
			alvo.find('.carousel-inner .item > *').unwrap('<div class="item"></div>');

			for(i=0;i<items.length;i++){
				alvo.find('.carousel-inner > *').slice(i, i+count).wrapAll('<div class="item"></div>');
			}

			alvo.find('.item:first-child').addClass('active');
		}

		function refreshCarousel (){
			switch(midia){
				case 'xs':
					wrapCarousel(responsive[midia]);
				break;
				case 'sm':
					wrapCarousel(responsive[midia]);
				break;
				case 'md':
					wrapCarousel(responsive[midia]);
				break;
			}
		}

		refreshCarousel ();

		$(window).resize(function(event) {
			refreshCarousel ();
		});
	});
};


$('.carousel-responsive').carouselResponsive();

$('.carousel[data-interval]').each(function(index, el) {
	$(this).carousel({
		interval: $(this).data('interval')
	});
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