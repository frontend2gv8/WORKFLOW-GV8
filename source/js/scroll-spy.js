(function(){
    // $('body').scrollspy({target:'.navbar-header'});
    // $('body').scrollspy({target: '#wrapper' });

    $('#menu a').on('click', function(e){
        e.preventDefault();
        var hash = this.hash;
        var _contentTop = $(hash).offset().top;
        var _time = 1000;

        console.log(_time);
        $('html, body').animate({
            scrollTop: _contentTop
        }, _time, function(){
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    });
})(jQuery);