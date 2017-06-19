$(document).ready(function(){
	$('body').removeClass();
	$('body').addClass(getStyle());
	$('body').css("background-image",getRandomBg());
//    window.screen.lockOrientation(["portrait-primary","portrait-secondary"]);
    var lang = getLang();
    $("."+lang+"_btn").addClass('on');
    $("."+lang).removeClass('hidden');

    if(getStoreSession('firstTime')){
        $('.off').hide();
        $('body').css('overflow','auto');
    }

    $('.s6 .left li').on('click',function(){
        $("body,html").animate({ scrollTop: ($('.s6').offset().top -= 150) }, 800);
		$('.program').addClass('page_on').css('z-index','6');
		$('body').css('overflow','hidden');
		$('.s6 .left').css('z-index','7');
		$('.s6 .left').addClass('on');
		$('.s6 .right').css('z-index','4');
		$('.s6 li').removeClass('here');
		$(this).addClass('here');
		var loadFile = $(this).data('doc').split('_');
		var loadFileName = loadFile[0]+"_"+getLang()+'_'+loadFile[1]+'.html';
		$('.program .right').load("doc/"+loadFileName);
		$('.program .left').html('');
	});

	$('.s6 .right li').on('click',function(){
        $("body,html").animate({ scrollTop: ($('.s6').offset().top -= 150) }, 800);
		$('.program').addClass('page_on').css('z-index','6');
		$('body').css('overflow','hidden');
		$('.s6 .right').css('z-index','7');
        $('.s6 .right').addClass('on');
		$('.s6 .left').css('z-index','4');
		$('.s6 li').removeClass('here');
        $(this).addClass('here');
		var loadFile = $(this).data('doc').split('_');
		var loadFileName = loadFile[0]+"_"+getLang()+'_'+loadFile[1]+'.html';
		$('.program .left').load("doc/"+loadFileName);
		$('.program .right').html('');
	});

     $('.close_btn').on('click',function(){
        $('.program').removeClass('page_on');
        $('.program').css('z-index','0');
        $('body').css('overflow','auto');
//        $('.s3 div').css('z-index','6');
        $('.s6 div').css('z-index','4');
        $('.s6 div').removeClass('on');
         $('.s6 li').removeClass('here');
     });

//    $('#cube').mouseenter(function(){
//        $('#cube').addClass('show-top')
//    }).mouseleave(function(){
//        $('#cube').removeClass('show-top')
//    });

    $("body,html").animate({ scrollTop: "0" });
});

    $('.lang').on('.en_btn','click',function(){
        storeLocal("lang","en");
        lang = 'en';
        $('.en_btn').addClass('on');
        $('.ch_btn').removeClass('on');
        $('.en').removeClass('hidden');
        $('.ch').addClass('hidden');
    });

    $('.lang').on('.ch_btn','click',function(){
        storeLocal("lang","ch");
        lang = 'ch';
        $('.ch_btn').addClass('on');
        $('.en_btn').removeClass('on');
        $('.ch').removeClass('hidden');
        $('.en').addClass('hidden');
    });

    $('.on').on('click',function(){
        $('.off').hide();
    	storeSession('firstTime',1);
        $('body').css('overflow','auto');
    });

    $('.pebbo a').on('click',function(){
        scrollTo('.s2');
    });

     $('.contact_us .on').on('click',function(){
        scrollTo('.s1');
         $('.off').show("13000");
         $('body').css('overflow','hidden');
    });


    $('.s10 aside li').on('mouseenter',function(){
        $('.s10 aside li').removeClass();
        $(this).toggleClass('hover');
    });

    $('.guide div, .guide aside li').on('mouseenter',function(){
        $('.guide div').removeClass('here');
        $('.guide aside li').removeClass();
    });

    $('.c1').on('mouseenter',function(){$('.guide aside li').removeClass('hover');$('.guide aside li:nth-child(4)').addClass('hover');});
    $('.c2').on('mouseenter',function(){$('.guide aside li').removeClass('hover');$('.guide aside li:nth-child(3)').addClass('hover');});
    $('.c3').on('mouseenter',function(){$('.guide aside li').removeClass('hover');$('.guide aside li:nth-child(2)').addClass('hover');});
    $('.c4').on('mouseenter',function(){$('.guide aside li').removeClass('hover');$('.guide aside li:nth-child(1)').addClass('hover');});

    $('.guide aside li:nth-child(4)').on('mouseenter',function(){$('.c1').addClass('here');$('.guide aside li').removeClass('hover');$('.guide aside li:nth-child(4)').addClass('hover');});
    $('.guide aside li:nth-child(3)').on('mouseenter',function(){$('.c2').addClass('here');$('.guide aside li').removeClass('hover');$('.guide aside li:nth-child(3)').addClass('hover');});
    $('.guide aside li:nth-child(2)').on('mouseenter',function(){$('.c3').addClass('here');$('.guide aside li').removeClass('hover');$('.guide aside li:nth-child(2)').addClass('hover');});
    $('.guide aside li:nth-child(1)').on('mouseenter',function(){$('.c4').addClass('here');$('.guide aside li').removeClass('hover');$('.guide aside li:nth-child(1)').addClass('hover');});

    $('.question li').on('click',function(){
        var show = "";
        $('.question li').removeClass('here');
        $(this).addClass('here');
        $(".team li").removeClass('question1 question2 question3').addClass($(this).data('question')).fadeIn(1000);
        show = $(this).data('question');
    });

    $('.nav_point li>a').on("click",function(){
        $("body,html").animate({ scrollTop: $("."+$(this).data('section')).offset().top }, 2000, 'easeOutExpo');
    });

    window.addEventListener('scroll', parallax, false);
function getLang(){
    var lang = getLocalStore("lang");
    if(lang){
        return lang;
    }else{
        return 'ch';
    }

}
function getStyle(){
	var i = Math.floor(((Math.random() * 100)/10)+1);
	if(i>4) i-=6;
	if(i<=0) i =1;
	return "style_0"+i;
}

function getRandomBg(){
	var i = Math.floor(((Math.random() * 100)/10)+1);
	if(i>4) i-=6;
	if(i<=0) i =1;
	return "url(../img/bg0"+i+".jpg)";
}

function loadPage(page,side){
    var thisPage = '.program .'+side;
    $(thisPage).load(page);
    storeLocal("lang",page.split('_')[1]);
}

function changeText(cont1,cont2,speed){
	var Otext=cont1.text();
	var Ocontent=Otext.split("");
	var i=0;
	function show(){
		if(i<Ocontent.length)
		{
			cont2.append(Ocontent[i]);
			i=i+1;
		}
	}
		var Otimer=setInterval(show,speed);
}

var winH = 680;
var halfH = winH/2;
var touchH = 100;
var s1 = 0;
var s2 = winH;
var s3 = winH * 2;
var s5 = s3 + winH;
var s6 = s5 + 307;
var s7 = s6 + winH;
var s8 = s7 + winH;
var s9 = s8+ winH;
var s10 = s9 + 1100;
var s11 = s10 + winH;
var s12 = s11 + winH;

function parallax(){
    var scroll = window.pageYOffset;
//    var direction = scrollDirection();
    if(scroll > 0) $('#cube:not(show-top)').addClass('show-top');
    else $('#cube').removeClass('show-top');
    if(scroll < s2 && scroll>0){
        resetNav();
        $('.nav_point li:nth-child(1)').addClass('here');
    }

    if(scroll > s2-touchH && scroll<s3+30){
        $('.s2 h2').addClass("underline");
    }else{
        $('.s2 h2').removeClass("underline");
    }

    if(scroll > s2 && scroll < s3){
        $('.business img').css({'position':'fixed','z-index':0,'left':'511px'});
        resetNav();
        $('.nav_point li:nth-child(2)').addClass('here');
    }else{
        $('.business img').css({'position':'absolute'});
    }

    if(scroll > s3 && scroll < s6){
        resetNav();
        $('.nav_point li:nth-child(3)').addClass('here');
    }

    if(scroll > s3-touchH && scroll<s3+30){
        $('.s3:not(.bgcolor)').addClass("bgcolor");
            $('.s3 > header').removeClass('fadeOut').addClass('fadeIn');
    }else{
        $('.s3').removeClass("bgcolor");
        $('.s3 > header').removeClass('fadeIn').addClass('fadeOut');
    }

//    if(scroll > s5-500 && scroll < s6){
//        $('.s5 p:nth-of-type(1)').addClass('mark');
//    }else{
//        $('.s5 p:nth-of-type(1)').removeClass('mark');
//    }

    if(scroll > s7 && scroll < s8){
        resetNav();
        $('.nav_point li:nth-child(4)').addClass('here');
    }

    if(scroll > s7-touchH && scroll < s7+30){
        $('.s7 > header').removeClass('fadeOut').addClass('fadeIn');
    }else{
        $('.s7 > header').removeClass('fadeIn').addClass('fadeOut');
    }

    if(scroll > s8 && scroll < s9){
        $('.s8 img').css({'position':'fixed','z-index':0});
        resetNav();
        $('.nav_point li:nth-child(5)').addClass('here');
    }else{
        $('.s8 img').css({'position':'absolute'});
    }

    if(scroll > s8-touchH && scroll < s8+30){
        $('.s8 h2').addClass("underline");
    }else{
        $('.s8 h2').removeClass("underline");
    }

    if(scroll > s9 && scroll < s10){
        $('.s9:not(.bgcolor)').addClass("bgcolor");
        resetNav();
        $('.nav_point li:nth-child(6)').addClass('here');
    }else{$('.s9').removeClass("bgcolor");}

    if(scroll > s9-touchH && scroll < s9+30){
        $('.s9 > header').removeClass('fadeOut').addClass('fadeIn');
    }else{
         $('.s9 > header').removeClass('fadeIn').addClass('fadeOut');
    }

    if(scroll > s10 && scroll < s11){
        resetNav();
        $('.nav_point li:nth-child(7)').addClass('here');
    }

    if(scroll > s10-touchH && scroll < s10+30){
        $('.s10 > header').removeClass('fadeOut').addClass('fadeIn');
    }else{
        $('.s10 > header').removeClass('fadeIn').addClass('fadeOut');
    }

    if(scroll > s11 && scroll < s12){
        resetNav();
        $('.nav_point li:nth-child(8)').addClass('here');
    }

    if(scroll > s11-touchH && scroll < s11+30){
        $('.s11 > header').removeClass('fadeOut').addClass('fadeIn');

    }else{
        $('.s11 > header').removeClass('fadeIn').addClass('fadeOut');
    }

    if(scroll > s12-touchH){
        resetNav();
        $('.nav_point li:nth-child(9):not(.here)').addClass('here');
    }

    if(scroll > s12-touchH){
        $('.s12 h2').addClass("underline");
    }else{
        $('.s12 h2').removeClass("underline");
    }
//    here.innerHTML = "scrollTop:"+scroll+" direction:"+s8;
}

function resetNav(){$('.nav_point li a').blur();$('.nav_point li').removeClass('here');}
function scrollTo(secName){$("body,html").animate({ scrollTop: $(secName).offset().top }, 800); return false;}
function storeLocal(key,val){localStorage[key] = val;}
function getLocalStore(key){return localStorage[key];}
function storeSession(key,val){sessionStorage[key] = val;}
function getStoreSession(key){return sessionStorage[key];}
function getLang(){var e=getLocalStore("lang");return e?e:"ch"}function getStyle(){var e=Math.floor(100*Math.random()/10+1);return e>4&&(e-=6),0>=e&&(e=1),"style_0"+e}function getRandomBg(){var e=Math.floor(100*Math.random()/10+1);return e>4&&(e-=6),0>=e&&(e=1),"url(../img/bg0"+e+".jpg)"}function loadPage(e,s){var a=".program ."+s;$(a).load(e),storeLocal("lang",e.split("_")[1])}function changeText(e,s,a){function l(){n<i.length&&(s.append(i[n]),n+=1)}var o=e.text(),i=o.split(""),n=0;setInterval(l,a)}function parallax(){var e=window.pageYOffset;e>0?$("#cube:not(show-top)").addClass("show-top"):$("#cube").removeClass("show-top"),s2>e&&e>0&&(resetNav(),$(".nav_point li:nth-child(1)").addClass("here")),e>s2-touchH&&s3+30>e?$(".s2 h2").addClass("underline"):$(".s2 h2").removeClass("underline"),e>s2&&s3>e?($(".business img").css({position:"fixed","z-index":0,left:"511px"}),resetNav(),$(".nav_point li:nth-child(2)").addClass("here")):$(".business img").css({position:"absolute"}),e>s3&&s6>e&&(resetNav(),$(".nav_point li:nth-child(3)").addClass("here")),e>s3-touchH&&s3+30>e?($(".s3:not(.bgcolor)").addClass("bgcolor"),$(".s3 > header").removeClass("fadeOut").addClass("fadeIn")):($(".s3").removeClass("bgcolor"),$(".s3 > header").removeClass("fadeIn").addClass("fadeOut")),e>s7&&s8>e&&(resetNav(),$(".nav_point li:nth-child(4)").addClass("here")),e>s7-touchH&&s7+30>e?$(".s7 > header").removeClass("fadeOut").addClass("fadeIn"):$(".s7 > header").removeClass("fadeIn").addClass("fadeOut"),e>s8&&s9>e?($(".s8 img").css({position:"fixed","z-index":0}),resetNav(),$(".nav_point li:nth-child(5)").addClass("here")):$(".s8 img").css({position:"absolute"}),e>s8-touchH&&s8+30>e?$(".s8 h2").addClass("underline"):$(".s8 h2").removeClass("underline"),e>s9&&s10>e?($(".s9:not(.bgcolor)").addClass("bgcolor"),resetNav(),$(".nav_point li:nth-child(6)").addClass("here")):$(".s9").removeClass("bgcolor"),e>s9-touchH&&s9+30>e?$(".s9 > header").removeClass("fadeOut").addClass("fadeIn"):$(".s9 > header").removeClass("fadeIn").addClass("fadeOut"),e>s10&&s11>e&&(resetNav(),$(".nav_point li:nth-child(7)").addClass("here")),e>s10-touchH&&s10+30>e?$(".s10 > header").removeClass("fadeOut").addClass("fadeIn"):$(".s10 > header").removeClass("fadeIn").addClass("fadeOut"),e>s11&&s12>e&&(resetNav(),$(".nav_point li:nth-child(8)").addClass("here")),e>s11-touchH&&s11+30>e?$(".s11 > header").removeClass("fadeOut").addClass("fadeIn"):$(".s11 > header").removeClass("fadeIn").addClass("fadeOut"),e>s12-touchH&&(resetNav(),$(".nav_point li:nth-child(9):not(.here)").addClass("here")),e>s12-touchH?$(".s12 h2").addClass("underline"):$(".s12 h2").removeClass("underline")}function resetNav(){$(".nav_point li a").blur(),$(".nav_point li").removeClass("here")}function scrollTo(e){return $("body,html").animate({scrollTop:$(e).offset().top},800),!1}function storeLocal(e,s){localStorage[e]=s}function getLocalStore(e){return localStorage[e]}function storeSession(e,s){sessionStorage[e]=s}function getStoreSession(e){return sessionStorage[e]}$(document).ready(function(){$("body").removeClass(),$("body").addClass(getStyle()),$("body").css("background-image",getRandomBg());var e=getLang();$("."+e+"_btn").addClass("on"),$("."+e).removeClass("hidden"),getStoreSession("firstTime")&&($(".off").hide(),$("body").css("overflow","auto")),$(".s6 .left li").on("click",function(){$("body,html").animate({scrollTop:$(".s6").offset().top-=150},800),$(".program").addClass("page_on").css("z-index","6"),$("body").css("overflow","hidden"),$(".s6 .left").css("z-index","7"),$(".s6 .left").addClass("on"),$(".s6 .right").css("z-index","4"),$(".s6 li").removeClass("here"),$(this).addClass("here");var e=$(this).data("doc").split("_"),s=e[0]+"_"+getLang()+"_"+e[1]+".html";$(".program .right").load("doc/"+s),$(".program .left").html("")}),$(".s6 .right li").on("click",function(){$("body,html").animate({scrollTop:$(".s6").offset().top-=150},800),$(".program").addClass("page_on").css("z-index","6"),$("body").css("overflow","hidden"),$(".s6 .right").css("z-index","7"),$(".s6 .right").addClass("on"),$(".s6 .left").css("z-index","4"),$(".s6 li").removeClass("here"),$(this).addClass("here");var e=$(this).data("doc").split("_"),s=e[0]+"_"+getLang()+"_"+e[1]+".html";$(".program .left").load("doc/"+s),$(".program .right").html("")}),$(".close_btn").on("click",function(){$(".program").removeClass("page_on"),$(".program").css("z-index","0"),$("body").css("overflow","auto"),$(".s6 div").css("z-index","4"),$(".s6 div").removeClass("on"),$(".s6 li").removeClass("here")}),$("body,html").animate({scrollTop:"0"})}),$(".lang").on(".en_btn","click",function(){storeLocal("lang","en"),lang="en",$(".en_btn").addClass("on"),$(".ch_btn").removeClass("on"),$(".en").removeClass("hidden"),$(".ch").addClass("hidden")}),$(".lang").on(".ch_btn","click",function(){storeLocal("lang","ch"),lang="ch",$(".ch_btn").addClass("on"),$(".en_btn").removeClass("on"),$(".ch").removeClass("hidden"),$(".en").addClass("hidden")}),$(".on").on("click",function(){$(".off").hide(),storeSession("firstTime",1),$("body").css("overflow","auto")}),$(".pebbo a").on("click",function(){scrollTo(".s2")}),$(".contact_us .on").on("click",function(){scrollTo(".s1"),$(".off").show("13000"),$("body").css("overflow","hidden")}),$(".s10 aside li").on("mouseenter",function(){$(".s10 aside li").removeClass(),$(this).toggleClass("hover")}),$(".guide div, .guide aside li").on("mouseenter",function(){$(".guide div").removeClass("here"),$(".guide aside li").removeClass()}),$(".c1").on("mouseenter",function(){$(".guide aside li").removeClass("hover"),$(".guide aside li:nth-child(4)").addClass("hover")}),$(".c2").on("mouseenter",function(){$(".guide aside li").removeClass("hover"),$(".guide aside li:nth-child(3)").addClass("hover")}),$(".c3").on("mouseenter",function(){$(".guide aside li").removeClass("hover"),$(".guide aside li:nth-child(2)").addClass("hover")}),$(".c4").on("mouseenter",function(){$(".guide aside li").removeClass("hover"),$(".guide aside li:nth-child(1)").addClass("hover")}),$(".guide aside li:nth-child(4)").on("mouseenter",function(){$(".c1").addClass("here"),$(".guide aside li").removeClass("hover"),$(".guide aside li:nth-child(4)").addClass("hover")}),$(".guide aside li:nth-child(3)").on("mouseenter",function(){$(".c2").addClass("here"),$(".guide aside li").removeClass("hover"),$(".guide aside li:nth-child(3)").addClass("hover")}),$(".guide aside li:nth-child(2)").on("mouseenter",function(){$(".c3").addClass("here"),$(".guide aside li").removeClass("hover"),$(".guide aside li:nth-child(2)").addClass("hover")}),$(".guide aside li:nth-child(1)").on("mouseenter",function(){$(".c4").addClass("here"),$(".guide aside li").removeClass("hover"),$(".guide aside li:nth-child(1)").addClass("hover")}),$(".question li").on("click",function(){var e="";$(".question li").removeClass("here"),$(this).addClass("here"),$(".team li").removeClass("question1 question2 question3").addClass($(this).data("question")).fadeIn(1e3),e=$(this).data("question")}),$(".nav_point li>a").on("click",function(){$("body,html").animate({scrollTop:$("."+$(this).data("section")).offset().top},2e3,"easeOutExpo")}),window.addEventListener("scroll",parallax,!1);var winH=680,halfH=winH/2,touchH=100,s1=0,s2=winH,s3=2*winH,s5=s3+winH,s6=s5+307,s7=s6+winH,s8=s7+winH,s9=s8+winH,s10=s9+1100,s11=s10+winH,s12=s11+winH;
