if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js')
             .then(function() { console.log('Service Worker Registered'); });
}

jQuery(document).ready(function($){

    getData();
    function getData() {
        var url = "js/data.json";

        $.getJSON(url, function (data) {
            var edata = [];

            $.each(data, function (key, val) {
                euri = "pages/"+val.title+".htm";
//                edata.push("<li><a target=\"_blank\" href=\"pages/"+val.title+".htm\">" + val.title + "</a><date>" + val.date + "</date></li>");
                edata.push("<li><a target=\"_blank\" href=\""+euri+"\">" + val.title + "</a><date>" + val.date + "</date></li>");
            });
console.log("edata="+edata);
            $("<ul/>", {
                html: edata.join(""),
                id: "menu_item"
            }).appendTo(".list");

        });
    }
});