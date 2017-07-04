$.fn.isLazyImage = function(){
	return this.each(function(el,index){
		if(this.getBoundingClientRect().top < window.innerHeight + 200){
			if(!this.getAttribute('loaded')){
				var src = this.getAttribute('src') || this.getAttribute('data-src');
				var alt = this.getAttribute('alt') || this.getAttribute('data-alt');
				var classe = (this.getAttribute('data-classe') +' img-responsive') || 'img-responsive';

				var img = document.createElement('img');

				img.setAttribute('src',src);
				img.setAttribute('alt',alt);
				img.setAttribute('class',classe);


				this.appendChild(img);
				this.setAttribute('loaded','true');
			}
		}
	});
};

$.fn.lazyImage = function(){
	var jaLazyImage = false;
	return this.each(function(){
		var lazy = this;

		$(lazy).isLazyImage();

		$(window).scroll(function(){
			if(jaLazyImage) return;

			setTimeout(function(){
				jaLazyImage = false;
			},100);

			$(lazy).isLazyImage();
		});
	});
};

$('lazyimage').lazyImage();