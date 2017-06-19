$(document).ready(function(){
    var lang = getLocalStore("lang");
    if(lang){
        $("."+lang+"_btn").addClass('on');
        $("."+lang).removeClass('hidden');
    }else{
        lang = 'en';
        $('.en_btn').addClass('on');
        $('.en').removeClass('hidden');
    }

    $('.en_btn').click(function(){
        storeLocal("lang","en");
        lang = 'en';
        $('.en_btn').addClass('on');
        $('.ch_btn').removeClass('on')
        $('.en').removeClass('hidden');
        $('.ch').addClass('hidden');
    });

    $('.ch_btn').click(function(){
        storeLocal("lang","ch");
        lang = 'ch';
        $('.ch_btn').addClass('on');
        $('.en_btn').removeClass('on')
        $('.ch').removeClass('hidden');
        $('.en').addClass('hidden');
    });

//    $('.program').delegate('click','.lang .en_btn',function(){alert(1)})

    $("nav li a").click(function(){
        $('nav div').toggleClass('show');
        $('.open_menu span').removeClass('rotate')
    });

    $("#guide-on-innovation").click(function(){scrollTo('.s1');});
    $("#offering").click(function(){scrollTo('.s2');});
    $("#cases").click(function(){scrollTo('.s7');});
    $("#why-pebbo-exists").click(function(){scrollTo('.s8');});
    $("#team").click(function(){scrollTo('.s9');});

    $('.off a').on('click',function(){
        $('.off').hide();
        $('body').css('overflow','auto')
        $('#palx1').css('display','block');
        $('.open_menu').css('background','#00ff12');
    });

    $('.open_menu').click(function(){
        $('nav div').toggleClass('show');
        $('.open_menu span').toggleClass('rotate');
        $('.good').toggleClass('flip');
    });

    $('.s2 aside li').on('mouseenter',function(){
        $('.s2 aside li').removeClass();
        $(this).toggleClass('hover');
    });
    $('.s2 div, .s2 aside li').on('mouseenter',function(){
        $('.s2 div').removeClass('here')
        $('.s2 aside li').removeClass();
    });

    $('.c1').on('mouseenter',function(){$('.s2 aside li:nth-child(1)').addClass('hover')});
    $('.c2').on('mouseenter',function(){$('.s2 aside li:nth-child(2)').addClass('hover')});
    $('.c3').on('mouseenter',function(){$('.s2 aside li:nth-child(3)').addClass('hover')});
    $('.c4').on('mouseenter',function(){$('.s2 aside li:nth-child(4)').addClass('hover')});

    $('.s2 aside li:nth-child(1)').on('mouseenter',function(){$('.c1').addClass('here');$('.s2 aside li:nth-child(1)').addClass('hover')});
    $('.s2 aside li:nth-child(2)').on('mouseenter',function(){$('.c2').addClass('here');$('.s2 aside li:nth-child(2)').addClass('hover')});
    $('.s2 aside li:nth-child(3)').on('mouseenter',function(){$('.c3').addClass('here');$('.s2 aside li:nth-child(3)').addClass('hover')});
    $('.s2 aside li:nth-child(4)').on('mouseenter',function(){$('.c4').addClass('here');$('.s2 aside li:nth-child(4)').addClass('hover')});

    $('.s6 .left li').on('click',function(){
        $('.program').addClass('page_on');
        $('body').css('overflow','hidden');
        $('.s6 .lfet').css('z-index','7');
        $('.s3 .right,.s6 .right').css('z-index','4');
        $('.s6 li').removeClass();
        $(this).addClass('here');
        var loadFile = $(this).attr('role').split('_');
        var loadFileName = loadFile[0]+"_"+lang+'_'+loadFile[1]+'.html';
        console.log('left:'+loadFileName);
        $('.program .right').load(loadFileName);
        $('.program .left').html('');
    });

    $('.s6 .right li').on('click',function(){
        $('.program').addClass('page_on');
        $('body').css('overflow','hidden');
//        $('.s3 .right,.s6 .right').css('z-index','6');
        $('.s6 .right').css('z-index','7');
        $('.s3 .left,.s6 .left').css('z-index','4');
        $('.s6 li').removeClass();
            $(this).addClass('here');
        var loadFile = $(this).attr('role').split('_');
        var loadFileName = loadFile[0]+"_"+lang+'_'+loadFile[1]+'.html';
//        console.log('right:'+loadFileName);
        $('.program .left').load(loadFileName);
        $('.program .right').html('');
    });

    $('.program button').on('click',function(){
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
        $(this).addClass('on');
    });

    window.addEventListener("scroll",parallax,false);

    var windowWidth=0;
    $( window ).resize(function() {
        var windowWidth = $( window ).width();
    });

    if(windowWidth > 960){
        var i = Math.floor(((Math.random() * 100)/10) + 1);
        $('#member').removeClass();
        $('#member').addClass('s1');
        $('#member').addClass('s'+i);
    }

    $('blockquote a').on('mouseenter',function(){
        $('.vcard .paint').css({'opacity': 1,'display':'none'});
        count = 0;
        progress();
    })
    .on('mouseleave',function(){
        progress(10);
    });

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
var s2 = winH-20;
var s3 = winH*2;
var s4 = winH*3-halfH;
var s5 = winH*4;
var s6 = winH*5;
var s7 = winH*6+halfH;
var s9 = winH*8-10;

function(){
    var page = $('section').attr('class'),top=0;
    var scroll = window.pageYOffset;
    var palx1 = document.getElementById('palx1');
    if(scroll<285){
        $('#palx1').css('top', ((scroll*-1.5)+420)+"px");
    }else{
        $('#palx1').css('top', 0);
        $('.style_01 aside a').css('background','none');
    }
    if( scroll > halfH && scroll < halfH+10) scrollTo('.s2');
//    if( scroll > halfH*5) scrollTo('.s3');
//    if(scroll > winH/2 ){
//        $('.s2 aside').css('opacity',(scroll - winH/2)*(1/(winH/2)));
//    }
//    if(scroll > 300 && scroll <320) scrollTo('.s2');
    if(scroll > s2 ){
        $('.s2 aside').css('opacity',1);
    }else{
        $('.s2 aside').css('opacity',0);
    }

    if(scroll > s3 && scroll<s6){
        $('.s3 div').css({'position':'fixed','z-index':6});
    }else{
        $('.s3 div').css('position','absolute');
    }

    if(scroll > s3 && scroll<s5){
        $('.s4 i+p').addClass('mark');
    }else{
        $('.s4 i+p').removeClass('mark');
    }


//    switch(page){
//        case "s1":
//
//            break;
//        case "s2":
////            var winW = $(window).width();
////            var winH = $(window).height();
////            if(scroll>winH*)
//            alert(1);
//            break;
//
//    }
////                palx1.style.top = (window.pageYOffset*1)+"px";
//    palx2.style.left = (window.pageYOffset*4)+"px";
    here.innerHTML = scroll+"/"+s9;
}

function scrollTo(secName){
    //var move = $(secName).offset().top;
    //alert(move);
    $("html,body").animate({scrollTop: $(secName).offset().top}, 300);
}

function storeLocal(key,val){localStorage[key] = val;}

function getLocalStore(key){return localStorage[key];}

function storeSession(key,val){sessionStorage[key] = val;}

function getStoreSession(key){return sessionStorage[key];}

$(document).ready(function(){
    var lang = getLocalStore("lang");
    if(lang){
        $("."+lang+"_btn").addClass('on');
        $("."+lang).removeClass('hidden');
    }else{
        lang = 'en';
        $('.en_btn').addClass('on');
        $('.en').removeClass('hidden');
    }

    $('.en_btn').click(function(){
        storeLocal("lang","en");
        lang = 'en';
        $('.en_btn').addClass('on');
        $('.ch_btn').removeClass('on')
        $('.en').removeClass('hidden');
        $('.ch').addClass('hidden');
    });

    $('.ch_btn').click(function(){
        storeLocal("lang","ch");
        lang = 'ch';
        $('.ch_btn').addClass('on');
        $('.en_btn').removeClass('on')
        $('.ch').removeClass('hidden');
        $('.en').addClass('hidden');
    });

//    $('.program').delegate('click','.lang .en_btn',function(){alert(1)})

    $("nav li a").click(function(){
        $('nav div').toggleClass('show');
        $('.open_menu span').removeClass('rotate')
    });

    $("#guide-on-innovation").click(function(){scrollTo('.s1');});
    $("#offering").click(function(){scrollTo('.s2');});
    $("#cases").click(function(){scrollTo('.s7');});
    $("#why-pebbo-exists").click(function(){scrollTo('.s8');});
    $("#team").click(function(){scrollTo('.s9');});

    if(getStoreSession('firstTime')){
        $('.off').hide();
        $('body').css('overflow','auto')
        $('#palx1').css('display','block');
        $('.open_menu').css('background','#00ff12');
    }

    $('.off a').on('click',function(){
        $('.off').hide();
        storeSession('firstTime',1);
        $('body').css('overflow','auto')
        $('#palx1').css('display','block');
        $('.open_menu').css('background','#00ff12');
    });

    $('.open_menu').click(function(){
        $('nav div').toggleClass('show');
        $('.open_menu span').toggleClass('rotate');
        $('.good').toggleClass('flip');
    });

    $('.s2 aside li').on('mouseenter',function(){
        $('.s2 aside li').removeClass();
        $(this).toggleClass('hover');
    });
    $('.s2 div, .s2 aside li').on('mouseenter',function(){
        $('.s2 div').removeClass('here')
        $('.s2 aside li').removeClass();
    });

    $('.c1').on('mouseenter',function(){$('.s2 aside li:nth-child(1)').addClass('hover')});
    $('.c2').on('mouseenter',function(){$('.s2 aside li:nth-child(2)').addClass('hover')});
    $('.c3').on('mouseenter',function(){$('.s2 aside li:nth-child(3)').addClass('hover')});
    $('.c4').on('mouseenter',function(){$('.s2 aside li:nth-child(4)').addClass('hover')});

    $('.s2 aside li:nth-child(1)').on('mouseenter',function(){$('.c1').addClass('here');$('.s2 aside li:nth-child(1)').addClass('hover')});
    $('.s2 aside li:nth-child(2)').on('mouseenter',function(){$('.c2').addClass('here');$('.s2 aside li:nth-child(2)').addClass('hover')});
    $('.s2 aside li:nth-child(3)').on('mouseenter',function(){$('.c3').addClass('here');$('.s2 aside li:nth-child(3)').addClass('hover')});
    $('.s2 aside li:nth-child(4)').on('mouseenter',function(){$('.c4').addClass('here');$('.s2 aside li:nth-child(4)').addClass('hover')});

    $('.s6 .left li').on('click',function(){
        $('.program').addClass('page_on');
        $('body').css('overflow','hidden');
        $('.s6 .lfet').css('z-index','7');
        $('.s3 .right,.s6 .right').css('z-index','4');
        $('.s6 li').removeClass();
        $(this).addClass('here');
        var loadFile = $(this).attr('role').split('_');
        var loadFileName = loadFile[0]+"_"+lang+'_'+loadFile[1]+'.html';
        console.log('left:'+loadFileName);
        $('.program .right').load(loadFileName);
        $('.program .left').html('');
    });

    $('.s6 .right li').on('click',function(){
        $('.program').addClass('page_on');
        $('body').css('overflow','hidden');
//        $('.s3 .right,.s6 .right').css('z-index','6');
        $('.s6 .right').css('z-index','7');
        $('.s3 .left,.s6 .left').css('z-index','4');
        $('.s6 li').removeClass();
            $(this).addClass('here');
        var loadFile = $(this).attr('role').split('_');
        var loadFileName = loadFile[0]+"_"+lang+'_'+loadFile[1]+'.html';
//        console.log('right:'+loadFileName);
        $('.program .left').load(loadFileName);
//        $('.program .left').load(loadFileName,function( response, status, xhr ){
//            alert(xhr);
//////            if(status == "error"){
////            if ( status == 404 ) {
////                var msg = "Sorry but there was an error: ";
////                alert( msg + xhr.status + " " + xhr.statusText );
////                alert(1)
////            }else{}
//        });

        $('.program .right').html('');
    });

    $('.program button').on('click',function(){
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
        $(this).addClass('on');
        $(".team li").removeClass();
        $(".team li").addClass($(this).attr('role')).fadeIn(1000);
    });

    window.addEventListener("scroll",parallax,false);

    var windowWidth=0;
    $( window ).resize(function() {
        var windowWidth = $( window ).width();
    });

    if(windowWidth > 960){
        var i = Math.floor(((Math.random() * 100)/10) + 1);
        $('#member').removeClass();
        $('#member').addClass('s1');
        $('#member').addClass('s'+i);
    }

    $('blockquote a').on('mouseenter',function(){
        $('.vcard .paint').css({'opacity': 1,'display':'none'});
        count = 0;
        progress();
    })
    .on('mouseleave',function(){
        progress(10);
    });

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
var s2 = winH-20;
var s3 = winH*2;
var s4 = winH*3-halfH;
var s5 = winH*4;
var s6 = winH*5;
var s7 = winH*6+halfH;
var s9 = winH*8-10;

function parallax(){
    var page = $('section').attr('class'),top=0;
    var scroll = window.pageYOffset;
    var palx1 = document.getElementById('palx1');
    if(scroll<285){
        $('#palx1').css('top', ((scroll*-1.5)+420)+"px");
    }else{
        $('#palx1').css('top', 0);
        $('.style_01 aside a').css('background','none');
    }
    if( scroll > halfH && scroll < halfH+10) scrollTo('.s2');
//    if( scroll > halfH*5) scrollTo('.s3');
//    if(scroll > winH/2 ){
//        $('.s2 aside').css('opacity',(scroll - winH/2)*(1/(winH/2)));
//    }
//    if(scroll > 300 && scroll <320) scrollTo('.s2');
    if(scroll > s2 ){
        $('.s2 aside').css('opacity',1);
    }else{
        $('.s2 aside').css('opacity',0);
    }

    if(scroll > s3 && scroll<s6){
        $('.s3 div').css({'position':'fixed','z-index':6});
    }else{
        $('.s3 div').css('position','absolute');
    }

    if(scroll > s3 && scroll<s5){
        $('.s4 i+p').addClass('mark');
    }else{
        $('.s4 i+p').removeClass('mark');
    }


//    switch(page){
//        case "s1":
//
//            break;
//        case "s2":
////            var winW = $(window).width();
////            var winH = $(window).height();
////            if(scroll>winH*)
//            alert(1);
//            break;
//
//    }
////                palx1.style.top = (window.pageYOffset*1)+"px";
//    palx2.style.left = (window.pageYOffset*4)+"px";
    here.innerHTML = scroll+"/"+s9;
}

function scrollTo(secName){
    //var move = $(secName).offset().top;
    //alert(move);
    $("html,body").animate({scrollTop: $(secName).offset().top}, 300);
}

function storeLocal(key,val){localStorage[key] = val;}

function getLocalStore(key){return localStorage[key];}

function storeSession(key,val){sessionStorage[key] = val;}

function getStoreSession(key){return sessionStorage[key];}

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

//$('.main-nav').load('load-main-nav.html');
//$(‘.main-footer').load('load-main-footer.html');
//$(‘.create-nav').load('load-create-nav.html');
//$(‘.create-admin-side').load('load-create-admin-side.html');
var HOSTNAME = '';

$(function () {
    if (!window.localStorage) {
        alert("您的瀏覽器過於老舊，無法支援新功能，建議您升級瀏覽器版本。");
    }

    if ($(location).attr('search')) {
        $('.login').toggle(1000);
        $('.login').load('load-repasswd.html');
        $('body').toggleClass("stop-scrolling");
    }

});

//$(‘#login-btn').on('click', function () {
//    $('.login').toggle(1000);
//    $('.login').load('load-login.html');
//    $('body').toggleClass("stop-scrolling");
//});


$(".edit button").on('click', function () {
//    console.log($(this).parent().attr('id'));
//    console.log($(this).parent().serializeJSON());
    var formID = $(this).parent().attr('id').split('-')[0];
    var formData = $(this).parent().serializeJSON();
//    console.log(formData + "::" + formID);
    storeLocal(formID, formData);
    switch (formID) {
    case 'about':
    case 'contact':
        var pageKey = getPageKey(formID);
        var status = updatePage(pageKey, formData);
        if (status) {
            hideEl($(this).closest('section'));
            scrollTo('.edit');
        }
        break;
    case 'config':
        var pageKey = getPageKey(formID);
        var status = updatePage(pageKey, formData);
        break;
    default:
        hideEl($(this).closest('section'));
        scrollTo('.edit');
        break;
    }
});

$('.edit input[type=text], .edit textarea').on('click', function () {
    var id = $(this).attr('id').split('_')[0];
    var type = $(this).attr('id').split('_')[1];
//    console.log("id:"+id+"/type:"+type);
    switch (id) {
    case 'carousel':

        break;
    case 'news':

        break;
    case 'config':
        break;
    default:
        break;
    }

});

$("#finish").on('click', function () {
    var formData = {};
    $("form").each(function () {
        var formID = $(this).attr('id').split('-')[0];
        formData = $.extend(formData, $.parseJSON(getLocalStore(formID)));
    });
    var obj = JSON.stringify(formData);
    var pageKey = getPageKey("home");
    var status = updatePage(pageKey, obj);
    if (status) {
        storeLocal("home", obj);
    }
});

$('#product-form button').on('click', function () {
    var formData = $('#product-form').serializeJSON();
    console.log(formData)
    //    var pageKey = getPageKey("product")
    //    var status = updatePage(pageKey, formData);
    //    if(status){
    //        storeLocal("product",formData);
    //    }

    //    var new_product = '<tr>' +
    //        '<td><img alt="140x140" src="http://lorempixel.com/100/100/food" /></td>' +
    //        '<td>香蕉</td>' +
    //        '<td>台灣是香蕉王國</td>' +
    //        '</tr>';
    //    $('tbody').prepend(new_product);
});

$('input[type=file]').on('change', function () {
    $(this).after('<img class="preview" src="/assets/img/ajax-loader.gif" />');
    var img_src;
    var imgJSON = uploadFile(this.files[0], this);
    var obj = $.parseJSON(imgJSON);
    switch (obj.status_code) {
    case 409:
        img_src = obj.status_desc[2];
        break;
    case 201:
        img_src = obj.data.file_name;
        break;
    default:
        $(this).val('');
    }
    $(this).attr('type', 'hidden').val(img_src);
    $(this).next().attr('src', img_src);
});


function getPageKey(key) {
    var url = HOSTNAME + '/json/retrieve_web_list/';
    var obj;

    $.ajax({
        url: url,
        cache: false,
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
            if (typeof data.error === 'undefined') {
                obj = data;
            } else {
                console.log('ERRORS: ' + data.error);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('ERRORS: ' + textStatus);
        }
    });

    var page_id = "";
    switch (key) {
        case "home":
            page_id = obj.data.web_key.page_id.home;
            break;
        case "about":
            page_id = obj.data.web_key.page_id.about;
            break;
        case "contact":
            page_id = obj.data.web_key.page_id.contact;
            break;
        case "config":
            page_id = obj.data.web_key.page_id.config;
            break;
        case "product":
            page_id = obj.data.web_key.page_id.product;
            break;
    }
    return page_id;
}

function updatePage(key, pageData) {
    var result;
    $.ajax({
        url: HOSTNAME + '/json/update_page/' + key,
        type: 'POST',
        data: {
            "json_data": pageData
        },
        cache: false,
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
            if (typeof data.error === 'undefined') {
                result = data;
            } else {
                console.log('ERRORS: ' + data.error);
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('ERRORS: ' + textStatus);
        }
    });
    return result;
}

function uploadFile(obj, el) {
    var file = new FormData();
    var result;
    file.append('file', obj);

    $.ajax({
        url: HOSTNAME + '/json/upload/image/',
        type: 'POST',
        data: file,
        contentType: false,
        processData: false,
        cache: false,
        async: false,
        success: function (data) {
            if (typeof data.error === 'undefined') {
                console.log('SUCCESS: ' + data.success);
                result = data;
            } else {
                console.log('ERRORS: ' + data.error);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (xhr.status == 404 || xhr.status == 500) {
                alert("系統忙碌請稍候再試！");
                $(el).next().attr('src', '');
            }
            if (xhr.status == 409) result = xhr.responseText;
        }
    });
    return result;
}

function getJSON(a) {
    var o = {};
    $.each(a, function () {
        if (this.value) {
            o[this.name] = this.value;
        }
    });
    return o;
}

function hideEl(fn) {
    $(fn).addClass("animated bounceOutRight").hide(1500);
}

function storeLocal(key, val) {
    localStorage[key] = val;
}

function getLocalStore(key) {
    return localStorage[key];
}

function storeSession(key, val) {
    sessionStorage[key] = val;
}

function getStoreSession(key) {
    return sessionStorage[key];
}

function scrollTo(secName){
    $("html,body").animate({scrollTop: $(secName).offset().top}, 1500);
}

function mapJSON(e) {
    var result;
    $.ajax({
        url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + e,
        cache: false,
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
            if (typeof data.error === 'undefined') {
                result = data;
                //                    console.log('SUCCESS: ' + data);
            } else {
                console.log('ERRORS: ' + data.error);
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('ERRORS: ' + textStatus);
        }
    });
    console.log("result=" + JSON.stringify(result));
}
