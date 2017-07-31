window.onload=scaleVideo;
window.onresize=scaleVideo;

var vid = document.getElementById('video');

//vid.poster="poster.jpg";
$(".content img").mouseenter(function(){
    
    var vidTime = vid.duration;
    var vidNow = vid.currentTime;
    var minStep = 30.8 / vidTime ; 
    var w = vidNow * minStep ;
    $(".content i").addClass("timeline");
    $(".timeline").css("width",w+"vh");
    $("section").addClass("bg_fadeout");
    $(".content img").attr("src","logo.png");
//    console.log("duration:"+vidTime)
//    console.log("w:"+w)
//    console.log("minStep:"+minStep)
    vid.play();
    
    vid.onended = function(e) {
        vid.play();
        initTimeLine();
    };
    
//    video.addEventListener("ended",  hello());

     
}).mouseleave(function(){
    vid.pause();
//    $(".content p,footer").css("visibility","visible");
//    initTime();
    $(".content i").removeClass("timeline")
    $("section").removeClass("bg_fadeout")
    $(".content img").attr("src","logo.gif");
});

function initTimeLine(){
    $(".timeline").css("width",0);
}

function scaleVideo(){
    var video = document.getElementById('video');
    var win = document.getElementById('content');
    //get window size
    var windowWidth = win.clientWidth;
    var windowHeight = win.clientHeight;
    console.log("win source:"+windowWidth +"......"+windowHeight)
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
    if( windowScale > videoScale){
        video.width = windowWidth;
        video.height = scaleW * videoHeight;
    }else{
        video.width = scaleH * videoWidth;
        video.height = windowHeight;
    }

    video.muted=true;
}



