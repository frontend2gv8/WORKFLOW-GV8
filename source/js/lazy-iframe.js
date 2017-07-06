$.fn.isLazyIframe = function(){
	return this.each(function(){
		if(this.getBoundingClientRect().top < window.innerHeight + 200){
			if(!this.getAttribute('loaded')){
				var template = $(this).find('template');
				var video = template.html();

				if(template){
					$(this).append(video);
					template.remove();
					$(this).attr('loaded', 'true');
				}
			}
		}
	});
};

$.fn.lazyIframe = function(){
	var jaLazyIframe = false;

	return this.each(function(){
		var frame = this;

		$(frame).isLazyIframe();

		$(window).scroll(function(){
			if (jaLazyIframe) return;

			setTimeout(function(){
				jaLazyIframe = false;
			},100);

			$(frame).isLazyIframe();
		});
	});
};

$('lazyiframe').lazyIframe();