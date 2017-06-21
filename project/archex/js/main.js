window.onload = scaleVideo;
window.onresize = scaleVideo;

var vid = document.getElementById('video');
if ($(window).width() >= 768) {
    $(".content img").mouseenter(function () {
        vid.play();
        //get video total time
        var vidTime = vid.duration;
        //get video now play time
        var vidNow = vid.currentTime;
        var minStep = 100 / vidTime;
        var w = (vidNow * minStep) + "vw";
        $("i").addClass("timeline");
        $(".timeline").css("width", w);
        $("section").addClass("bg_fadeout");
        $(".content img").attr("src", "logo.png");
        
        vid.onended = function (e) {
            vid.play();
        };
    }).mouseleave(function () {
        $(".timeline").css("width", 0);
        vid.pause();
        $("i").removeClass("timeline")
        $("section").removeClass("bg_fadeout")
        $(".content img").attr("src", "logo.gif");
    });
}


function scaleVideo() {
    var video = document.getElementById('video');
    var win = document.getElementById('content');
    //get window size
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    //    console.log("window Width:" + windowWidth + " // window Height:" + windowHeight);

    //get movie size
    var videoWidth = video.videoWidth;
    var videoHeight = video.videoHeight;
    //    console.log("video Width:" + videoWidth + " // video Height:" + videoHeight);
    //Scale the ratio
    var windowScale = windowWidth / windowHeight;
    var videoScale = videoWidth / videoHeight;
    //    console.log("window Scale:" + windowScale + " // video Scale:" + videoScale);
    var scaleW = windowWidth / videoWidth;
    var scaleH = windowHeight / videoHeight;
    //    console.log("scaleW:" + scaleW + " // scaleH:" + scaleH);
    //以影片高度為基準的縮放
    if (windowScale > videoScale) {
        video.width = windowWidth;
        video.height = scaleW * videoHeight;
        //        video.width = windowWidth;
        //        console.log("scale size:" + windowWidth + "......" + scaleW * videoHeight)
    } else {
        video.width = scaleH * videoWidth;
        video.height = windowHeight;
    }
    //    console.log("scale size:" + windowWidth + "......" + windowHeight)
    video.muted = true;
}
