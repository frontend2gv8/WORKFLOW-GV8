
$('.youtube-carousel').owlCarousel({
	jsonPath: '../json/videos-youtube.json',
	jsonSuccess: youtubeSuccess
});

function youtubeSuccess(data){

	for(video in data.videos){
		var idVideo = data.videos[video].src.replace('https://www.youtube.com/watch?v=','');

		youtubeThumbnails(idVideo);
	}
}

function youtubeThumbnails(idVideo){
	var imagens = [
		'maxresdefault',
	        'sddefault',
	        'mqdefault',
	        'hqdefault',
	        'default'
	];

	var thumbnails = {};

	for (thumbnail in imagens){
		var nome = imagens[thumbnail];
		var url = 'https://img.youtube.com/vi/'+idVideo+'/'+nome+'.jpg';

		thumbnails[nome] = url;
	}

	$('#carousel-1').append('<div class="thumbnail"><img src="'+thumbnails['hqdefault']+'" alt="" class="img-responsive"/></div>')
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
