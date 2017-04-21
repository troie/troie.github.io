var video = document.getElementById('video');

video.poster="poster.jpg";
$(".content img").mouseenter(function(){
    video.play();
    
    $(".content i").addClass("timeline")
//    console.log("duration:"+video.duration)
//    console.log("currentTime:"+video.currentTime)

//    var i= video.currentTime;
    var vidTime = video.duration;

    var vidNow = video.currentTime;
    var minStep = 30.8 / vidTime
    var i=0;
    console.log("i="+vidNow);
//    console.log("vidTime="+vidTime+" is "+typeof(vidTime));
//    console.log("minStep="+typeof(minStep));
    console.log("vidTime="+vidTime);
//    while(i <= vidTime){
//        console.log("i="+i);
//        $(".content i").css("width",i+"vh");
//        i += minStep;
//        if(i > vidTime) i=0;
//    }
//    for( i=vidNow.currentTime; i <=  4; i++){
////        $(".content i").css("width",i+"vh");
//        console.log("i="+i);
////        i= i+.1;
//    }
    
}).mouseleave(function(){
    video.pause();
    $(".content i").removeClass("timeline")
});

window.onload=scaleVideo;
window.onresize=scaleVideo;
window.blur=scaleVideo;

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
    
    video.loop=true;
    video.muted=true;
}



