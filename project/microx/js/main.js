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
});

function initTimeLine(){
    $(".timeline").css("width",0);
}




function scaleVideo(){
    var video = document.getElementById('video');
    //get window size
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
//    console.log(windowWidth +"......"+windowHeight)
    //get movie size
    var videoWidth = video.offsetWidth;
    var videoHeight = video.offsetHeight;
    
    //Scale the ratio
    var widthScale = windowWidth / videoWidth;
    var heightScale = windowHeight / videoHeight;
    
    //以影片高度為基準的縮放比
    if( widthScale > heightScale){
        var scale = widthScale;
    }else{
        var scale = heightScale;
    }
    
    //取得放大後的寬高
    var scarlVideoWidth = videoWidth * scale;
    var scarlVideoHeight = videoHeight * scale; 
    
    video.width=scarlVideoWidth;
    video.height=scarlVideoHeight;
    
//    video.loop=true;
    video.muted=true;
}



