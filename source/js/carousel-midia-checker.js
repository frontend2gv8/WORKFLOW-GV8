/*
	Para toranar o seu carousel responsivo você  deverá fazer asim com no exemplo abaixo.

		Ex 1:
			<div class="carousel" id="meuCarousel" data-md="$qtde" data-sm="$qtde" data-xs="$qtde">
				<div class="carousel-inner">
					<div class="elemento-teste"></div>
					<div class="elemento-teste"></div>
				</div>
			</div>

			<script>
				$('#meuCarousel').carouselResponsive();
			</script>

		Ex2:
			Basta adicionar a classe ".carousel-responsive".

			<div class="carousel carousel-responsive" id="meuCarousel" data-md="$qtde" data-sm="$qtde" data-xs="$qtde">
				<div class="carousel-inner">
					<div class="elemento-teste"></div>
					<div class="elemento-teste"></div>
				</div>
			</div>

		Onde:
			- "data-md" define a quantidade para desktop;
			- "data-sm" define a quantidade para tablets;
			- "data-xs" define a quantidade para dispositivos mobile;

	Obs:  É obrigatória a atribuição de um id para o carousel, caso não o tennha, o mesmo não funcionará.

*/

(function(){
	function verifyMidia(carouselInner,content,item,count){
		function wrapCarousel(cont){
			carouselInner.append(content);

			var elemento = '.'+item.prop('class').replace(' ','.');

			for( i = 0 ; i < item.length ; i += cont ){
				carouselInner.find(elemento).slice(i , i + cont).wrapAll('<div class="item"></div>');
			}

			carouselInner.find('.item:first-child').addClass('active');
		}

		function refresh(){
			var w = $(window).width();
			var midia = 'xs';

			carouselInner.html('');

			if (w > 700){
				midia = 'sm';
			}

			if (w > 991){
				midia = 'md';
			}

			switch (midia){
				case 'xs':
					wrapCarousel(count.xs);
				break;
				case 'sm':
					wrapCarousel(count.sm);
				break;
				case 'md':
					wrapCarousel(count.md);
				break;
				default:
					wrapCarousel(1);
				break;
			}
		};

		refresh();

		$(window).resize(function(event) {
			refresh();
		});
	}

	$.fn.carouselResponsive = function (options){
		return this.each(function(){
			var id = this.getAttribute('id');
			var carousel = $(this);
			var content = $('#'+id+' .carousel-inner').html();
			var item = $('#'+id+' .carousel-inner > *');

			var count = {
				'md' : $('#'+id).data('md') || 1,
				'sm' : $('#'+id).data('sm') || 1,
				'xs' : $('#'+id).data('xs') || 1,
			}

			verifyMidia($('#'+id+' .carousel-inner'),content,item,count);
		});
	}

	$('.carousel[data-interval]').carousel({
		interval : $(this).data('interval')
	})

	$('.carousel-responsive').carouselResponsive();

	$('[data-carousel="prev"]').click(function(event){
		var alvo = $(this).attr('href');
		event.preventDefault();

		$(alvo).carousel('prev');
	});

	$('[data-carousel="next"]').click(function(event){
		var alvo = $(this).attr('href');
		event.preventDefault();

		$(alvo).carousel('next');
	});

	$('.carousel').on('swipeleft',function(){
		$(this).carousel('next');
	});

	$('.carousel').on('swiperight',function(){
		$(this).carousel('prev');
	});

})(jQuery);