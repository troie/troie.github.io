jQuery(document).ready(function ($) {
    //    $('.banner').unslider({
    //        autoplay: true,
    //        arrows: false
    //    });

    getMenuData();

    var loadFile = $(this).data('doc');

    $(".menu").on("click", "li", function () {
        getPage();
    });

    $(".page").on("click", "h2", function () {
        $(".page").html("");
        getMenuData();
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
        getMenuData();
    });


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
        var page = "<div class=\"page_up\">" +
            "<h1>Postproduction:Practically Magic</h1>" +
            "<ascid><i>8.0</i>豆瓣评分</ascid>" +
            "<dl>" +
            "<dt>Director</dt>" +
            "<dd>Masami Watanabe</dd>" +
            "<dt>Country</dt>" +
            "<dd>Japan</dd>" +
            "<dt>Type</dt>" +
            "<dd>TV Series</dd>" +
            "<dt>Runtime</dt>" +
            "<dd>28 mins</dd>" +
            "<dt>Year</dt>" +
            "<dd>2014</dd>" +
            "</dl>" +
            "<img src='img/doc_1.jpg'>" +
            "<p>「Japanology Plus」是 NHK world 节目「Begin Japanology」的另一新系列，轻松愉快地向海外观众介绍日本文风土人情。BEGIN Japanology 是日本 NHK World TV 面向海外观众播放的英语系列节目，始播于 2009 年，每周一期，每期 30 分钟，主要介绍日本文化和风土人情等。对喜欢日本的人来说，该节目信息量丰富，是了解日本的窗口。</p>" +
            "</div>" +
            "<div class=\"page_down\">" +
            "<div class=\"banner\">" +
            "<ul>" +
            "<li data-id=\"1\">" +
            "<b>Harry</b>" +
            "<p>超爱 Peaseful Cusine 系列视频，原因是制作人从新的角度展示食物，我们常常从视觉嗅觉味觉来观察食物，唯独忘了听觉，不加配乐，只用切菜、开火、煮汤等做菜同期声，在极简影像风格中放大听觉，刺激观众的想象。</p>" +
            "</li>" +
            "<li data-id=\"2\">" +
            "<b>Tim</b>" +
            "<p>超爱 Peaseful Cusine 系列视频，原因是制作人从新的角度展示食物，我们常常从视觉嗅觉味觉来观察食物，唯独忘了听觉，不加配乐，只用切菜、开火、煮汤等做菜同期声，在极简影像风格中放大听觉，刺激观众的想象。</p>" +
            "</li>" +
            "<li data-id=\"3\">" +
            "<b>Troie</b>" +
            "<p>超爱 Peaseful Cusine 系列视频，原因是制作人从新的角度展示食物，我们常常从视觉嗅觉味觉来观察食物，唯独忘了听觉，不加配乐，只用切菜、开火、煮汤等做菜同期声，在极简影像风格中放大听觉，刺激观众的想象。</p>" +
            "</li>" +
            "</ul>" +
            "</div>" +
            "</div>" +
            "<img class=\"background\" src=\"img/doc_1.jpg\">";
        $(page).appendTo(".page");

        $('.banner').unslider({
            autoplay: true,
            arrows: false
        });
    }

    function getComment() {
        $(".page").html("");
        //        alert(1)
        var content = "<header>"+
"<h1>Postproduction:Practically Magic</h1>"+
"</header>"+
"<div>"+
"<b>Harry</b>"+
"<p>故事虽老套但表演非常细腻。小女孩和美队太有爱，尤其爱夕阳日落在海滩的那段，小姑娘在美队身上爬来爬去的太甜。美队说要少接甚至不接超级英雄角色，因为有碍于他获得别的角色或者投入精力去演好别的角色，真是太对了。美队还是很有潜力去演一些更深刻更细腻的角色的，从午夜邂逅开始就这么认为。</p>"+
"<p>“He wanted me before I was smart”。简单却惊喜的一部片，不止故事好，包括小萝莉在内的几位演员都表现抢眼。现实中家长都希望自己孩子成为天才，而美队饰演的舅舅却希望自己的天才外甥女能像普通人一样生活，家长们真应该组团来看这部片啊。另外，美队哪像当过哲学教授的人啊，体育学教授更像吧。</p>"+
"<p>其实看这部电影除了获得满满的温馨之外，更让我受益的是男主的与侄女交流的方式， 印象较深的是两个场景： 1.男主因为Mary看到自己的老师早晨出现他们家里而感到尴尬，就对Mary发了火，说了一些气话，然后Mary就自己窝在床上生闷气，男主过了一段时间来向Mary道歉，请求原谅</p>"+
"<p>其实看这部电影除了获得满满的温馨之外，更让我受益的是男主的与侄女交流的方式， 印象较深的是两个场景： 1.男主因为Mary看到自己的老师早晨出现他们家里而感到尴尬，就对Mary发了火，说了一些气话，然后Mary就自己窝在床上生闷气，男主过了一段时间来向Mary道歉，请求原谅</p>"+
"</div>"+
"<footer></footer>"+
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
