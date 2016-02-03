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

// PARA TORNAR O CAROUSEL RESPONSIVO, BASTA ADD A CLASS "carousel-responsive" E
// ATRIBUIR AOS VALORES "data-xs", "data-ms", "data-md"  A QUANTIDADE DE ITENS DESEJADA PARA CADA MIDIA
// OBS: O ATTR "data-item" E O ATRIBUTO "id", SÃO DE PREENCHIMENTO OBRIGATORIO

var carouselResponsive = (function(){

	$('.carousel-responsive').each(function(){

		var id = $(this);
		var content = $(this).find('.carousel-inner').html();
		var item = $(this).data('item');

		checkResponsiveCarousel(id,content,item);
	});

})(jQuery);

function checkResponsiveCarousel(id,content,item){

	function wrappCarousel(count){
		id.find('.carousel-inner').append(content);

		for(var i = 0; i < item.length +1; i+= count){
			id.find(item).slice(i, i+count).wrapAll('<div class="item"></div>');
			id.find('.item:first-child').addClass('active');
		}
	}

	function checarTela(){
		var midia = 'xs';
		var w = $(window).width();

		id.find('.carousel-inner').html('');

		if(w > 700){
			midia = 'sm';
		}

		if (w > 991){
			midia = 'md';
		}

		switch (midia){
			case 'xs':
				var count = id.data('xs') || 1;
				wrappCarousel(count);
			break;
			case 'sm':
				var count = id.data('sm');
				wrappCarousel(count);
			break;
			case 'md':
				var count = id.data('md');
				wrappCarousel(count);
			break;
			default:
				wrappCarousel(1);
			break;
		}
	}

	checarTela();

	$(window).resize(function(){
		checarTela();
	});
}