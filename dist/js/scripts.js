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
$(document).ready(function(){
    $('[data-carousel="single-item"]').each(function(){
        $(this).owlCarousel({
            slideSpeed : 500,
            paginationSpeed : 500,
            singleItem : true,

            autoPlay: true,
            stopOnHover: true,

            transitionStyle : "fadeUp"
        });
    });
});

$('[data-carousel="mult-items"]').each(function(index, el) {
    var qntDesktop = $(this).data('md-qnt');
    var qntTablet = $(this).data('sm-qnt');
    var qntMobile = $(this).data('xs-qnt');

    $(this).owlCarousel({
        items: qntDesktop,
        itemsCustom : false,
        itemsDesktop : [1199,qntDesktop],
        itemsDesktopSmall : false,
        itemsTablet: [768,qntTablet],
        itemsTabletSmall: false,
        itemsMobile : [479,qntMobile],
        singleItem : false,

        slideSpeed : 200,
        paginationSpeed : 800,
        rewindSpeed : 1000,

        autoPlay : true,
        stopOnHover : true

    });
});

$('[data-event="prev"]').on('click', function(event){
    event.preventDefault();

    var target = $(this).data('target');
    $(target).trigger("owl.prev");
});

$('[data-event="next"]').on('click', function(event){
    event.preventDefault();

    var target = $(this).data('target');
    $(target).trigger("owl.next");
});
jQuery.getJSON('../json/videos-youtube.json', function(data, textStatus) {
	youtubeSuccess(data)
});

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

		// $('.youtube-carousel').carousel({interval: 0});
	}

	escrever();

	$(window).resize(function(){
		escrever();
	});
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

function changeVideo(url){
	var idVideo = url.replace('https://www.youtube.com/watch?v=','');
	var iframe = '<iframe src="https://www.youtube.com/embed/'+idVideo+'" frameborder="0" allowfullscreen=""></iframe>';
	$('#video-g').html(iframe);
}
function message_IE(){
	var msg = '<div id="msg-ie" class="msg-ie">'+
		'<div class="alert-danger alert text-center">'+
			'<button onclick="remover(\'#msg-ie\')" class="close"><i class="fa fa-times"></i></button>'+
			'<h1>ATEN&Ccedil;&Atilde;O!!</h1>'+
			'<p>O seu navegador est&aacute; desatualizado, para melhor funcionamento do site clique <a href="#" class="alert-link">aqui</a> para atulizar! Ou instale o <a href="#" class="alert-link">Google Chrome</a></p>'+
		'</div>'+
	'</div>';

	$('noscript').after(msg);
	$('body').addClass('ie');
}

function remover($target){
	$($target).fadeOut('fast',function(){
		$($target).remove();
	})
}

$('.pergunta').click(function(){
	$(this).toggleClass('text-success');
});
(function(){
    // $('body').scrollspy({target:'.navbar-header'});
    // $('body').scrollspy({target: '#wrapper' });

    $('#menu a').on('click', function(e){
        e.preventDefault();
        var hash = this.hash;
        var _contentTop = $(hash).offset().top;
        var _time = 1000;

        console.log(_time);
        $('html, body').animate({
            scrollTop: _contentTop
        }, _time, function(){
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    });
})(jQuery);
$('.sidebar span[data-toggle="collapse"]').click(function(){
	var fa = $(this).find('.fa');
	var status = fa.attr('class').replace('fa ','');

	if(status == 'fa-minus'){
		fa.removeClass('fa-minus').addClass('fa-plus')
	}else{
		fa.removeClass('fa-plus').addClass('fa-minus')
	}

	console.log(status)
});

$('.sidebar .aux').click(function(){
	$('.sidebar').removeClass('open');
})

$('.btn-toggle-sidebar').click(function(){
	$('.sidebar').addClass('open');
})

$('html').on('swipeleft',function(){
	$('.sidebar').removeClass('open');
});

$('html').on('swiperight',function(){
	$('.sidebar').addClass('open');
});

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

    $.fn.carouselResponsive = function (){
        return this.each(function(){
            var carousel = $(this);
            var id = this.getAttribute('id');
            var content = $('#'+id+' .carousel-inner').html();
            var item = $('#'+id+' .carousel-inner > *');

            var count = {
                'md' : $('#'+id).data('md') || 1,
                'sm' : $('#'+id).data('sm') || 1,
                'xs' : $('#'+id).data('xs') || 1,
            }

            verifyMidia($('#'+id+' .carousel-inner'), content, item, count);
        });
    }

    $('.carousel[data-interval]').carousel({
        interval : $(this).data('interval')
    })

    $('[data-boots-event="prev"]').click(function(event){
        event.preventDefault();
        var alvo = $(this).attr('href');

        $(alvo).carousel('prev');
    });

    $('[data-boots-event="next"]').click(function(event){
        event.preventDefault();
        var alvo = $(this).attr('href');

        $(alvo).carousel('next');
    });

    $('.carousel').on('swipeleft',function(){
        $(this).carousel('next');
    });

    $('.carousel').on('swiperight',function(){
        $(this).carousel('prev');
    });

    $('.carousel-responsive').carouselResponsive();

})(jQuery);