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
