// UTILITARIOS DE CONTAGEM
function clonarItens(id,qnt){
	'use strict';

	$('#'+id+' .item').each(function() {
		var next = $(this).next();

		if (!next.length) {
    		next = $(this).siblings(':first');
  		}
  		next.children(':first-child').clone().addClass('clone').appendTo($(this));

  		for (var i=0;i<qnt -2;i++) {
    		next=next.next();
    		if (!next.length) {
    			next = $(this).siblings(':first');
  			}

    		next.children(':first-child').clone().addClass('clone').appendTo($(this));
  		}
	});
}

function verificaQuantidade(qtde1,qtde2,este){
	'use strict';

	var primeiro = $('#'+este+' .item:first-child');

	if(qtde1 <= qtde2){
		primeiro.siblings('.item').each(function(){
			var conteudoIrmaos = $(this).children(':first-child').clone().addClass('clonado');

			primeiro.append(conteudoIrmaos);

			primeiro.siblings().remove();
		});

		$('#'+este).find('.carousel-indicators').addClass('hidden');
		$('[href="#'+este+'"]').addClass('hidden');
		$('#'+este).carousel({interval:0});
	}else{
		clonarItens(este,qtde2);
	}

}

function bsCarouselClones(){
	'use strict';

	$('.carousel[data-qnt]').each(function() {
		var qntdeItens = $(this).data('qnt');
		var id = $(this).attr('id');
		// var itens = $(this).find('.item').length;

		// verificaQuantidade(itens,qntdeItens,id);
		clonarItens(id,qntdeItens);

	});
}

function responsiveCarousel(classe){
	'use strict';

	$('.carousel[data-qnt-'+classe+']').each(function() {
		var qntdeItens = $(this).data('qnt-'+classe);
		var id = $(this).attr('id');
		var itens = $(this).find('.item').length;

		// verificaQuantidade(itens,qntdeItens,id);

		clonarItens(id,qntdeItens);

	});
}

function bsResponsiveCarousel(){
	'use strict';

	var w = $(window).width();

	if(w < 750){
		responsiveCarousel('xs');
	}

	if((w >= 750) && (w < 992)){
		responsiveCarousel('sm');
	}

	if(w >= 992){
		responsiveCarousel('md');
	}
}

function startCarousel(){
	'use strict';

	bsResponsiveCarousel();
	bsCarouselClones();
}

$(window).load(function(){
	'use strict';
	startCarousel();
});

$(window).resize(function(){
	'use strict';

	$('.clone,.clonado').remove();

	startCarousel();
});


// IN MOBILE QUESTION
$('.carousel').on('swiperight',function(){
	'use strict';

	$(this).carousel('prev');
});


$('.carousel').on('swipeleft',function(){
	'use strict';

	$(this).carousel('next');
});

// NEXT & PREV
$('[data-carousel="prev"]').click(function(event){
	event.preventDefault();
	var alvo = $(this).attr('href')

	$(alvo).carousel('prev');
});

$('[data-carousel="next"]').click(function(event){
	event.preventDefault();
	var alvo = $(this).attr('href')

	$(alvo).carousel('next');
});

$('[data-interval]').each(function(){
	var intervalo =  $(this).data('interval');

	$(this).carousel({interval:intervalo})
});