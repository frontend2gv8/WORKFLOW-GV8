function hasWebP() {
    var rv = $.Deferred(), img = new Image();
    img.onload = function() { rv.resolve(); };
    img.onerror = function() { rv.reject(); };
    img.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAgA0JaQAA3AA/vv9UAA=";
    return rv.promise();
}

hasWebP().then(function() {
    console.log("Hooray!!  WebP is enabled.  Things will be wonderful now.");

    $('[data-webp-bg-fallback]').each(function(index,el){
    	$(this).removeAttr('data-lazy-bg');
    });

}, function() {
    console.log("Note: your browser does not support the new Google WebP format. Please remain where you are while our support team locates you to begin the reeducation process.");
    
    $('[data-webp-bg-fallback]').each(function(index, el) {
    	$(this).css('background-image', 'url('+$(this).data('webp-bg-fallback')+')');
    	$(this).attr('data-lazy-bg',$(this).data('webp-bg-fallback'));
    });
});