jQuery(document).ready(function ($) {

    getData();

    var loadFile = $(this).data('doc');

    $(".menu").on("click", "li", function () {
        getPage($(this).data('index'));
    });

    $(".page").on("click", "h2", function () {
        $(".page").html("");
        getData();
    });

    $(".page").on("click", "li", function () {
        getComment($(this).data('index'));

    });
    $(".comment").on("click", "div", function () {
        $(".comment").html("");
        getPage();
    });
    $(".page").on("click", ".page_up", function () {
        $(".page").html("");
        getData();
    });

    function getData() {
        localStorage.removeItem('pageId');
        localStorage.removeItem('title');
        var url = "/js/main-page.json";
        $.getJSON(url, function (data) {
            var items = [];
            $.each(data, function (key, val) {
                items.push("<li data-index=\"" + key + "\"><aside><i>Vol." + val.doc_vol + "</i><strong>" + val.title_en + "</strong><p>" + val.title_cn + "</p></aside><img src=\"http://lorempixel.com/800/500/food/" + key + "\"></li>");
            });

            $("<ul/>", {
                html: items.join("")
            }).appendTo(".menu");

        });
//        console.log("pageId"+localStorage.getItem('pageId'));
    }

    function getPage(pageId) {
        $(".menu").html("");
        if(!localStorage.getItem('pageId')) localStorage.setItem('pageId', pageId);
        else pageId = localStorage.getItem('pageId');

        var url = "/js/main-page.json";
        $.getJSON(url, function (data) {
            localStorage.setItem('title', data[pageId].title_en);
            var page = "<div class=\"page_up\">" +
                "<h1>" + data[pageId].title_en + "</h1>" +
                "<ascid><i>" + data[pageId].score + "</i>豆瓣评分</ascid>" +
                "<dl>" +
                "<dt>Director</dt><dd>" + data[pageId].director + "</dd>" +
                "<dt>Country</dt><dd>" + data[pageId].country + "</dd>" +
                "<dt>Type</dt><dd>" + data[pageId].type + "</dd>" +
                "<dt>Runtime</dt><dd>" + data[pageId].runtime + "</dd>" +
                "<dt>Year</dt><dd>" + data[pageId].year + "</dd>" +
                "</dl>" +
                "<img src='http://lorempixel.com/270/360/food/" + pageId + "'>" +
//                "<img src='img/doc_" + data[pageId].doc_vol + ".jpg'>" +
                "<p>" + data[pageId].description + "</p>" +
                "</div>";
            $(page).appendTo(".page");
            getSliderData(pageId);
            $("<img class=\"background\" src=\"http://lorempixel.com/270/360/food/"+pageId+"\">").appendTo(".page");
//            $("<img class=\"background\" src=\"img/doc_1.jpg\">").appendTo(".page");
        });
//        console.log("pageId"+localStorage.getItem('pageId'));
    }

    function getSliderData(pageId) {
        var url = "/js/comment/comment_" + pageId + ".json";
        var sliderData;
        $.getJSON(url, function (data) {
            sliderData = data;
            makeSlider(data)
        });
    }

    function makeSlider(sliderData) {
        var slider, page, comment;
        var items = [];
        $.each(sliderData, function (key, val) {
            comment = val.comment.split("\n");
//            console.log(comment)
            items.push("<li data-index=\"" + key + "\"><b>" + val.commentator + "</b><p>" + comment[0] + "</P</li>");
        });
        slider = "<div class=\"slider\"><ul>" + items.join("") + "</ul></div>";
        page = "<div class=\"page_down\">" + slider + "</div>";
        $(page).insertAfter(".page_up");

        $('.slider').unslider({
            autoplay: true,
            arrows: false
            //                infinite: true
        });
    }

    function getComment(commId) {
        $(".page").html("");
        
        var pageId = localStorage.getItem('pageId');
        var url = "/js/comment/comment_" + pageId + ".json";
        var sliderData;
        $.getJSON(url, function (data) {
            var content = "<header>" +
            "<h1>"+commId+" "+localStorage.getItem('title')+"</h1>" +
            "</header>" +
            "<div>" +
            "<b>"+data[commId].commentator+"</b>" + makeComment(data[commId].comment) + "</div>" +
            "<footer></footer>" +
            "<img class=\"background\" src=\"http://lorempixel.com/270/360/food/"+pageId+"\">";

            $(content).appendTo(".comment");
        });
    }

    function makeComment( str ) {
        //        var inputValue = document.getElementById("txtArea").value;
       
        var content = (str).split("\n");
         var items=[];
        $.each(content, function (key, val) {
            
//            console.log(comment)
            items.push("<p>" + val + "</p>");
        });
        return items.join("");
    }
});
