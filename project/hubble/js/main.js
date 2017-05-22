jQuery(document).ready(function ($) {
    //    $('.banner').unslider({
    //        autoplay: true,
    //        arrows: false
    //    });

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
        //        alert($(this).data('id'));

        getComment();

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
        localStorage["pageId"] = "";
        var url = "/js/main-page.json";
        $.getJSON(url, function (data) {
            var items = [];
            $.each(data, function (key, val) {
                items.push("<li data-index=\"" + key + "\"><aside><i>Vol." + val.doc_vol + "</i><strong>" + val.title_en + "</strong><p>" + val.title_cn + "</p></aside><img src=\"http://lorempixel.com/800/250/food/" + val.doc_vol + "\"></li>");
            });

            $("<ul/>", {
                html: items.join("")
            }).appendTo(".menu");

        });
    }

    function getPage(pageId) {
        $(".menu").html("");
        if(localStorage.getItem("pageId")) pageId = localStorage.getItem("pageId");
        localStorage.setItem("pageId", pageId);

        var url = "/js/main-page.json";
        $.getJSON(url, function (data) {
            //            var items = [];
            //            $.each(data, function (key, val) {
            //                items.push("<li data-doc=\"html_" + val.doc_vol + "\"><aside><i>Vol." + key+"."+val.doc_vol + "</i><strong>" + val.title_en + "</strong><p>" + val.title_cn + "</p></aside><img src=\"http://lorempixel.com/800/250/food/" + val.doc_vol + "\"></li>");
            //            });
            //
            //            $("<ul/>", {
            //                html: items.join("")
            //            }).appendTo(".menu");
//            alert(data[pageId].description)

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
                "<img src='img/doc_" + data[pageId].doc_vol + ".jpg'>" +
                "<p>" + data[pageId].description + "</p>" +
                "</div>";
//                getSliderData(pageId)
            var slider=getSliderData(pageId);
            console.log(slider)
                page += "<div class=\"page_down\">" +slider+
//                "<div class=\"slider\">" +
//                "<ul>" +
//                "<li data-id=\"1\">" +
//                "<b>Harry</b>" +
//                "<p>超爱 Peaseful Cusine 系列视频，原因是制作人从新的角度展示食物，我们常常从视觉嗅觉味觉来观察食物，唯独忘了听觉，不加配乐，只用切菜、开火、煮汤等做菜同期声，在极简影像风格中放大听觉，刺激观众的想象。</p>" +
//                "</li>" +
//                "<li data-id=\"2\">" +
//                "<b>Tim</b>" +
//                "<p>超爱 Peaseful Cusine 系列视频，原因是制作人从新的角度展示食物，我们常常从视觉嗅觉味觉来观察食物，唯独忘了听觉，不加配乐，只用切菜、开火、煮汤等做菜同期声，在极简影像风格中放大听觉，刺激观众的想象。</p>" +
//                "</li>" +
//                "<li data-id=\"3\">" +
//                "<b>Troie</b>" +
//                "<p>超爱 Peaseful Cusine 系列视频，原因是制作人从新的角度展示食物，我们常常从视觉嗅觉味觉来观察食物，唯独忘了听觉，不加配乐，只用切菜、开火、煮汤等做菜同期声，在极简影像风格中放大听觉，刺激观众的想象。</p>" +
//                "</li>" +
//                "</ul>" +
//                "</div>" +
                "</div>" +
                "<img class=\"background\" src=\"img/doc_1.jpg\">";
            $(page).appendTo(".page");
            $('.slider').unslider({
                //            autoplay: true,
                //            arrows: false
                infinite: true
            });
        });




    }
    
    function getSliderData(pageId) {
        var url = "/js/comment/comment_"+pageId+".json";
//        alert(url)
        var slider;
        $.getJSON(url, function (data) {
            var items = [];
            $.each(data, function (key, val) {
                items.push("<li data-index=\"" + key + "\"><b>"+val.commentator+"</b><p>"+val.comment+"</P</li>");
            });
            slider = "<div class=\"slider\"><ul>"+items.join("")+"</ul></div>";
//            hello(slider);
        });
        return slider;
    }
    
    function hello(slider){
//        alert(slider);
        console.log(slider)
        return slider
    }
    function getComment() {
        $(".page").html("");
        //        alert(1)
        var content = "<header>" +
            "<h1>Postproduction:Practically Magic</h1>" +
            "</header>" +
            "<div>" +
            "<b>Harry</b>" +
            "<p>故事虽老套但表演非常细腻。小女孩和美队太有爱，尤其爱夕阳日落在海滩的那段，小姑娘在美队身上爬来爬去的太甜。美队说要少接甚至不接超级英雄角色，因为有碍于他获得别的角色或者投入精力去演好别的角色，真是太对了。美队还是很有潜力去演一些更深刻更细腻的角色的，从午夜邂逅开始就这么认为。</p>" +
            "<p>“He wanted me before I was smart”。简单却惊喜的一部片，不止故事好，包括小萝莉在内的几位演员都表现抢眼。现实中家长都希望自己孩子成为天才，而美队饰演的舅舅却希望自己的天才外甥女能像普通人一样生活，家长们真应该组团来看这部片啊。另外，美队哪像当过哲学教授的人啊，体育学教授更像吧。</p>" +
            "<p>其实看这部电影除了获得满满的温馨之外，更让我受益的是男主的与侄女交流的方式， 印象较深的是两个场景： 1.男主因为Mary看到自己的老师早晨出现他们家里而感到尴尬，就对Mary发了火，说了一些气话，然后Mary就自己窝在床上生闷气，男主过了一段时间来向Mary道歉，请求原谅</p>" +
            "<p>其实看这部电影除了获得满满的温馨之外，更让我受益的是男主的与侄女交流的方式， 印象较深的是两个场景： 1.男主因为Mary看到自己的老师早晨出现他们家里而感到尴尬，就对Mary发了火，说了一些气话，然后Mary就自己窝在床上生闷气，男主过了一段时间来向Mary道歉，请求原谅</p>" +
            "</div>" +
            "<footer></footer>" +
            "<img class=\"background\" src=\"img/doc_1.jpg\">";
        //        console.log(content2);
        //        alert(content)
        $(content).appendTo(".comment");
    }

    function getArea() {
        //        var inputValue = document.getElementById("txtArea").value;
        var content = inputValue.replace(/\r\n/g, "\n").split("\n");
    }
});
