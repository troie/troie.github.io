var video = document.getElementById('video');
video.loop=true;
video.poster="poster.jpg";
$(".content a").mouseenter(function(){
//    $("section").css("background","rgba(0,0,0,0)")
    video.play();
}).mouseleave(function(){
//    $("section").css("background","rgba(0,0,0,1)")
    video.pause();
});
window.onload=scaleVideo;
window.onresize=scaleVideo;

function scaleVideo(){
    var video = document.getElementById('video');
    //get window size
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    console.log(windowWidth +"......"+windowHeight)
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
//    video.pause=true;
    video.muted=true;
}



