function debugWindowSize() {
    if( $('#debugwindowsize').length ){
        s = $('#debugwindowsize');
    } else {
        $(window).resize(debugWindowSize);
        s = $('<span id="debugwindowsize"></span>').appendTo('body');
    }
    s.text( $(window).width() );
}

function topAndTailDropdowns() {
    $('.dropdown-menu.top-tail').each(function(){
        $('<li>').addClass('dropdown-tail-outline').appendTo($(this));
        $('<li>').addClass('dropdown-tail').appendTo($(this));
    });
}

$(function(){

    debugWindowSize();

    $('.dropdown-menu input, .dropdown-menu label').on('click', function(e){
        e.stopPropagation();
    });

});