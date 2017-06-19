$(document).ready(function(){
	$('body').removeClass();
	$('body').addClass(getStyle());

    var lang = getLocalStore("lang");
    if(lang){
        $("."+lang+"_btn").addClass('on');
        $("."+lang).removeClass('hidden');
    }else{
        lang = 'en';
        $('.en_btn').addClass('on');
        $('.en').removeClass('hidden');
    }

    if(getStoreSession('firstTime')){
        $('.off').hide();
        $('body').css('overflow','auto');
        $('.menu aside p').css('display','block');
        $('.menu a').css('color','#1a171b');
    }

    $('.s6 .left li').on('click',function(){
		$('.program').addClass('page_on');
		$('body').css('overflow','hidden');
//		$('.close_btn').css('left','8vw');
		$('.close_btn').css({'left':'8vw','right':''});
		$('.s6 .lfet').css('z-index','7');
		$('.s3 .right,.s6 .right').css('z-index','4');
		$('.s6 li').removeClass();
		$(this).addClass('here');
	//        var loadFile = $(this).attr('role').split('_');
	//        var loadFileName = loadFile[0]+"_"+lang+'_'+loadFile[1]+'.html';
		var loadFile = $(this).data('doc').split('_');
		var loadFileName = loadFile[0]+"_"+lang+'_'+loadFile[1]+'.html';
	//        console.lfog('left:'+loadFileName);
		$('.program .right').load("doc/"+loadFileName);
		$('.program .left').html('');
	});

	$('.s6 .right li').on('click',function(){
		$('.program').addClass('page_on');
		$('body').css('overflow','hidden');
//		$('.close_btn').css('right','8vw');
		$('.close_btn').css({'left':'','right':'8vw'});
	//        $('.s3 .right,.s6 .right').css('z-index','6');
		$('.s6 .right').css('z-index','7');
		$('.s3 .left,.s6 .left').css('z-index','4');
		$('.s6 li').removeClass();
			$(this).addClass('here');
		var loadFile = $(this).data('doc').split('_');
		var loadFileName = loadFile[0]+"_"+lang+'_'+loadFile[1]+'.html';
		$('.program .left').load("doc/"+loadFileName);
		$('.program .right').html('');
	});
});

function getStyle(){
	var i = Math.floor(((Math.random() * 100)/10)+1);

	if(i>4) i-=6;
	if(i<=0) i =1;
	return "style_0"+i;
	console.log(i)
}

$("#help").click(function(){scrollTo('.business');});
$("#about_us").click(function(){scrollTo('.about_us');});
$("#contact_us").click(function(){scrollTo('.contact_us');});

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

$("nav li a").click(function(){
    $('nav div').toggleClass('show');
    $('.open_menu span').removeClass('rotate')
});

$('blockquote a').on('mouseenter',function(){
	$('.vcard .paint').css({'opacity': 1,'display':'none'});
	count = 0;
	progress();
})
.on('mouseleave',function(){
	progress(10);
});

$('.menu aside a').on('click',function(){
	$('.off').hide();
	storeSession('firstTime',1);
	$('body').css('overflow','auto');
	$('.menu aside a').css({'color':'#0f0f0f'});
	$('.menu aside p').css('display','block');
//        $('#palx1').css('display','block');
	$('.menu aside a').removeClass();
});

$('.open_menu').click(function(){
	$('nav div').toggleClass('show');
	$('.open_menu span').toggleClass('rotate');
	$('.good').toggleClass('flip');
});

$('.s10 aside li').on('mouseenter',function(){
	$('.s10 aside li').removeClass();
	$(this).toggleClass('hover');
});

$('.guide div, .guide aside li').on('mouseenter',function(){
	$('.guide div').removeClass('here')
	$('.guide aside li').removeClass();
});

$('.c1').on('mouseenter',function(){$('.guide aside li:nth-child(4)').addClass('hover')});
$('.c2').on('mouseenter',function(){$('.guide aside li:nth-child(3)').addClass('hover')});
$('.c3').on('mouseenter',function(){$('.guide aside li:nth-child(2)').addClass('hover')});
$('.c4').on('mouseenter',function(){$('.guide aside li:nth-child(1)').addClass('hover')});

$('.guide aside li:nth-child(4)').on('mouseenter',function(){$('.c1').addClass('here');$('.guide aside li:nth-child(4)').addClass('hover')});
$('.guide aside li:nth-child(3)').on('mouseenter',function(){$('.c2').addClass('here');$('.guide aside li:nth-child(3)').addClass('hover')});
$('.guide aside li:nth-child(2)').on('mouseenter',function(){$('.c3').addClass('here');$('.guide aside li:nth-child(2)').addClass('hover')});
$('.guide aside li:nth-child(1)').on('mouseenter',function(){$('.c4').addClass('here');$('.guide aside li:nth-child(1)').addClass('hover')});

$('.close_btn').on('click',function(){
	$('.program').removeClass('page_on');
	$('body').css('overflow','auto');
	$('.s3 div').css('z-index','6');
	$('.s6 div').css('z-index','7');
})

$('.question a').on('click',function(){
	$('.question li').removeClass();
	$('.question li').addClass('show');
});
$('.question li').on('click',function(){
	$('.question li').removeClass();
	$('#question_ch').removeClass().addClass($(this).data('question'));
	$(this).addClass('on');
	$(".team li").removeClass();
	$(".team li").addClass($(this).data('question')).fadeIn(1000);
});
//var count;
//
//function progress(leave){
//    if(leave) count = leave;
//    if (count < $('#member i').length) {
//        $('#member i:eq('+count+')').show(150);
//        hidePaint(count);
//        count++;
//        setTimeout("progress()",200);
//        if(count == $('#member i').length) count=0;
//    }else{
//        count = 10;
//        console.log(leave);
//    }
//}
//
//function hidePaint(i){
//    $('#member i:eq('+i+')').hide(150);
//}
//function scrollTo(secName){
//    $("html,body").animate({scrollTop: $(secName).offset().top}, 1500);
//}
function loadPage(page,side){
    var loadPage = '.program .'+side;
    $(loadPage).load(page);
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
		};
	};
		var Otimer=setInterval(show,speed);
};

function cancelHandler(event){
    var event = event || window.event;
    if(event.preventDefault) event.preventDefault();
    if(event.returnValue) event.returnValue = false;
    return false;
}

function stopEvent(event){
    var event = event || window.event;
    if(event.stopPropagation) {
    event.stopPropagation();
    event.preventDefault();
    }else{
    event.cancelBubble = true;
    }
}

var winH = $(window).height();
var halfH = winH/2;
var s1 = winH*0.8;
var s2 = winH-20;
var s3 = winH*2;
var s4 = winH*3-100;
var s5 = winH*4;
var s6 = winH*5;
var s7 = winH*6;
var s9 = winH*8-10;
var thisPage = localStorage["thisPage"] = "s1";
var nextPage = prevPage = "";

function parallax( scroll ){
//    var scroll = window.pageYOffset;
//    console.log("s1="+s1)
//    e.preventDefault();
//    localStorage["thisPage"] = "s1";
//    thisPage = localStorage["thisPage"];
//    console.log("thisPage="+thisPage);
//    var page = $('section').attr('id'),top=0;
//    if(scroll > s1 && scroll < winH) scrollTo(".s2");
    $('section').on('mouseenter',function(){
//        thisPage =$(this).data('pages');
//        prevPage = $(this).prev('section').data('pages');
//        nextPage = $(this).next('section').data('pages');
//        console.log("page="+prevPage+"//"+thisPage+"//"+nextPage)
//        console.log("page="+prevPage+"//"+thisPage)
    });

    if(thisPage < nextPage ) {
//        scrollTo('s'+nextPage);
//        console.log("nextPage="+thisPage+"//"+'s'+nextPage)
//        nextPage = '';
    }else if(thisPage > nextPage){
//        scrollTo('s'+prevPage);
//        console.log("prevPage="+prevPage+"//"+thisPage)
//        prevPage = '';
    }


    if(scroll<65){
        $('.menu aside').css({'top':((scroll*-0.9)+70)+"vh"});
        $('.menu aside').removeClass();
    }else{
        $('.menu aside').css({'position':'fixed','z-index':5,'top':75});
        $('.menu aside').addClass('lock');
    }

    if(scroll > s2 ){
        $('.s2 aside').css('opacity',1);
    }else{
        $('.s2 aside').css('opacity',0);
    }

    if(scroll > s3 && scroll<s6){
        $('.s3 div').css({'position':'fixed','z-index':6});
        $('.s3 h2').css({'position':'fixed','z-index':4,'top':0});
    }else{
        $('.s3 div').css('position','absolute');
        $('.s3 h2').css('position','absolute');
    }

    if(scroll > s3 && scroll<s5){
        $('.s5 i+p').addClass('mark');
    }else{
        $('.s5 i+p').removeClass('mark');
    }

//	if(scroll > s4 && scroll <s4-20) $(".s4").removeClass('hide').addClass('show2')
//	if(scroll > s4-20) $(".s4").removeClass('show2').addClass('hide');
}

//var u = d = k = 0, page_id=1, current_index = 0;
//var beforeScrollTop = 0,nextPageId=1;
//$(document).on("scrollstop",function(){
//  alert("Stopped scrolling!");
//});

var currentSection = nextSection = prevSection = beforeScrollTop = 0;
var endPage = $('section').length - 1; //12
var hello = function(){console.log(111)};
var flag = 0;


var scrollPage = function(event){

	 parallax( scroll );
	var scroll = window.pageYOffset;
	if(currentSection == 0) currentSection = 1;

//	if(currentSection > 1) prevSection = currentSection - 1;
//	else prevSection = currentSection;
//
//	if(currentSection < endPage ) nextSection = currentSection + 1;
//	else nextSection = currentSection;

//	console.log("prevSection:.s"+prevSection+" currentSection:.s"+currentSection+" nextSection:.s"+nextSection);
    if( scrollDirection() == "up" ){
		// scrollPage('.s'+nextSection);
		nextSection = currentSection+1;
		console.log("nextSection:"+nextSection+" currentSection:"+currentSection);
//		$("body").animate({ scrollTop: $('.s'+nextSection).offset().top }, 800);
//		currentSection = nextSection;
		flag = 1;
    }else{
		// scrollPage('.s'+prevSection);
		// currentSection = prevSection;
    }
    // console.log("delta:"+delta);
    event.preventDefault();
 //    if (Math.abs(delta) >= 30 ) {
	// 	$(window).unbind('scroll');
	// }
	console.log("prevSection:.s"+prevSection+" currentSection:.s"+currentSection+" nextSection:.s"+nextSection+" flag"+flag);
//	here.innerHTML = "scrollTop:"+scroll+" direction:"+scrollDirection() + "  beforeScrollTop:"+beforeScrollTop;
}

//$(window).on('scroll',scrollPage);
$(window).scroll(function(){
//	parallax( scroll );
//	$(window).off('scroll',scrollPage);
//	beforeSection = currentSection;
//	currentSection += 1;
//	console.log("flag"+flag)
////	console.log("currentSection:"+currentSection)
//	if(flag){
//		$(window).on('scroll',scrollPage);
//	}
});


// var scrollPage = function(secName){
// 	$("body").animate({ scrollTop: $(secName).offset().top }, 800);
// 	return false;
// }

function scrollDirection(){
    var afterScrollTop = document.body.scrollTop,
    delta = afterScrollTop - beforeScrollTop;
    if ( delta === 0 ) return false ;
    beforeScrollTop = afterScrollTop;
    if(delta >= 30 ){
    	return 'up';
    }else if(delta <= -30){
    	return 'down'
    }
}

//$(window).scroll(function(){
//	if($(this).data('sid') == "undefined") $(this).data('sid')=1
//	console.log($(this).data('sid'));
//	$(window).off('scroll',hello);
//
//	if($(this).data('sid') == 2){
//	$(window).on('scroll',hello);
//	}
//});


//function scrollTo(secName){$("body").animate({ scrollTop: $(secName).offset().top }, 800); return false;}
function storeLocal(key,val){localStorage[key] = val;}
function getLocalStore(key){return localStorage[key];}
function storeSession(key,val){sessionStorage[key] = val;}
function getStoreSession(key){return sessionStorage[key];}
