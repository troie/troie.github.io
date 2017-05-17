jQuery(document).ready(function ($) {
    $('.banner').unslider({
        autoplay: true,
        arrows: false
    });
    getMenuData();
    var loadFile = $(this).data('doc')
    $(".menu").on("click", "li", function() {
        getPage();
    });

    $(".page").on("click", "h2", function() {
        $(".page").html("");
//        $(".menu").css("height","100%");
        getMenuData();
//        alert(1);
    });


    //    var url = "/js/main-page.json";
    //    $.getJSON(url, function (data) {
    //        var items = [];
    //        $.each(data, function (key, val) {
    //            items.push("<li data-doc=\"html_" + val.doc_vol + "\"><aside><i>Vol." + val.doc_vol + "</i><strong>" + val.title_en + "</strong><p>" + val.title_cn + "</p></aside><img src=\"http://lorempixel.com/800/250/food/" + val.doc_vol + "\"></li>");
    //
    //        });
    //
    //        $("<ul/>", {
    //            html: items.join("")
    //        }).insertAfter("h1");
    //
    //    });

    function getMenuData() {
        var url = "/js/main-page.json";
        $.getJSON(url, function (data) {
            var items = [];
            $.each(data, function (key, val) {
                items.push("<li data-doc=\"html_" + val.doc_vol + "\"><aside><i>Vol." + val.doc_vol + "</i><strong>" + val.title_en + "</strong><p>" + val.title_cn + "</p></aside><img src=\"http://lorempixel.com/800/250/food/" + val.doc_vol + "\"></li>");

            });

            $("<ul/>", {
                html: items.join("")
            }).appendTo(".menu");

        });
    }

    function getPage() {
        $(".menu").html("");
//        $(".menu").css("height",0);
        var page = "<h2>Postproduction:Practically Magic</h2>";
        $(page).appendTo(".page");
    }
});
