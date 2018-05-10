jQuery(document).ready(function ($) {

    getData();
    function getData() {
        var url = "/js/data.json";

        $.getJSON(url, function (data) {
            var edata = [];

            $.each(data, function (key, val) {
                edata.push("<li id=\"" + "item_" + key + "\" data-index=\"" + key + "\"><div><aside><i>Vol." + val.doc_vol + "</i><strong>" + val.title_en + "</strong><p>" + val.title_cn + "</p></aside><img src=\"img/doc_" + val.doc_vol + ".jpg\"></div></li>");
            });

            $("<ul/>", {
                html: edata.join(""),
                id: "menu_item"
            }).appendTo(".menu");

        });
    }
}