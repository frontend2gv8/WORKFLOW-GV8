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

		$('.youtube-carousel').carousel({interval: 0});
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
})
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
