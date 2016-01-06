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