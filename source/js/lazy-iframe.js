var LazyIframes = (function(){
	/*
		Ex:
			<lazyiframe>
				<template>
					<iframe src="https://www.youtube.com/embed/Egvg4w7VaU4" width="560" height="315 frameborder="0" allowfullscreen>
				</template>
			</lazyiframe>
	*/
	var isRectFrame = function(){
		var lazys = document.querySelectorAll('lazyiframe');

		if(lazys){
			for(i=0;i<lazys.length;i++){
				var lazy = lazys[i];

				if(lazy.getBoundingClientRect().top < window.innerHeight + 200){
					if(!lazy.getAttribute('loaded')){
						var template  = lazy.querySelector('template').content;

						lazy.appendChild(document.importNode(template, true));
						lazy.setAttribute('loaded','true');
					}
				}
			}
		}
	};
	var isLazedFrame = false;

	isRectFrame();

	window.addEventListener('scroll',function(){
		if(isLazedFrame) return;

		setTimeout(function(){
			isLazedFrame = false;
		},100);

		isRectFrame();
	});
})();