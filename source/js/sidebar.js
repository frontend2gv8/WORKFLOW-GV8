$('.sidebar span[data-toggle="collapse"]').click(function(){
	var fa = $(this).find('.fa');
	var status = fa.attr('class').replace('fa ','');

	if(status == 'fa-minus'){
		fa.removeClass('fa-minus').addClass('fa-plus')
	}else{
		fa.removeClass('fa-plus').addClass('fa-minus')
	}

	console.log(status)
});

$('.sidebar .aux').click(function(){
	$('.sidebar').removeClass('open');
})

$('.btn-toggle-sidebar').click(function(){
	$('.sidebar').addClass('open');
})

$('html').on('swipeleft',function(){
	$('.sidebar').removeClass('open');
});

$('html').on('swiperight',function(){
	$('.sidebar').addClass('open');
});
