jQuery(document).ready(function ($) {
//    $('.slider').unslider({
//        autoplay:true,
//        arrows:false
//    });
    
    var loadFile = $(this).data('doc')
    $(".canvas li").click(function(){
        var url = "/"+$(this).data('doc')+".html";
        location.href= (url); 
    });
});