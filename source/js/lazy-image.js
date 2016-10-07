var LazyImage = (function(){
	'use restrict';
	var isLazed = function(){
		$('lazyimage').each(function(index, el) {
			if(el.getBoundingClientRect().top < window.innerHeight + 200){
				if($(this).html() == ''){
					var classe = $(this).data('class') ? 'class="'+$(this).data('class')+'"' : '';
					$(this).html('<img src="'+$(this).data('src')+'" alt="'+$(this).data('alt')+'" '+classe+'/>')
				}
			}
		});
	};
	var jaLazyimage = false;

	setTimeout(isLazed(),200);

	$(window).scroll(function(event) {
		if(jaLazyimage) return;

		setTimeout(function(){
			jaLazyimage = false;
		},100);

		isLazed();
	});
})();