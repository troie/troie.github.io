$(document).ready(function () {
    $('select').material_select();
    $("#print-type").on("change", function () {
        $(".sub-category").remove();
        var url = "/js/" + $("#print-type").val() + ".json";
        $.getJSON(url, function (data) {
            var items = [];
            $.each(data, function (key, val) {
                items.push("<p><input type=\"checkbox\" id=\"comm_" + key + "\" value=\"" + key + "\"><label for=\"comm_" + key + "\">" + val.community + "</label></p>");
            });

            $("<div/>", {
                "class": "sub-category",
                "name": "sub-category",
                html: items.join("")
            }).insertAfter(".input-field");

        });
    });
    
    $("div").on("click", ".sub-category input", function () {
        event.stopPropagation();
        var commnuity_key = $(this).val();
        var commnuity = "comm-" + commnuity_key;
        if ($(this).prop("checked")) {
            var url = "/js/" + $("#print-type").val() + ".json";
            $.getJSON(url, function (data) {
                var team_member = [];
                team_member.push("<h3>" + data[commnuity_key].community + "</h3>");
                $.each(data[commnuity_key].member, function (key, val) {
                    team_member.push("<li><input type=\"checkbox\" id=\"" + commnuity + "-" + key + "\" name=\"mbr_id\" checked /><label for=\"" + commnuity + "-" + key + "\">" + data[commnuity_key].member[key].nameEn + "</label></li>");
                });

                $("<ul/>", {
                    "class": commnuity + " l_grid clearfix",
                    html: team_member.join("")
                }).appendTo(".main");
            });
        } else {

            $("." + commnuity).remove();
        }

    });

    $(".add").on("click", function () {
        event.stopPropagation();
        var preview_arr = [];
        $(".main li input").each(function (i) {
            if ($(this).prop("checked")) {
                preview_arr.push($(this).attr("id"));
            }
        });
        var tmp = [];
        var tmp_comm_key;
        var url = "/js/" + $("#print-type").val() + ".json";
        $.getJSON(url, function (data) {
            var print_arr = [];

//            team_member.push("<h3>" + data[commnuity_key].community + "</h3>");
            $.each(preview_arr,function(index){
//                console.log(preview_arr[index])
                tmp = preview_arr[index].split("-");
                if( tmp_comm_key == "undefine") tmp_comm_key = tmp[1];
                if( tmp[1] != tmp_comm_key){
                    print_arr.push("<div class=\"comm_title\"><h4>"+data[tmp[1]].community+"</h4></div>");
                    tmp_comm_key = tmp[1];
                }

                var card_data = title = "";
                card_data = "<div><h4>"+data[tmp[1]].member[tmp[2]].nameEn+"</h4>";
                card_data += "<strong>"+data[tmp[1]].member[tmp[2]].nameCh+"</strong>";
                card_data += "<span>"+data[tmp[1]].member[tmp[2]].title.join("")+"</span></div>";
                print_arr.push(card_data);
            });
            $(print_arr.join("")).appendTo(".preview");
//            console.log(print_arr)
            sessionStorage.print_arr = print_arr;
            sessionStorage.preview_arr = preview_arr;
            $(".preview").css("display","block");
            $.print(".preview" /*, options*/);
        });
        
        

    });

});