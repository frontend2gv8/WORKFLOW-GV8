const DOMINIO = window.location.protocol + '//' + window.location.host;
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
$('.carousel-responsive').each(function(index, el) {
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
function hasWebP() {
    var rv = $.Deferred(), img = new Image();
    img.onload = function() { rv.resolve(); };
    img.onerror = function() { rv.reject(); };
    img.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAgA0JaQAA3AA/vv9UAA=";
    return rv.promise();
}

hasWebP().then(function() {
    console.log("Hooray!!  WebP is enabled.  Things will be wonderful now.");

    $('[data-webp-bg-fallback]').each(function(index,el){
    	$(this).removeAttr('data-lazy-bg');
    });

}, function() {
    console.log("Note: your browser does not support the new Google WebP format. Please remain where you are while our support team locates you to begin the reeducation process.");
    
    $('[data-webp-bg-fallback]').each(function(index, el) {
    	$(this).css('background-image', 'url('+$(this).data('webp-bg-fallback')+')');
    	$(this).attr('data-lazy-bg',$(this).data('webp-bg-fallback'));
    });
});
var LazyBg = (function(){
	'use restrict';
	var isLazedBg = function(){
		$('[data-lazy-bg]').each(function(index, el) {
			if(el.getBoundingClientRect().top < window.innerHeight + 200){
				$(this).css('background-image', 'url('+$(this).attr('data-lazy-bg')+')');
				$(this).removeAttr('data-lazy-bg')
			}
		});
	};
	var jaLazyimageBg = false;

	setTimeout(isLazedBg(),200);

	$(window).scroll(function(event) {
		if(jaLazyimageBg) return;

		setTimeout(function(){
			jaLazyimageBg = false;
		},100);

		isLazedBg();
	});
})();
var LazyIframes = (function(){
	/*
		Ex:
			<lazyiframe>
				<template>
					<iframe src="https://www.youtube.com/embed/Egvg4w7VaU4" width="560" height="315 frameborder="0" allowfullscreen>
				</template>
			</lazyiframe>
	*/
	var isRectFrame = function(){
		var lazys = document.querySelectorAll('lazyiframe');

		if(lazys){
			for(i=0;i<lazys.length;i++){
				var lazy = lazys[i];

				if(lazy.getBoundingClientRect().top < window.innerHeight + 200){
					if(!lazy.getAttribute('loaded')){
						var template  = lazy.querySelector('template').content;

						lazy.appendChild(document.importNode(template, true));
						lazy.setAttribute('loaded','true');
					}
				}
			}
		}
	};
	var isLazedFrame = false;

	isRectFrame();

	window.addEventListener('scroll',function(){
		if(isLazedFrame) return;

		setTimeout(function(){
			isLazedFrame = false;
		},100);

		isRectFrame();
	});
})();
var LazyImage = (function(){
	'use restrict';
	var isRectImage = function(){
		var lazys = document.querySelectorAll('lazyimage');

		if(lazys){
			for(i=0;i<lazys.length;i++){
				var lazy = lazys[i];

				if(lazy.getBoundingClientRect().top < window.innerHeight + 200){
					if(!lazy.getAttribute('loaded')){

						var src = lazy.getAttribute('src') || lazy.getAttribute('data-src');
						var alt = lazy.getAttribute('alt') || lazy.getAttribute('data-alt') || 'placeholder';
						var classe = lazy.getAttribute('data-class') || 'img-responsive';

						var img = new Image();

						img.src = src;
						img.setAttribute('alt',alt);
						img.setAttribute('class',classe);

						lazy.appendChild(img);
						lazy.setAttribute('loaded','true');
					}
				}
			}
		}
	};
	var isLazedImage = false;

	isRectImage();

	window.addEventListener('scroll',function(){
		if(isLazedImage) return;

		setTimeout(function(){
			isLazedImage = false;
		},100);

		isRectImage();
	});
})();

/*jQuery.getJSON('../json/videos-youtube.json', function(data, textStatus) {
	youtubeSuccess(data)
});*/

$('[data-load-video]').click(function(){
	var alvo = $(this).data('target');
	console.log(alvo)
});

function youtubeSuccess(data){
	var content ='';

	for(video in data.videos){
		var idVideo = data.videos[video].src.replace('https://www.youtube.com/watch?v=','');
		var urlVideo = data.videos[video].src;
		var fx = "changeVideo('"+urlVideo+"')";

		var item = '<div class="thumb" onclick="'+fx+'">'+
			'<img src="https://img.youtube.com/vi/'+idVideo+'/hqdefault.jpg" alt="" class="img-responsive" />'+
		'</div>';

		content += item;

	}

	function escrever (){
		var qntTotalDeItens = data.videos.length;

		if ($(window).width() < 991){
			$('#carousel-1 .carousel-inner').html(content);
		}

		if($(window).width() >= 991){
			$('#carousel-2 .carousel-inner').html(content);
		}

		verifyMidia(qntTotalDeItens);

		$('.youtube-carousel .item:first-child').addClass('active');

		$('.youtube-carousel').carousel({interval: 0});
	}

	function verifyMidia(qnt){
		var w = $(window).width();

		var midia = 'xs';

		if (w > 700){
			midia = 'sm';
		}

		if(w > 991){
			midia = 'md'
		}

		switch (midia){
			case 'md':
				sliceProdutos(qnt,4);
			break;

			case 'sm':
				sliceProdutos(qnt,3);
			break;

			case 'xs' :
				sliceProdutos(qnt,1);
			break;

			default :
				sliceProdutos(qnt,1);
			break;

		}
	}

	function sliceProdutos(qnt,cont){
		for( var i = 0 ; i < qnt; i += cont){
			$('.youtube-carousel .thumb').slice(i,i+cont).wrapAll('<div class="item"></div>');
		}
	}

	escrever();

	$(window).resize(function(){
		escrever();
	});
}


function changeVideo(url){
	var idVideo = url.replace('https://www.youtube.com/watch?v=','');
	var iframe = '<iframe src="https://www.youtube.com/embed/'+idVideo+'" frameborder="0" allowfullscreen=""></iframe>';
	$('#video-g').html(iframe);
}
function remover($target){
	$($target).fadeOut('fast',function(){
		$($target).remove();
	})
}

$('.pergunta').click(function(){
	$(this).toggleClass('text-success');
})
$('.sidebar span[data-toggle="collapse"]').click(function(){
	var fa = $(this).find('.fa');
	var status = fa.attr('class').replace('fa ','');

	if(status == 'fa-minus'){
		fa.removeClass('fa-minus').addClass('fa-plus')
	}else{
		fa.removeClass('fa-plus').addClass('fa-minus')
	}

	// console.log(status)
});

$('.sidebar .aux').click(function(){
	$('.sidebar').removeClass('open');
});

$('.btn-toggle-sidebar').click(function(){
	$('.sidebar').addClass('open');
});

$('html').on('swipeleft',function(){
	$('.sidebar').removeClass('open');
});

$('html').on('swiperight',function(){
	$('.sidebar').addClass('open');
});

//# sourceMappingURL=scripts.js.map
