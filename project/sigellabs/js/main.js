$(function () {
    var db = firebase.database();
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    //        var folder = "/dev";
    var folder = "";

    //    var sBrowser, sUsrAg = navigator.userAgent,
    //        sUsrVer = navigator.appVersion;
    //
    //    if (sUsrAg.indexOf("Chrome") > -1) {
    //        sBrowser = "Google Chrome";
    //    } else if (sUsrAg.indexOf("Safari") > -1) {
    //        sBrowser = "Apple Safari";
    //    } else if (sUsrAg.indexOf("Opera") > -1) {
    //        sBrowser = "Opera";
    //    } else if (sUsrAg.indexOf("Firefox") > -1) {
    //        sBrowser = "Mozilla Firefox";
    //    } else if (sUsrAg.indexOf("MSIE") > -1) {
    //        sBrowser = "Microsoft Internet Explorer";
    //    }

    //    alert("You are using: " + sBrowser + " version:" + sUsrVer);

//    window.onload = scaleVideo;
    window.onresize = scaleVideo;

    var vid = document.getElementById('video');
    //    vid.play();
    //    vid.play();
    //    vid.onended = function (e) {
    //        vid.play();
    //    };
//    vid.onloadeddata = function () {
//        console.log(1);
//                vid.play();
//        $(".video div").removeClass("loading").addClass("mask");
//
//    };
    if (video.readyState === 4) {
        // it's loaded
        scaleVideo();
        
//        vid.play();
    }

    //    if ($(window).width() >= 768) {
    //        $(".content img").mouseenter(function () {
    //
    //            //get video total time
    //            var vidTime = vid.duration;
    //            //get video now play time
    //            var vidNow = vid.currentTime;
    //            var minStep = 100 / vidTime;
    //            var w = (vidNow * minStep) + "vw";
    //            $("i").addClass("timeline");
    //            $(".timeline").css("width", w);
    //            $("section").addClass("bg_fadeout");
    //            $(".content img").attr("src", "logo.png");
    //            vid.play();
    //            vid.onended = function (e) {
    //                vid.play();
    //            };
    //
    //        }).mouseleave(function () {
    //            $(".timeline").css("width", 0);
    //            vid.pause();
    //            $("i").removeClass("timeline")
    //            $("section").removeClass("bg_fadeout")
    //            $(".content img").attr("src", "logo.gif");
    //        });
    //    }

    getNav();
    getSocialLink();

    $('#sendMsgButton').on("click", function () {
        var username = $("#username").val();
        var childname = $("#childname").val();
        var age = $("#age").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var message = $("#message").val();

        writeUserData(username, childname, age, email, phone, message, dateTime);
    });
    //    
    //    $('.hello').on('click', 'b', function () {
    //        alert($(this).data('uid'))
    //    });

    function getData() {
        var hello = '<table class="table table-striped"><thead class="thead-dark"><tr><th>家長</th><th>學員</th><th>年齡</th><th>email</th><th>phone</th><th>message</th><th>created</th></tr></thead><tbody>';
        db.ref("users").once('value', function (snapshot) {
            var data = snapshot.val();
            //        console.log(data);
            $.each(data, function (index, value) {
                //            console.log('My array has at position ' + index + ', user: '+ value.username+' // email :'+ value.email+ ' // ctrated:'+value.created);
                hello += '<tr><td>' + value.username + '</td><td>' + value.childname + '</td><td>' + value.age + ' </td><td>' + value.email + '</td><td>' + value.phone + '</td><td>' + value.message + '</td><td>' + value.created + '<b data-uid="' + index + '">del</b></td></tr>';
            });
            hello += '</tbody></table>';
            $(".hello").append(hello);
        });
    }

    function getNav() {
        var url = folder + "/js/menu.json";

        $.getJSON(url, function (data) {
            var navList = [];

            $.each(data, function (key, val) {
                navList.push("<li><li class=\"nav-item mx-0 mx-lg-1\"><a class=\"nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger\" href=\"" + data[key].link_url + "\">" + data[key].link_name + "</a></li>");
            });
            $(".navbar-nav").append(navList);
        });
    }

    function scaleVideo() {
        var video = document.getElementById('video');
        var win = document.getElementById('content');
        //get window size
        var windowWidth = win.clientWidth;
        var windowHeight = win.clientHeight;
        //        console.log("win source:" + windowWidth + "......" + windowHeight)
        //    var ws = windowWidth / windowHeight

        //get movie size
        var videoWidth = video.offsetWidth;
        var videoHeight = video.offsetHeight;

        //Scale the ratio
        var windowScale = windowWidth / windowHeight;
        var videoScale = videoWidth / videoHeight;
        var scaleW = windowWidth / videoWidth;
        var scaleH = windowHeight / videoHeight;

        //以影片高度為基準的縮放
        if (windowScale > videoScale) {
            video.width = windowWidth;
            video.height = scaleW * videoHeight;
        } else {
            video.width = scaleH * videoWidth;
            video.height = windowHeight;
        }
        $(".video div").removeClass("loading").addClass("mask");
        video.play();
        //    var scale = widthScale;

        //取得放大後的寬高
        //    var scarlVideoWidth = videoWidth * scale;
        //    var scarlVideoWidth = videoWidth * widthScale;
        //    var scarlVideoHeight = videoHeight * scale; 
        //    var scarlVideoHeight = videoHeight * heightScale; 
        //    console.log("win target:"+scarlVideoWidth +"......"+scarlVideoHeight)
        //    video.width=scarlVideoWidth;
        //    video.height=scarlVideoHeight;

        //    video.loop=true;
        video.muted = true;
    }

    function getSocialLink() {
        var url = folder + "/js/social_media.json";
        $.getJSON(url, function (data) {
            var socialList = [];

            $.each(data, function (key, val) {
                socialList.push("<li class=\"list-inline-item\"><a class=\"btn btn-outline-light btn-social text-center rounded-circle\" title=\"" + data[key].link_name + "\" href=\"" + data[key].link_url + "\"><i class=\"fab fa-fw " + data[key].link_icon + "\"></i></a></li>");
            });
            //        alert(socialList);
            $(".sociallist").append(socialList);
        });
        //    <li class=\"list-inline-item\"><a class=\"btn btn-outline-light btn-social text-center rounded-circle\" title=\""+ data[key].link_name +"\" href=\""+ data[key].link_url +"\"><i class=\"fab fa-fw "+ data[key].link_icon +"\"></i></a></li>
    }

    function writeUserData(name, child, age, email, mobile, msg, created) {
        var newPostKey = firebase.database().ref().child('posts').push().key;
        //    firebase.database().ref('users/' + newPostKey).set({
        db.ref('users/' + newPostKey).set({
                username: name,
                childname: child,
                age: age,
                email: email,
                phone: mobile,
                message: msg,
                created: created
            })
            .then(function () {
                alert('報名成功！')
                //            console.log("username=" + name + " / email=" + email + "/ message=" + msg + " / today=" + created + " key = " + newPostKey);
            })
            .catch(function (error) {
                alert('失敗了');
                console.log("失敗了");
            });
    }

    
    function delUserData() {
        //        alert(1);
        //    alert($(this).data('uid'));
        db.ref("users/" + uid).remove();
    }

    function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name + ': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    }

    function displayJoinMember(email) {
        $('ul').prepend($('<li/>').text(email)).appendTo($('#sign_up'));
        $('#sign_up')[0].scrollTop = $('#sign_up')[0].scrollHeight;
    }
});
