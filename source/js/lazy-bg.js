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