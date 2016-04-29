$(document).ready(function(){
    $('[data-carousel="single-item"]').each(function(){
        $(this).owlCarousel({
            slideSpeed : 500,
            paginationSpeed : 500,
            singleItem : true,

            autoPlay: true,
            stopOnHover: true,

            transitionStyle : "fadeUp"
        });
    });

    $('[data-carousel="mult-items"]').each(function(index, el) {
        var qntDesktop = $(this).data('md-qnt');
        var qntTablet = $(this).data('sm-qnt');
        var qntMobile = $(this).data('xs-qnt');

        $(this).owlCarousel({
            items: qntDesktop,
            itemsCustom : false,
            itemsDesktop : [1199,qntDesktop],
            itemsDesktopSmall : false,
            itemsTablet: [768,qntTablet],
            itemsTabletSmall: false,
            itemsMobile : [479,qntMobile],
            singleItem : false,

            slideSpeed : 200,
            paginationSpeed : 800,
            rewindSpeed : 1000,

            autoPlay : true,
            stopOnHover : true
        });
    });

    $('[data-event="prev"]').on('click', function(event){
        event.preventDefault();

        var target = $(this).attr('href');
        $(target).trigger("owl.prev");
    });

    $('[data-event="next"]').on('click', function(event){
        event.preventDefault();

        var target = $(this).attr('href');
        $(target).trigger("owl.next");
    });
});