(function($){
$.fn.panOnScroll = function(settingsOverrides){

    // options

        var settings = $.extend({
            offset: 0.5,
            zoom: 1
       }, settingsOverrides);
       
       var targetElement = $(this);
       var zoom = 2-settings.zoom;
           
    // plugin
    
    $(window).scroll(function(){
        
        // stuff for doing calculations
        
            var scrollPos = $(window).scrollTop()*zoom;
        
            var windowHeight = $(window).height()*zoom;
            var scrollHeight = $(document).height()*zoom - windowHeight;
            
            var elementHeight = $(targetElement).height();
            var elementPosition = $(targetElement).offset().top;
        
        // calculations
        
            var scrollPercent = scrollPos / (scrollHeight);

            var offset = settings.offset * elementHeight;

            var animationStart = elementPosition - windowHeight + offset;
            var animationEnd = elementPosition + elementHeight - offset;
            
            var animationHeight = animationEnd - animationStart;
            
            var animationProgress = (scrollPos-animationStart) / animationHeight;
            
        // animate
            
            var elementWidth = $(targetElement).width() - $(window).width();
            
            if ( scrollPos > animationStart && scrollPos < animationEnd ) {
                $(targetElement).css('margin-left', '-' + elementWidth * animationProgress + 'px');
            } else if ( scrollPos > animationStart ) {
                $(targetElement).css('margin-left', '-' + elementWidth + 'px');
            } else {
                $(targetElement).css('margin-left', '-' + 0 + 'px');
            }
          
    });
    
};
})(jQuery);