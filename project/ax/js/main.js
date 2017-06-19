window.onload=scaleVideo;
window.onresize=scaleVideo;

var vid = document.getElementById('video');
vid.onended = function() {console.log(1)};

$(".content img").mouseenter(function(){
    
    //get video total time
    var vidTime = vid.duration;
    //get video now play time
    var vidNow = vid.currentTime;
    var minStep = 100 / vidTime ; 
    var w = (vidNow * minStep)+"vw" ;
    $("i").addClass("timeline");
    $(".timeline").css("width",w);
    $("section").addClass("bg_fadeout");
    $(".content img").attr("src","logo.png");
    vid.play();
    vid.onended = function(e) {
        vid.play();
    };
     
}).mouseleave(function(){
    $(".timeline").css("width",0);
    vid.pause();
    $("i").removeClass("timeline")
    $("section").removeClass("bg_fadeout")
    $(".content img").attr("src","logo.gif");
});



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
    video.muted=true;
}



