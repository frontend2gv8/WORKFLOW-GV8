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