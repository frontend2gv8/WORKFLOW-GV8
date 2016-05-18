$(document).ready(function(){
    $('.owl-carousel').each(function(){
        var itemsDesk = $(this).data('md-qnt') || 1,
            itemsTabl = $(this).data('sm-qnt') || 1,
            itemsMobi = $(this).data('xs-qnt') || 1;

        $(this).owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            video: true,
            lazyLoad:true,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            responsive:{
                0:{
                    items: itemsMobi,
                    nav: false
                },
                768:{
                    items: itemsTabl,
                    nav: false
                },
                992:{
                    items: itemsDesk,
                    nav: false
                }
            }
        });
    });

    $('[data-event="prev"]').on('click', function(event){
        event.preventDefault();

        var target = $(this).attr('href');
        // $(target).trigger("owl.prev");
        $(target).trigger("prev.owl");
    });

    $('[data-event="next"]').on('click', function(event){
        event.preventDefault();

        var target = $(this).attr('href');
        // $(target).trigger("owl.next");
        $(target).trigger("next.owl");
    });
});