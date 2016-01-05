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
