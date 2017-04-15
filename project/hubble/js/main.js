jQuery(document).ready(function ($) {
    $('.banner').unslider({
        autoplay:true,
        arrows:false
    });
    
    var loadFile = $(this).data('doc')
    $(".canvas li").click(function(){
        var url = "/"+$(this).data('doc')+".html";
        location.href= (url); 
    });
    
    var url = "/js/main-page.json";
        $.getJSON(url, function (data) {
            var items = [];
            $.each(data, function (key, val) {
                items.push("<li data-doc=\"html_"+ val.doc_id +"\"><h1>"+val.title+"</h1><img src=\"http://lorempixel.com/800/200/food/"+ val.doc_id +"\"></li>");
                
            });
//            $

            $("<ul/>", {
                html: items.join("")
            }).insertAfter("h1");

        });
});