(function() {
	window.addEventListener("load", function(){
		var thumbnails = document.querySelectorAll('[data-thumbnail]')
		,	movideProduces = document.querySelectorAll('[data-youtube-produce]');

		for(var i=0; i<thumbnails.length; i++){
			var item 	= thumbnails[i]
			,	data  	= item.dataset["thumbnail"]
			,	key 	= data.replace("https://www.youtube.com/watch?v=", "").replace("http://www.youtube.com/watch?v=", "")
			,	path 	= "https://i.ytimg.com/vi/{{key}}/hqdefault.jpg"
			,	path 	= path.replace("{{key}}", key);

			var img = document.createElement("img");
			img.src = path;
			img.alt = "Thumbnail do Youtube";
			img.classList.add("img-responsive");

			item.appendChild(img);
		}
		
		for(var i=0; i<movideProduces.length; i++){
			var item = movideProduces[i];
			item.addEventListener("click", function(){
				var item 	= this
				,	data  	= item.dataset["thumbnail"]
				,	key 	= data.replace("https://www.youtube.com/watch?v=", "").replace("http://www.youtube.com/watch?v=", "")
				, 	path 	= "https://www.youtube.com/embed/{{key}}?rel=0&amp;controls=0&amp;showinfo=0;&autoplay=1"
				,	path 	= path.replace("{{key}}", key);

				item.classList.add("producing");
				item.removeChild(item.childNodes[0]);
				var iframe = document.createElement("iframe");
				iframe.src = path;
				iframe.width = "100%";
				iframe.height = "224";

				item.appendChild(iframe);
			});
		}
	});
})();