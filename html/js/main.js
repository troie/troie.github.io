$("h1 a").mouseenter(function(){
    $("section").css("background","rgba(0,0,0,0)")
}).mouseleave(function(){
    $("section").css("background","rgba(0,0,0,1)")
});
window.onload=scaleVideo;
window.onresize=scaleVideo;

function scaleVideo(){
    var video = document.getElementById('video');
    //get window size
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    
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


window.addEventListener("scroll",parallax,false);
function parallax(){
    var palx1 = document.getElementById('palx1');
//    var palx2 = document.getElementById('palx2');
//    var here = document.getElementById('here');
    var scroll = window.pageYOffset;
    palx1.style.top = (window.pageYOffset*1)+"px";
//    palx2.style.left = (window.pageYOffset*4)+"px";
//    here.innerHTML = scroll;
}
