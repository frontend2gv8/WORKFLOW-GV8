function videoYoutube($url,alvo){
	var id = $url.replace('https://www.youtube.com/watch?v=','');
	var video = '<iframe src="https://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen class="responsive-embed"></iframe>';

	$(alvo).append(video)
}

function imgYoutube($url,alvo){
	var id = $url.replace('https://www.youtube.com/watch?v=','');
	var img = '<img src="http://img.youtube.com/vi/'+id+'/mqdefault.jpg" class="img-responsive"/>';

	$(alvo).append(img);
}

function chandeVideoYoutube($alvo,$elem){
	var alvo = $alvo;
	var elem = $elem;
	var url = elem.getAttribute('data-thumb-video-yt');

	videoYoutube(url,alvo);
}

$(window).load(function(){
	$('[data-video-yt]').each(function(){
		var url = $(this).data('video-yt');
		var alvo = $(this);

		videoYoutube(url,alvo);
	});

	$('[data-thumb-video-yt]').each(function(){
		var url = $(this).data('thumb-video-yt');
		var alvo = $(this);

		imgYoutube(url,alvo);
	});
});