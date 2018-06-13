$('.owl-carousel').each(function(index, el){
	/*
		<div class="owl-carousel"
		 data-xs="1" 
		 data-sm="1" 
		 data-md="2" 
		 data-lg="2" 
		 data-xl="3" 
		 data-margin="30">...</div>
	*/

	var owlLists = (function(){
		function owlLists(el){
			this.xs = el.data('xs') || 1;
			this.sm = el.data('sm') || this.xs;
			this.md = el.data('md') || this.sm;
			this.lg = el.data('lg') || this.md;
			this.xl = el.data('xl') || this.lg;
		}

		return owlLists;
	})();

	var owlWrapList = new owlLists($(this));
	var items = $(this).children();
	var margin = $(this).data('margin') || 0;

	var options = {
		autoplay: true,
		responsive : {
			0 : {
				items 	: owlWrapList.xs,
				loop	: owlWrapList.xs <= items.length,
				margin  : owlWrapList.xs > 1 ? margin : 0
			},
			576:{
				items	: owlWrapList.sm,
				loop	: owlWrapList.sm <= items.length,
				margin  : owlWrapList.sm > 1 ? margin : 0
			},
			768 : {
				items	: owlWrapList.md,
				loop	: owlWrapList.md <= items.length,
				margin  : owlWrapList.md > 1 ? margin : 0
			},
			992 :{
				items	: owlWrapList.lg,
				loop	: owlWrapList.lg <= items.length,
				margin  : owlWrapList.lg > 1 ? margin : 0
			},
			1200 : {
				items	: owlWrapList.xl,
				loop	: owlWrapList.xl <= items.length,
				margin  : owlWrapList.xl > 1 ? margin : 0
			}
		}
	};

	$(this).owlCarousel(options);

});