/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
window.matchMedia=window.matchMedia||(function(e,f){var c,a=e.documentElement,b=a.firstElementChild||a.firstChild,d=e.createElement("body"),g=e.createElement("div");g.id="mq-test-1";g.style.cssText="position:absolute;top:-100em";d.appendChild(g);return function(h){g.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width: 42px; }</style>';a.insertBefore(d,b);c=g.offsetWidth==42;a.removeChild(d);return{matches:c,media:h}}})(document);
/*! Picturefill - Responsive Images that work today.
*  Author: Scott Jehl, Filament Group, 2012 ( new proposal implemented by Shawn Jansepar )
*  License: MIT/GPLv2
*  Spec: http://picture.responsiveimages.org/
*/
(function(w,doc,image){"use strict";function expose(picturefill){if(typeof module==="object"&&typeof module.exports==="object"){module.exports=picturefill;}else if(typeof define==="function"&&define.amd){define("picturefill",function(){return picturefill;});}
if(typeof w==="object"){w.picturefill=picturefill;}}
if(w.HTMLPictureElement){expose(function(){});return;}
doc.createElement("picture");var pf=w.picturefill||{};var regWDesc=/\s+\+?\d+(e\d+)?w/;pf.ns="picturefill";(function(){pf.srcsetSupported="srcset"in image;pf.sizesSupported="sizes"in image;pf.curSrcSupported="currentSrc"in image;})();pf.trim=function(str){return str.trim?str.trim():str.replace(/^\s+|\s+$/g,"");};pf.makeUrl=(function(){var anchor=doc.createElement("a");return function(src){anchor.href=src;return anchor.href;};})();pf.restrictsMixedContent=function(){return w.location.protocol==="https:";};pf.matchesMedia=function(media){return w.matchMedia&&w.matchMedia(media).matches;};pf.getDpr=function(){return(w.devicePixelRatio||1);};pf.getWidthFromLength=function(length){var cssValue;if(!(length&&length.indexOf("%")>-1===false&&(parseFloat(length)>0||length.indexOf("calc(")>-1))){return false;}
length=length.replace("vw","%");if(!pf.lengthEl){pf.lengthEl=doc.createElement("div");pf.lengthEl.style.cssText="border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden";pf.lengthEl.className="helper-from-picturefill-js";}
pf.lengthEl.style.width="0px";try{pf.lengthEl.style.width=length;}catch(e){}
doc.body.appendChild(pf.lengthEl);cssValue=pf.lengthEl.offsetWidth;if(cssValue<=0){cssValue=false;}
doc.body.removeChild(pf.lengthEl);return cssValue;};pf.detectTypeSupport=function(type,typeUri){var image=new w.Image();image.onerror=function(){pf.types[type]=false;picturefill();};image.onload=function(){pf.types[type]=image.width===1;picturefill();};image.src=typeUri;return"pending";};pf.types=pf.types||{};pf.initTypeDetects=function(){pf.types["image/jpeg"]=true;pf.types["image/gif"]=true;pf.types["image/png"]=true;pf.types["image/svg+xml"]=doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1");pf.types["image/webp"]=pf.detectTypeSupport("image/webp","data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=");};pf.verifyTypeSupport=function(source){var type=source.getAttribute("type");if(type===null||type===""){return true;}else{var pfType=pf.types[type];if(typeof pfType==="string"&&pfType!=="pending"){pf.types[type]=pf.detectTypeSupport(type,pfType);return"pending";}else if(typeof pfType==="function"){pfType();return"pending";}else{return pfType;}}};pf.parseSize=function(sourceSizeStr){var match=/(\([^)]+\))?\s*(.+)/g.exec(sourceSizeStr);return{media:match&&match[1],length:match&&match[2]};};pf.findWidthFromSourceSize=function(sourceSizeListStr){var sourceSizeList=pf.trim(sourceSizeListStr).split(/\s*,\s*/),winningLength;for(var i=0,len=sourceSizeList.length;i<len;i++){var sourceSize=sourceSizeList[i],parsedSize=pf.parseSize(sourceSize),length=parsedSize.length,media=parsedSize.media;if(!length){continue;}
if((!media||pf.matchesMedia(media))&&(winningLength=pf.getWidthFromLength(length))){break;}}
return winningLength||Math.max(w.innerWidth||0,doc.documentElement.clientWidth);};pf.parseSrcset=function(srcset){var candidates=[];while(srcset!==""){srcset=srcset.replace(/^\s+/g,"");var pos=srcset.search(/\s/g),url,descriptor=null;if(pos!==-1){url=srcset.slice(0,pos);var last=url.slice(-1);if(last===","||url===""){url=url.replace(/,+$/,"");descriptor="";}
srcset=srcset.slice(pos+1);if(descriptor===null){var descpos=srcset.indexOf(",");if(descpos!==-1){descriptor=srcset.slice(0,descpos);srcset=srcset.slice(descpos+1);}else{descriptor=srcset;srcset="";}}}else{url=srcset;srcset="";}
if(url||descriptor){candidates.push({url:url,descriptor:descriptor});}}
return candidates;};pf.parseDescriptor=function(descriptor,sizesattr){var sizes=sizesattr||"100vw",sizeDescriptor=descriptor&&descriptor.replace(/(^\s+|\s+$)/g,""),widthInCssPixels=pf.findWidthFromSourceSize(sizes),resCandidate;if(sizeDescriptor){var splitDescriptor=sizeDescriptor.split(" ");for(var i=splitDescriptor.length-1;i>=0;i--){var curr=splitDescriptor[i],lastchar=curr&&curr.slice(curr.length-1);if((lastchar==="h"||lastchar==="w")&&!pf.sizesSupported){resCandidate=parseFloat((parseInt(curr,10)/widthInCssPixels));}else if(lastchar==="x"){var res=curr&&parseFloat(curr,10);resCandidate=res&&!isNaN(res)?res:1;}}}
return resCandidate||1;};pf.getCandidatesFromSourceSet=function(srcset,sizes){var candidates=pf.parseSrcset(srcset),formattedCandidates=[];for(var i=0,len=candidates.length;i<len;i++){var candidate=candidates[i];formattedCandidates.push({url:candidate.url,resolution:pf.parseDescriptor(candidate.descriptor,sizes)});}
return formattedCandidates;};pf.dodgeSrcset=function(img){if(img.srcset){img[pf.ns].srcset=img.srcset;img.srcset="";img.setAttribute("data-pfsrcset",img[pf.ns].srcset);}};pf.processSourceSet=function(el){var srcset=el.getAttribute("srcset"),sizes=el.getAttribute("sizes"),candidates=[];if(el.nodeName.toUpperCase()==="IMG"&&el[pf.ns]&&el[pf.ns].srcset){srcset=el[pf.ns].srcset;}
if(srcset){candidates=pf.getCandidatesFromSourceSet(srcset,sizes);}
return candidates;};pf.backfaceVisibilityFix=function(picImg){var style=picImg.style||{},WebkitBackfaceVisibility="webkitBackfaceVisibility"in style,currentZoom=style.zoom;if(WebkitBackfaceVisibility){style.zoom=".999";WebkitBackfaceVisibility=picImg.offsetWidth;style.zoom=currentZoom;}};pf.setIntrinsicSize=(function(){var urlCache={};var setSize=function(picImg,width,res){if(width){picImg.setAttribute("width",parseInt(width/res,10));}};return function(picImg,bestCandidate){var img;if(!picImg[pf.ns]||w.pfStopIntrinsicSize){return;}
if(picImg[pf.ns].dims===undefined){picImg[pf.ns].dims=picImg.getAttribute("width")||picImg.getAttribute("height");}
if(picImg[pf.ns].dims){return;}
if(bestCandidate.url in urlCache){setSize(picImg,urlCache[bestCandidate.url],bestCandidate.resolution);}else{img=doc.createElement("img");img.onload=function(){urlCache[bestCandidate.url]=img.width;if(!urlCache[bestCandidate.url]){try{doc.body.appendChild(img);urlCache[bestCandidate.url]=img.width||img.offsetWidth;doc.body.removeChild(img);}catch(e){}}
if(picImg.src===bestCandidate.url){setSize(picImg,urlCache[bestCandidate.url],bestCandidate.resolution);}
picImg=null;img.onload=null;img=null;};img.src=bestCandidate.url;}};})();pf.applyBestCandidate=function(candidates,picImg){var candidate,length,bestCandidate;candidates.sort(pf.ascendingSort);length=candidates.length;bestCandidate=candidates[length-1];for(var i=0;i<length;i++){candidate=candidates[i];if(candidate.resolution>=pf.getDpr()){bestCandidate=candidate;break;}}
if(bestCandidate){bestCandidate.url=pf.makeUrl(bestCandidate.url);if(picImg.src!==bestCandidate.url){if(pf.restrictsMixedContent()&&bestCandidate.url.substr(0,"http:".length).toLowerCase()==="http:"){if(window.console!==undefined){console.warn("Blocked mixed content image "+bestCandidate.url);}}else{picImg.src=bestCandidate.url;if(!pf.curSrcSupported){picImg.currentSrc=picImg.src;}
pf.backfaceVisibilityFix(picImg);}}
pf.setIntrinsicSize(picImg,bestCandidate);}};pf.ascendingSort=function(a,b){return a.resolution-b.resolution;};pf.removeVideoShim=function(picture){var videos=picture.getElementsByTagName("video");if(videos.length){var video=videos[0],vsources=video.getElementsByTagName("source");while(vsources.length){picture.insertBefore(vsources[0],video);}
video.parentNode.removeChild(video);}};pf.getAllElements=function(){var elems=[],imgs=doc.getElementsByTagName("img");for(var h=0,len=imgs.length;h<len;h++){var currImg=imgs[h];if(currImg.parentNode.nodeName.toUpperCase()==="PICTURE"||(currImg.getAttribute("srcset")!==null)||currImg[pf.ns]&&currImg[pf.ns].srcset!==null){elems.push(currImg);}}
return elems;};pf.getMatch=function(img,picture){var sources=picture.childNodes,match;for(var j=0,slen=sources.length;j<slen;j++){var source=sources[j];if(source.nodeType!==1){continue;}
if(source===img){return match;}
if(source.nodeName.toUpperCase()!=="SOURCE"){continue;}
if(source.getAttribute("src")!==null&&typeof console!==undefined){console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");}
var media=source.getAttribute("media");if(!source.getAttribute("srcset")){continue;}
if((!media||pf.matchesMedia(media))){var typeSupported=pf.verifyTypeSupport(source);if(typeSupported===true){match=source;break;}else if(typeSupported==="pending"){return false;}}}
return match;};function picturefill(opt){var elements,element,parent,firstMatch,candidates,options=opt||{};elements=options.elements||pf.getAllElements();for(var i=0,plen=elements.length;i<plen;i++){element=elements[i];parent=element.parentNode;firstMatch=undefined;candidates=undefined;if(element.nodeName.toUpperCase()!=="IMG"){continue;}
if(!element[pf.ns]){element[pf.ns]={};}
if(!options.reevaluate&&element[pf.ns].evaluated){continue;}
if(parent&&parent.nodeName.toUpperCase()==="PICTURE"){pf.removeVideoShim(parent);firstMatch=pf.getMatch(element,parent);if(firstMatch===false){continue;}}else{firstMatch=undefined;}
if((parent&&parent.nodeName.toUpperCase()==="PICTURE")||(!pf.sizesSupported&&(element.srcset&&regWDesc.test(element.srcset)))){pf.dodgeSrcset(element);}
if(firstMatch){candidates=pf.processSourceSet(firstMatch);pf.applyBestCandidate(candidates,element);}else{candidates=pf.processSourceSet(element);if(element.srcset===undefined||element[pf.ns].srcset){pf.applyBestCandidate(candidates,element);}}
element[pf.ns].evaluated=true;}}
function runPicturefill(){pf.initTypeDetects();picturefill();var intervalId=setInterval(function(){picturefill();if(/^loaded|^i|^c/.test(doc.readyState)){clearInterval(intervalId);return;}},250);var resizeTimer;var handleResize=function(){picturefill({reevaluate:true});};function checkResize(){clearTimeout(resizeTimer);resizeTimer=setTimeout(handleResize,60);}
if(w.addEventListener){w.addEventListener("resize",checkResize,false);}else if(w.attachEvent){w.attachEvent("onresize",checkResize);}}
runPicturefill();picturefill._=pf;expose(picturefill);})(window,window.document,new window.Image());
/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with divs). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */
(function(w){"use strict";w.picturefill=function(){var ps=w.document.getElementsByTagName("figure");for(var i=0,il=ps.length;i<il;i++){if(ps[i].getAttribute("data-picture")!==null){var sources=ps[i].getElementsByTagName("div"),matches=[];for(var j=0,jl=sources.length;j<jl;j++){var media=sources[j].getAttribute("data-media");if(!media||(w.matchMedia&&w.matchMedia(media).matches)){matches.push(sources[j]);}}
var picImg=ps[i].getElementsByTagName("img")[0];if(matches.length){if(!picImg){picImg=w.document.createElement("img");picImg.alt=ps[i].getAttribute("data-alt");ps[i].insertBefore(picImg,ps[i].firstChild);}
picImg.src=matches.pop().getAttribute("data-src");}
else if(picImg){ps[i].removeChild(picImg);}}}};if(w.addEventListener){w.addEventListener("resize",w.picturefill,false);w.addEventListener("DOMContentLoaded",function(){w.picturefill();w.removeEventListener("load",w.picturefill,false);},false);w.addEventListener("load",w.picturefill,false);}
else if(w.attachEvent){w.attachEvent("onload",w.picturefill);}}(this));
(function($){var lastSize=0;var interval=null;$.fn.resetBreakpoints=function(){$(window).unbind('resize');if(interval){clearInterval(interval);}
lastSize=0;};$.fn.setBreakpoints=function(settings){var options=jQuery.extend({distinct:true,breakpoints:new Array(320,480,768,1024)},settings);interval=setInterval(function(){var w=$(window).width();var done=false;for(var bp in options.breakpoints.sort(function(a,b){return(b-a)})){if(!done&&w>=options.breakpoints[bp]&&lastSize<options.breakpoints[bp]){if(options.distinct){for(var x in options.breakpoints.sort(function(a,b){return(b-a)})){if($('body').hasClass('breakpoint-'+options.breakpoints[x])){$('body').removeClass('breakpoint-'+options.breakpoints[x]);$(window).trigger('exitBreakpoint'+options.breakpoints[x]);}}
done=true;}
$('body').addClass('breakpoint-'+options.breakpoints[bp]);$(window).trigger('enterBreakpoint'+options.breakpoints[bp]);}
if(w<options.breakpoints[bp]&&lastSize>=options.breakpoints[bp]){$('body').removeClass('breakpoint-'+options.breakpoints[bp]);$(window).trigger('exitBreakpoint'+options.breakpoints[bp]);}
if(options.distinct&&w>=options.breakpoints[bp]&&w<options.breakpoints[bp-1]&&lastSize>w&&lastSize>0&&!$('body').hasClass('breakpoint-'+options.breakpoints[bp])){$('body').addClass('breakpoint-'+options.breakpoints[bp]);$(window).trigger('enterBreakpoint'+options.breakpoints[bp]);}}
if(lastSize!=w){lastSize=w;}},250);};})(jQuery);
/*!
 * jQuery Form Plugin
 * version: 3.50.0-2014.02.05
 * Requires jQuery v1.5 or later
 * Copyright (c) 2013 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
(function(factory){"use strict";if(typeof define==='function'&&define.amd){define(['jquery'],factory);}else{factory((typeof(jQuery)!='undefined')?jQuery:window.Zepto);}}
(function($){"use strict";var feature={};feature.fileapi=$("<input type='file'/>").get(0).files!==undefined;feature.formdata=window.FormData!==undefined;var hasProp=!!$.fn.prop;$.fn.attr2=function(){if(!hasProp){return this.attr.apply(this,arguments);}
var val=this.prop.apply(this,arguments);if((val&&val.jquery)||typeof val==='string'){return val;}
return this.attr.apply(this,arguments);};$.fn.ajaxSubmit=function(options){if(!this.length){log('ajaxSubmit: skipping submit process - no element selected');return this;}
var method,action,url,$form=this;if(typeof options=='function'){options={success:options};}
else if(options===undefined){options={};}
method=options.type||this.attr2('method');action=options.url||this.attr2('action');url=(typeof action==='string')?$.trim(action):'';url=url||window.location.href||'';if(url){url=(url.match(/^([^#]+)/)||[])[1];}
options=$.extend(true,{url:url,success:$.ajaxSettings.success,type:method||$.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank'},options);var veto={};this.trigger('form-pre-serialize',[this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');return this;}
if(options.beforeSerialize&&options.beforeSerialize(this,options)===false){log('ajaxSubmit: submit aborted via beforeSerialize callback');return this;}
var traditional=options.traditional;if(traditional===undefined){traditional=$.ajaxSettings.traditional;}
var elements=[];var qx,a=this.formToArray(options.semantic,elements);if(options.data){options.extraData=options.data;qx=$.param(options.data,traditional);}
if(options.beforeSubmit&&options.beforeSubmit(a,this,options)===false){log('ajaxSubmit: submit aborted via beforeSubmit callback');return this;}
this.trigger('form-submit-validate',[a,this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-submit-validate trigger');return this;}
var q=$.param(a,traditional);if(qx){q=(q?(q+'&'+qx):qx);}
if(options.type.toUpperCase()=='GET'){options.url+=(options.url.indexOf('?')>=0?'&':'?')+q;options.data=null;}
else{options.data=q;}
var callbacks=[];if(options.resetForm){callbacks.push(function(){$form.resetForm();});}
if(options.clearForm){callbacks.push(function(){$form.clearForm(options.includeHidden);});}
if(!options.dataType&&options.target){var oldSuccess=options.success||function(){};callbacks.push(function(data){var fn=options.replaceTarget?'replaceWith':'html';$(options.target)[fn](data).each(oldSuccess,arguments);});}
else if(options.success){callbacks.push(options.success);}
options.success=function(data,status,xhr){var context=options.context||this;for(var i=0,max=callbacks.length;i<max;i++){callbacks[i].apply(context,[data,status,xhr||$form,$form]);}};if(options.error){var oldError=options.error;options.error=function(xhr,status,error){var context=options.context||this;oldError.apply(context,[xhr,status,error,$form]);};}
if(options.complete){var oldComplete=options.complete;options.complete=function(xhr,status){var context=options.context||this;oldComplete.apply(context,[xhr,status,$form]);};}
var fileInputs=$('input[type=file]:enabled',this).filter(function(){return $(this).val()!=='';});var hasFileInputs=fileInputs.length>0;var mp='multipart/form-data';var multipart=($form.attr('enctype')==mp||$form.attr('encoding')==mp);var fileAPI=feature.fileapi&&feature.formdata;log("fileAPI :"+fileAPI);var shouldUseFrame=(hasFileInputs||multipart)&&!fileAPI;var jqxhr;if(options.iframe!==false&&(options.iframe||shouldUseFrame)){if(options.closeKeepAlive){$.get(options.closeKeepAlive,function(){jqxhr=fileUploadIframe(a);});}
else{jqxhr=fileUploadIframe(a);}}
else if((hasFileInputs||multipart)&&fileAPI){jqxhr=fileUploadXhr(a);}
else{jqxhr=$.ajax(options);}
$form.removeData('jqxhr').data('jqxhr',jqxhr);for(var k=0;k<elements.length;k++){elements[k]=null;}
this.trigger('form-submit-notify',[this,options]);return this;function deepSerialize(extraData){var serialized=$.param(extraData,options.traditional).split('&');var len=serialized.length;var result=[];var i,part;for(i=0;i<len;i++){serialized[i]=serialized[i].replace(/\+/g,' ');part=serialized[i].split('=');result.push([decodeURIComponent(part[0]),decodeURIComponent(part[1])]);}
return result;}
function fileUploadXhr(a){var formdata=new FormData();for(var i=0;i<a.length;i++){formdata.append(a[i].name,a[i].value);}
if(options.extraData){var serializedData=deepSerialize(options.extraData);for(i=0;i<serializedData.length;i++){if(serializedData[i]){formdata.append(serializedData[i][0],serializedData[i][1]);}}}
options.data=null;var s=$.extend(true,{},$.ajaxSettings,options,{contentType:false,processData:false,cache:false,type:method||'POST'});if(options.uploadProgress){s.xhr=function(){var xhr=$.ajaxSettings.xhr();if(xhr.upload){xhr.upload.addEventListener('progress',function(event){var percent=0;var position=event.loaded||event.position;var total=event.total;if(event.lengthComputable){percent=Math.ceil(position/total*100);}
options.uploadProgress(event,position,total,percent);},false);}
return xhr;};}
s.data=null;var beforeSend=s.beforeSend;s.beforeSend=function(xhr,o){if(options.formData){o.data=options.formData;}
else{o.data=formdata;}
if(beforeSend){beforeSend.call(this,xhr,o);}};return $.ajax(s);}
function fileUploadIframe(a){var form=$form[0],el,i,s,g,id,$io,io,xhr,sub,n,timedOut,timeoutHandle;var deferred=$.Deferred();deferred.abort=function(status){xhr.abort(status);};if(a){for(i=0;i<elements.length;i++){el=$(elements[i]);if(hasProp){el.prop('disabled',false);}
else{el.removeAttr('disabled');}}}
s=$.extend(true,{},$.ajaxSettings,options);s.context=s.context||s;id='jqFormIO'+(new Date().getTime());if(s.iframeTarget){$io=$(s.iframeTarget);n=$io.attr2('name');if(!n){$io.attr2('name',id);}
else{id=n;}}
else{$io=$('<iframe name="'+id+'" src="'+s.iframeSrc+'" />');$io.css({position:'absolute',top:'-1000px',left:'-1000px'});}
io=$io[0];xhr={aborted:0,responseText:null,responseXML:null,status:0,statusText:'n/a',getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(status){var e=(status==='timeout'?'timeout':'aborted');log('aborting upload... '+e);this.aborted=1;try{if(io.contentWindow.document.execCommand){io.contentWindow.document.execCommand('Stop');}}
catch(ignore){}
$io.attr('src',s.iframeSrc);xhr.error=e;if(s.error){s.error.call(s.context,xhr,e,status);}
if(g){$.event.trigger("ajaxError",[xhr,s,e]);}
if(s.complete){s.complete.call(s.context,xhr,e);}}};g=s.global;if(g&&0===$.active++){$.event.trigger("ajaxStart");}
if(g){$.event.trigger("ajaxSend",[xhr,s]);}
if(s.beforeSend&&s.beforeSend.call(s.context,xhr,s)===false){if(s.global){$.active--;}
deferred.reject();return deferred;}
if(xhr.aborted){deferred.reject();return deferred;}
sub=form.clk;if(sub){n=sub.name;if(n&&!sub.disabled){s.extraData=s.extraData||{};s.extraData[n]=sub.value;if(sub.type=="image"){s.extraData[n+'.x']=form.clk_x;s.extraData[n+'.y']=form.clk_y;}}}
var CLIENT_TIMEOUT_ABORT=1;var SERVER_ABORT=2;function getDoc(frame){var doc=null;try{if(frame.contentWindow){doc=frame.contentWindow.document;}}catch(err){log('cannot get iframe.contentWindow document: '+err);}
if(doc){return doc;}
try{doc=frame.contentDocument?frame.contentDocument:frame.document;}catch(err){log('cannot get iframe.contentDocument: '+err);doc=frame.document;}
return doc;}
var csrf_token=$('meta[name=csrf-token]').attr('content');var csrf_param=$('meta[name=csrf-param]').attr('content');if(csrf_param&&csrf_token){s.extraData=s.extraData||{};s.extraData[csrf_param]=csrf_token;}
function doSubmit(){var t=$form.attr2('target'),a=$form.attr2('action'),mp='multipart/form-data',et=$form.attr('enctype')||$form.attr('encoding')||mp;form.setAttribute('target',id);if(!method||/post/i.test(method)){form.setAttribute('method','POST');}
if(a!=s.url){form.setAttribute('action',s.url);}
if(!s.skipEncodingOverride&&(!method||/post/i.test(method))){$form.attr({encoding:'multipart/form-data',enctype:'multipart/form-data'});}
if(s.timeout){timeoutHandle=setTimeout(function(){timedOut=true;cb(CLIENT_TIMEOUT_ABORT);},s.timeout);}
function checkState(){try{var state=getDoc(io).readyState;log('state = '+state);if(state&&state.toLowerCase()=='uninitialized'){setTimeout(checkState,50);}}
catch(e){log('Server abort: ',e,' (',e.name,')');cb(SERVER_ABORT);if(timeoutHandle){clearTimeout(timeoutHandle);}
timeoutHandle=undefined;}}
var extraInputs=[];try{if(s.extraData){for(var n in s.extraData){if(s.extraData.hasOwnProperty(n)){if($.isPlainObject(s.extraData[n])&&s.extraData[n].hasOwnProperty('name')&&s.extraData[n].hasOwnProperty('value')){extraInputs.push($('<input type="hidden" name="'+s.extraData[n].name+'">').val(s.extraData[n].value).appendTo(form)[0]);}else{extraInputs.push($('<input type="hidden" name="'+n+'">').val(s.extraData[n]).appendTo(form)[0]);}}}}
if(!s.iframeTarget){$io.appendTo('body');}
if(io.attachEvent){io.attachEvent('onload',cb);}
else{io.addEventListener('load',cb,false);}
setTimeout(checkState,15);try{form.submit();}catch(err){var submitFn=document.createElement('form').submit;submitFn.apply(form);}}
finally{form.setAttribute('action',a);form.setAttribute('enctype',et);if(t){form.setAttribute('target',t);}else{$form.removeAttr('target');}
$(extraInputs).remove();}}
if(s.forceSync){doSubmit();}
else{setTimeout(doSubmit,10);}
var data,doc,domCheckCount=50,callbackProcessed;function cb(e){if(xhr.aborted||callbackProcessed){return;}
doc=getDoc(io);if(!doc){log('cannot access response document');e=SERVER_ABORT;}
if(e===CLIENT_TIMEOUT_ABORT&&xhr){xhr.abort('timeout');deferred.reject(xhr,'timeout');return;}
else if(e==SERVER_ABORT&&xhr){xhr.abort('server abort');deferred.reject(xhr,'error','server abort');return;}
if(!doc||doc.location.href==s.iframeSrc){if(!timedOut){return;}}
if(io.detachEvent){io.detachEvent('onload',cb);}
else{io.removeEventListener('load',cb,false);}
var status='success',errMsg;try{if(timedOut){throw'timeout';}
var isXml=s.dataType=='xml'||doc.XMLDocument||$.isXMLDoc(doc);log('isXml='+isXml);if(!isXml&&window.opera&&(doc.body===null||!doc.body.innerHTML)){if(--domCheckCount){log('requeing onLoad callback, DOM not available');setTimeout(cb,250);return;}}
var docRoot=doc.body?doc.body:doc.documentElement;xhr.responseText=docRoot?docRoot.innerHTML:null;xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;if(isXml){s.dataType='xml';}
xhr.getResponseHeader=function(header){var headers={'content-type':s.dataType};return headers[header.toLowerCase()];};if(docRoot){xhr.status=Number(docRoot.getAttribute('status'))||xhr.status;xhr.statusText=docRoot.getAttribute('statusText')||xhr.statusText;}
var dt=(s.dataType||'').toLowerCase();var scr=/(json|script|text)/.test(dt);if(scr||s.textarea){var ta=doc.getElementsByTagName('textarea')[0];if(ta){xhr.responseText=ta.value;xhr.status=Number(ta.getAttribute('status'))||xhr.status;xhr.statusText=ta.getAttribute('statusText')||xhr.statusText;}
else if(scr){var pre=doc.getElementsByTagName('pre')[0];var b=doc.getElementsByTagName('body')[0];if(pre){xhr.responseText=pre.textContent?pre.textContent:pre.innerText;}
else if(b){xhr.responseText=b.textContent?b.textContent:b.innerText;}}}
else if(dt=='xml'&&!xhr.responseXML&&xhr.responseText){xhr.responseXML=toXml(xhr.responseText);}
try{data=httpData(xhr,dt,s);}
catch(err){status='parsererror';xhr.error=errMsg=(err||status);}}
catch(err){log('error caught: ',err);status='error';xhr.error=errMsg=(err||status);}
if(xhr.aborted){log('upload aborted');status=null;}
if(xhr.status){status=(xhr.status>=200&&xhr.status<300||xhr.status===304)?'success':'error';}
if(status==='success'){if(s.success){s.success.call(s.context,data,'success',xhr);}
deferred.resolve(xhr.responseText,'success',xhr);if(g){$.event.trigger("ajaxSuccess",[xhr,s]);}}
else if(status){if(errMsg===undefined){errMsg=xhr.statusText;}
if(s.error){s.error.call(s.context,xhr,status,errMsg);}
deferred.reject(xhr,'error',errMsg);if(g){$.event.trigger("ajaxError",[xhr,s,errMsg]);}}
if(g){$.event.trigger("ajaxComplete",[xhr,s]);}
if(g&&!--$.active){$.event.trigger("ajaxStop");}
if(s.complete){s.complete.call(s.context,xhr,status);}
callbackProcessed=true;if(s.timeout){clearTimeout(timeoutHandle);}
setTimeout(function(){if(!s.iframeTarget){$io.remove();}
else{$io.attr('src',s.iframeSrc);}
xhr.responseXML=null;},100);}
var toXml=$.parseXML||function(s,doc){if(window.ActiveXObject){doc=new ActiveXObject('Microsoft.XMLDOM');doc.async='false';doc.loadXML(s);}
else{doc=(new DOMParser()).parseFromString(s,'text/xml');}
return(doc&&doc.documentElement&&doc.documentElement.nodeName!='parsererror')?doc:null;};var parseJSON=$.parseJSON||function(s){return window['eval']('('+s+')');};var httpData=function(xhr,type,s){var ct=xhr.getResponseHeader('content-type')||'',xml=type==='xml'||!type&&ct.indexOf('xml')>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.nodeName==='parsererror'){if($.error){$.error('parsererror');}}
if(s&&s.dataFilter){data=s.dataFilter(data,type);}
if(typeof data==='string'){if(type==='json'||!type&&ct.indexOf('json')>=0){data=parseJSON(data);}else if(type==="script"||!type&&ct.indexOf("javascript")>=0){$.globalEval(data);}}
return data;};return deferred;}};$.fn.ajaxForm=function(options){options=options||{};options.delegation=options.delegation&&$.isFunction($.fn.on);if(!options.delegation&&this.length===0){var o={s:this.selector,c:this.context};if(!$.isReady&&o.s){log('DOM not ready, queuing ajaxForm');$(function(){$(o.s,o.c).ajaxForm(options);});return this;}
log('terminating; zero elements found by selector'+($.isReady?'':' (DOM not ready)'));return this;}
if(options.delegation){$(document).off('submit.form-plugin',this.selector,doAjaxSubmit).off('click.form-plugin',this.selector,captureSubmittingElement).on('submit.form-plugin',this.selector,options,doAjaxSubmit).on('click.form-plugin',this.selector,options,captureSubmittingElement);return this;}
return this.ajaxFormUnbind().bind('submit.form-plugin',options,doAjaxSubmit).bind('click.form-plugin',options,captureSubmittingElement);};function doAjaxSubmit(e){var options=e.data;if(!e.isDefaultPrevented()){e.preventDefault();$(e.target).ajaxSubmit(options);}}
function captureSubmittingElement(e){var target=e.target;var $el=$(target);if(!($el.is("[type=submit],[type=image]"))){var t=$el.closest('[type=submit]');if(t.length===0){return;}
target=t[0];}
var form=this;form.clk=target;if(target.type=='image'){if(e.offsetX!==undefined){form.clk_x=e.offsetX;form.clk_y=e.offsetY;}else if(typeof $.fn.offset=='function'){var offset=$el.offset();form.clk_x=e.pageX-offset.left;form.clk_y=e.pageY-offset.top;}else{form.clk_x=e.pageX-target.offsetLeft;form.clk_y=e.pageY-target.offsetTop;}}
setTimeout(function(){form.clk=form.clk_x=form.clk_y=null;},100);}
$.fn.ajaxFormUnbind=function(){return this.unbind('submit.form-plugin click.form-plugin');};$.fn.formToArray=function(semantic,elements){var a=[];if(this.length===0){return a;}
var form=this[0];var formId=this.attr('id');var els=semantic?form.getElementsByTagName('*'):form.elements;var els2;if(els&&!/MSIE [678]/.test(navigator.userAgent)){els=$(els).get();}
if(formId){els2=$(':input[form='+formId+']').get();if(els2.length){els=(els||[]).concat(els2);}}
if(!els||!els.length){return a;}
var i,j,n,v,el,max,jmax;for(i=0,max=els.length;i<max;i++){el=els[i];n=el.name;if(!n||el.disabled){continue;}
if(semantic&&form.clk&&el.type=="image"){if(form.clk==el){a.push({name:n,value:$(el).val(),type:el.type});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}
continue;}
v=$.fieldValue(el,true);if(v&&v.constructor==Array){if(elements){elements.push(el);}
for(j=0,jmax=v.length;j<jmax;j++){a.push({name:n,value:v[j]});}}
else if(feature.fileapi&&el.type=='file'){if(elements){elements.push(el);}
var files=el.files;if(files.length){for(j=0;j<files.length;j++){a.push({name:n,value:files[j],type:el.type});}}
else{a.push({name:n,value:'',type:el.type});}}
else if(v!==null&&typeof v!='undefined'){if(elements){elements.push(el);}
a.push({name:n,value:v,type:el.type,required:el.required});}}
if(!semantic&&form.clk){var $input=$(form.clk),input=$input[0];n=input.name;if(n&&!input.disabled&&input.type=='image'){a.push({name:n,value:$input.val()});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}}
return a;};$.fn.formSerialize=function(semantic){return $.param(this.formToArray(semantic));};$.fn.fieldSerialize=function(successful){var a=[];this.each(function(){var n=this.name;if(!n){return;}
var v=$.fieldValue(this,successful);if(v&&v.constructor==Array){for(var i=0,max=v.length;i<max;i++){a.push({name:n,value:v[i]});}}
else if(v!==null&&typeof v!='undefined'){a.push({name:this.name,value:v});}});return $.param(a);};$.fn.fieldValue=function(successful){for(var val=[],i=0,max=this.length;i<max;i++){var el=this[i];var v=$.fieldValue(el,successful);if(v===null||typeof v=='undefined'||(v.constructor==Array&&!v.length)){continue;}
if(v.constructor==Array){$.merge(val,v);}
else{val.push(v);}}
return val;};$.fieldValue=function(el,successful){var n=el.name,t=el.type,tag=el.tagName.toLowerCase();if(successful===undefined){successful=true;}
if(successful&&(!n||el.disabled||t=='reset'||t=='button'||(t=='checkbox'||t=='radio')&&!el.checked||(t=='submit'||t=='image')&&el.form&&el.form.clk!=el||tag=='select'&&el.selectedIndex==-1)){return null;}
if(tag=='select'){var index=el.selectedIndex;if(index<0){return null;}
var a=[],ops=el.options;var one=(t=='select-one');var max=(one?index+1:ops.length);for(var i=(one?index:0);i<max;i++){var op=ops[i];if(op.selected){var v=op.value;if(!v){v=(op.attributes&&op.attributes.value&&!(op.attributes.value.specified))?op.text:op.value;}
if(one){return v;}
a.push(v);}}
return a;}
return $(el).val();};$.fn.clearForm=function(includeHidden){return this.each(function(){$('input,select,textarea',this).clearFields(includeHidden);});};$.fn.clearFields=$.fn.clearInputs=function(includeHidden){var re=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var t=this.type,tag=this.tagName.toLowerCase();if(re.test(t)||tag=='textarea'){this.value='';}
else if(t=='checkbox'||t=='radio'){this.checked=false;}
else if(tag=='select'){this.selectedIndex=-1;}
else if(t=="file"){if(/MSIE/.test(navigator.userAgent)){$(this).replaceWith($(this).clone(true));}else{$(this).val('');}}
else if(includeHidden){if((includeHidden===true&&/hidden/.test(t))||(typeof includeHidden=='string'&&$(this).is(includeHidden))){this.value='';}}});};$.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=='function'||(typeof this.reset=='object'&&!this.reset.nodeType)){this.reset();}});};$.fn.enable=function(b){if(b===undefined){b=true;}
return this.each(function(){this.disabled=!b;});};$.fn.selected=function(select){if(select===undefined){select=true;}
return this.each(function(){var t=this.type;if(t=='checkbox'||t=='radio'){this.checked=select;}
else if(this.tagName.toLowerCase()=='option'){var $sel=$(this).parent('select');if(select&&$sel[0]&&$sel[0].type=='select-one'){$sel.find('option').selected(false);}
this.selected=select;}});};$.fn.ajaxSubmit.debug=false;function log(){if(!$.fn.ajaxSubmit.debug){return;}
var msg='[jquery.form] '+Array.prototype.join.call(arguments,'');if(window.console&&window.console.log){window.console.log(msg);}
else if(window.opera&&window.opera.postError){window.opera.postError(msg);}}}));
;(function(root,factory){if(typeof module=='object'&&module.exports)module.exports=factory()
else if(typeof define=='function'&&define.amd)define(factory)
else root.Spinner=factory()}(this,function(){"use strict"
var prefixes=['webkit','Moz','ms','O'],animations={},useCssAnimations,sheet
function createEl(tag,prop){var el=document.createElement(tag||'div'),n
for(n in prop)el[n]=prop[n]
return el}
function ins(parent){for(var i=1,n=arguments.length;i<n;i++){parent.appendChild(arguments[i])}
return parent}
function addAnimation(alpha,trail,i,lines){var name=['opacity',trail,~~(alpha*100),i,lines].join('-'),start=0.01+i/lines*100,z=Math.max(1-(1-alpha)/trail*(100-start),alpha),prefix=useCssAnimations.substring(0,useCssAnimations.indexOf('Animation')).toLowerCase(),pre=prefix&&'-'+prefix+'-'||''
if(!animations[name]){sheet.insertRule('@'+pre+'keyframes '+name+'{'+'0%{opacity:'+z+'}'+
start+'%{opacity:'+alpha+'}'+
(start+0.01)+'%{opacity:1}'+
(start+trail)%100+'%{opacity:'+alpha+'}'+'100%{opacity:'+z+'}'+'}',sheet.cssRules.length)
animations[name]=1}
return name}
function vendor(el,prop){var s=el.style,pp,i
prop=prop.charAt(0).toUpperCase()+prop.slice(1)
if(s[prop]!==undefined)return prop
for(i=0;i<prefixes.length;i++){pp=prefixes[i]+prop
if(s[pp]!==undefined)return pp}}
function css(el,prop){for(var n in prop){el.style[vendor(el,n)||n]=prop[n]}
return el}
function merge(obj){for(var i=1;i<arguments.length;i++){var def=arguments[i]
for(var n in def){if(obj[n]===undefined)obj[n]=def[n]}}
return obj}
function getColor(color,idx){return typeof color=='string'?color:color[idx%color.length]}
var defaults={lines:12,length:7,width:3,radius:10,scale:0.75,corners:1,color:'#333',opacity:1/4,rotate:0,direction:1,speed:1,trail:100,fps:20,zIndex:2e9,className:'js-spinner none',top:'50%',left:'50%',shadow:false,hwaccel:false,position:'absolute'}
function Spinner(o){this.opts=merge(o||{},Spinner.defaults,defaults)}
Spinner.defaults={}
merge(Spinner.prototype,{spin:function(target){this.stop()
var self=this,o=self.opts,el=self.el=createEl(null,{className:o.className})
css(el,{position:o.position,width:0,zIndex:o.zIndex,left:o.left,top:o.top})
if(target){target.insertBefore(el,target.firstChild||null)}
el.setAttribute('role','progressbar')
self.lines(el,self.opts)
if(!useCssAnimations){var i=0,start=(o.lines-1)*(1-o.direction)/2,alpha,fps=o.fps,f=fps/o.speed,ostep=(1-o.opacity)/(f*o.trail/100),astep=f/o.lines;(function anim(){i++
for(var j=0;j<o.lines;j++){alpha=Math.max(1-(i+(o.lines-j)*astep)%f*ostep,o.opacity)
self.opacity(el,j*o.direction+start,alpha,o)}
self.timeout=self.el&&setTimeout(anim,~~(1000/fps))})()}
return self},stop:function(){var el=this.el
if(el){clearTimeout(this.timeout)
if(el.parentNode)el.parentNode.removeChild(el)
this.el=undefined}
return this},lines:function(el,o){var i=0,start=(o.lines-1)*(1-o.direction)/2,seg
function fill(color,shadow){return css(createEl(),{position:'absolute',width:o.scale*(o.length+o.width)+'px',height:o.scale*o.width+'px',background:color,boxShadow:shadow,transformOrigin:'left',transform:'rotate('+~~(360/o.lines*i+o.rotate)+'deg) translate('+o.scale*o.radius+'px'+',0)',borderRadius:(o.corners*o.scale*o.width>>1)+'px'})}
for(;i<o.lines;i++){seg=css(createEl(),{position:'absolute',top:1+~(o.scale*o.width/2)+'px',transform:o.hwaccel?'translate3d(0,0,0)':'',opacity:o.opacity,animation:useCssAnimations&&addAnimation(o.opacity,o.trail,start+i*o.direction,o.lines)+' '+1/o.speed+'s linear infinite'})
if(o.shadow)ins(seg,css(fill('#000','0 0 4px #000'),{top:'2px'}))
ins(el,ins(seg,fill(getColor(o.color,i),'0 0 1px rgba(0,0,0,.1)')))}
return el},opacity:function(el,i,val){if(i<el.childNodes.length)el.childNodes[i].style.opacity=val}})
function initVML(){function vml(tag,attr){return createEl('<'+tag+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',attr)}
sheet.addRule('.spin-vml','behavior:url(#default#VML)')
Spinner.prototype.lines=function(el,o){var r=o.scale*(o.length+o.width),s=o.scale*2*r
function grp(){return css(vml('group',{coordsize:s+' '+s,coordorigin:-r+' '+-r}),{width:s,height:s})}
var margin=-(o.width+o.length)*o.scale*2+'px',g=css(grp(),{position:'absolute',top:margin,left:margin}),i
function seg(i,dx,filter){ins(g,ins(css(grp(),{rotation:360/o.lines*i+'deg',left:~~dx}),ins(css(vml('roundrect',{arcsize:o.corners}),{width:r,height:o.scale*o.width,left:o.scale*o.radius,top:-o.scale*o.width>>1,filter:filter}),vml('fill',{color:getColor(o.color,i),opacity:o.opacity}),vml('stroke',{opacity:0}))))}
if(o.shadow)
for(i=1;i<=o.lines;i++){seg(i,-2,'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')}
for(i=1;i<=o.lines;i++)seg(i)
return ins(el,g)}
Spinner.prototype.opacity=function(el,i,val,o){var c=el.firstChild
o=o.shadow&&o.lines||0
if(c&&i+o<c.childNodes.length){c=c.childNodes[i+o];c=c&&c.firstChild;c=c&&c.firstChild
if(c)c.opacity=val}}}
if(typeof document!=='undefined'){sheet=(function(){var el=createEl('style',{type:'text/css'})
ins(document.getElementsByTagName('head')[0],el)
return el.sheet||el.styleSheet}())
var probe=css(createEl('group'),{behavior:'url(#default#VML)'})
if(!vendor(probe,'transform')&&probe.adj)initVML()
else useCssAnimations=vendor(probe,'animation')}
return Spinner}));
(function($){$(document).ready(function(){$('form').each(function(){$(this).attr('novalidate','novalidate');});$('form').on('submit',function(e){errors=0;$(this).find('input[data-isvalid], textarea[data-isvalid]').each(function(){if(($(this).attr('data-isvalid')=='no')||($(this).attr("required")&&($.trim($(this).val())==''))){errors++;errorMsg=$(this).attr('data-error');if((errorMsg!='')&&($(this).attr('data-error')!='')){$(this).attr('data-error','').parent().append('<small class="error-message" role="alert" id="'+$(this).attr('id')+'_error">'+errorMsg+'</small>').addClass('invalid');};$(this).parent().addClass('invalid');};});$(this).find('label.invalid input, label.invalid textarea').first().focus();if(errors!=0)return false;});$('*[data-validate="onblur"]').on('blur',function(){valType=$(this).attr('data-type');value=$(this).val();if($(this).attr("required")){required=true;}else{required=false;};inputValidation($(this),required,valType,value);});});$(document).on('keyup','.invalid input',function(){$(this).next('.error-message').addClass('none');});})(window.jQuery);var urlFilter=/^((http|https):\/\/)?(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|\/|=|?)?]+)+$/;var emailFilter=/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;function inputValidation(which,requiredState,valType,value){if((requiredState==true)&&(value=="")){which.attr('data-isvalid','no').attr('aria-invalid','true');}else if(value==""){which.attr('data-isvalid','').attr('aria-invalid','').parent().removeClass('invalid');}else{if(valType=="email"){if(emailFilter.test(which.val())){which.attr('data-isvalid','yes').attr('aria-invalid','false').parent().removeClass('invalid');}else if(which.val().length!=0){which.attr('data-isvalid','no').attr('aria-invalid','true').parent().removeClass("valid");};}else if(valType=="url"){if(urlFilter.test(which.val())){which.attr('data-isvalid','yes').attr('aria-invalid','false').parent().removeClass('invalid');}else if(which.val().length!=0){which.attr('data-isvalid','no').attr('aria-invalid','true').parent().removeClass("valid");};}else if(valType=="no-url"){if(which.val().indexOf("/")===-1){which.attr('data-isvalid','yes').attr('aria-invalid','false').parent().removeClass('invalid');}else{which.attr('data-isvalid','no').attr('aria-invalid','true').parent().removeClass("valid");};}else if(valType=="matching"){matchWhich=$('#'+which.attr('data-mustmatch'));if(matchWhich.val()==which.val()){which.attr('data-isvalid','yes').attr('aria-invalid','false').parent().removeClass('invalid');}else{which.attr('data-isvalid','no').attr('aria-invalid','true').parent().removeClass("valid");};}else{which.attr('data-isvalid','yes').attr('aria-invalid','false').parent().removeClass('invalid');};};};function EEValidateSync(){$('.ajax-container form, .editForm').on('submit',function(){$(this).find(':required').each(function(){if($.trim($(this).val())!=''){$(this).parent().find('.error-message').addClass('none');}else
if($.trim($(this).val())==''){$(this).parent().find('.error-message').removeClass('none');}});});}
function simplifyRegister(){var sign_in_form=document.getElementById("sign-in-form"),edit_account=document.getElementById("edit-account-form"),email=document.getElementById("email"),username=document.getElementById("username"),password=document.getElementById("password"),password_confirm=document.getElementById("password_confirm");if(sign_in_form){sign_in_form.addEventListener("submit",function(){username.value=email.value;password_confirm.value=password.value;},false);}
if(edit_account){edit_account.addEventListener("submit",function(){password_confirm.value=password.value;},false);}}
simplifyRegister();
var b=document.documentElement;b.setAttribute('data-useragent',navigator.userAgent);b.setAttribute('data-platform',navigator.platform);$(document).ready(function(){$('.global-nav').addClass('deluxe');$('genius-referent').attr('data-genius-style-id','').attr('data-genius-featured-referent','').attr('data-genius-referent-id','').attr('data-genius-wrapped-path','').attr('data-genius-api-path','').attr('data-genius-annotator-id','');$('.go-to-nav').click(function(event){var navState=$("html").hasClass('show-nav');var scrollHandler=function(){$('html').removeClass('show-nav');}
if(!navState){$("html").addClass('show-nav');}else{$("html").removeClass('show-nav');}
return false;});$('.global-nav').click(function(event){event.stopPropagation();});$('body').click(function(){$('html').removeClass('show-nav');});$('.load-comments-no-js').addClass('none');$('#load-comments').addClass('buttonish new');$('[data-fallback]').on('error',function(){var fallback=$(this).attr('data-fallback');$(this).attr('src',fallback);});$('[data-trackevent]').on('click',function(){mixpanel.track($(this).attr('data-trackevent'));});$("sup[data-footnote]").each(function(){noteCount=$(this).html();$(this).html('<a id="ref'+noteCount+'" href="#note'+noteCount+'">'+noteCount+'</a>');});var count1=0;var count2=0;var count3=0;var hashLink;$(".hentry .main-content > h2, .hentry .main-content > h3, .hentry .main-content > h4, .hentry .main-content > h5, .hentry .main-content > h6").each(function(){count1++;var thisID=$(this).attr('id');if(typeof thisID!=='undefined'&&thisID!==false){hashLink=$(this).attr("id");console.log('found one with an id');}else{hashLink="section"+count1;$(this).attr("id",hashLink);};$(this).append("<a class='subhead-anchor' href='#"+hashLink+"'>#"+hashLink+"</a>");});$(".hentry .main-content > pre").each(function(){count2++;$(this).attr("id","snippet"+count2);});$(".hentry .main-content > figure:not(.tall-hero)").each(function(){count3++;$(this).attr("id","figure"+count3);});var AlaEvents={createPanelistAnchor:function(){var nameLink=$('.name-link'),nameTarget=$('.columnist'),nameHash,i,j;for(i=0;i<nameLink.length;i++){nameHash="#panelist"+(i+1);nameLink[i].setAttribute("href",nameHash);}
for(j=0;j<nameTarget.length;j++){nameTarget[j].setAttribute("id","panelist"+(j+1));}}};AlaEvents.createPanelistAnchor();$("body").on("click","#cancel-login",function(e){e.preventDefault();$("#sign-in-form").removeClass("active");$("#login-buttons").addClass("active");});$("body").on("click","#cancel-password-reset",function(e){e.preventDefault();$("#forgot_password_form").removeClass("active");$("#sign-in-form").addClass("active");});$("body").on("click","#cancel-registration",function(e){e.preventDefault();$("#register-form").removeClass("active");$("#sign-in-form").addClass("active");});$("body").on("click","#show-native-login",function(e){e.preventDefault();$("#sign-in-form").toggleClass("active");$("#register-form").removeClass("active");$("#forgot_password_form").removeClass("active");$("#login-buttons").removeClass("active");$("#subject-name-here").focus();});$("body").on("click","#show-forgot-password-form",function(e){e.preventDefault();$("#sign-in-form").removeClass("active");$("#show-registration-form").removeClass("active");$("#forgot_password_form").toggleClass("active");$("#subject-email-here").focus();});$("body").on("click","#show-registration-form",function(e){e.preventDefault();$("#sign-in-form").removeClass("active");$("#forgot_password_form").removeClass("active");$("#register-form").toggleClass("active");$("#subject-username-here").focus();});$(".col-holder .secondary-column .author-nav:not(.active) h2").click(function(){$(".col-holder .secondary-column .author-nav").toggleClass("active");});$("#next-letters").click(function(e){e.preventDefault();$("#alphabits").disableSelection();maskWidth=$("#alphabits").width();listWidth=$("#alphabits > ol").width();currentOffset=parseInt($("#alphabits > ol").css("margin-left"));if(maskWidth>-(currentOffset+maskWidth)){$("#alphabits > ol").css("margin-left",(currentOffset-maskWidth+89));}});$("#previous-letters").click(function(e){e.preventDefault();$("#alphabits").disableSelection();maskWidth=$("#alphabits").width();currentOffset=parseInt($("#alphabits > ol").css("margin-left"));if(currentOffset!="0"){$("#alphabits > ol").css("margin-left",(currentOffset+maskWidth-89));};});$("a[data-alphabit]").on("click",function(e){e.preventDefault();$("#alphabits").disableSelection();if(!$(this).hasClass("active")){$("a[data-alphabit]").removeClass("active");letter=$(this).attr("data-alphabit");$("#alpha-target").attr("data-show",letter);$(this).addClass("active");$("#browse-title").attr("data-display-letter",letter.toUpperCase());}else{$("a[data-alphabit]").removeClass("active");$("#alpha-target").removeAttr("data-show");$("#browse-title").removeAttr("data-display-letter");};});$("#load-comments").click(function(e){e.preventDefault();loadThoseComments();});$("form#main-search").submit(function(e){userQuery=$("input[name=q]").val();if(userQuery==""){$("input[name=keywords]").attr("placeholder","").focus();e.stopPropagation();return false;}else{e.preventDefault();window.location='/search?keywords='+userQuery;};});$("body").on("click",".embed-code",function(){$(this).select();});if($(".comment").length!=-1){$(".comment").CommentEditor();};$("#comments").bind("comments-appended",function(){$(".comment").CommentEditor();});$('body').on('input propertychange focus','textarea[data-autoresize]',function(){autoResize($(this));});var tabMaster=false;$('body').on('focus','[data-tabmaster]',function(){tabMaster=$(this).attr('data-tabmaster');});$('body').on('keydown','[data-tabto]',function(e){var target=$(this).attr('data-tabto');if(e.which==9&&!e.shiftKey&&tabMaster=="true"){e.preventDefault();console.log('tab detected');$('#'+target).focus();}else if(e.shiftKey){tabMaster=false;};});});sponsorSniff=document.addEventListener("DOMNodeInserted",function(event){if($(event.target).parent()[0].id=='bsap_1031'){$('body').addClass('sponsored');showSponsorImage();document.removeEventListener('DOMNodeInserted',sponsorSniff,false);};});var dpr=window.devicePixelRatio
function showSponsorImage(){if((dpr!='undefined')&&(dpr>'1')){var adImage=$('.sponsor-logo').attr('data-hiresbg');}else{var adImage=$('.sponsor-logo').attr('data-standardbg');};var adHeight=$('.sponsor-logo').attr('data-height');var adWidth=$('.sponsor-logo').attr('data-width');$('.sponsor-logo').css({height:adHeight,width:adWidth,backgroundImage:'url('+adImage+')'});$('.sponsor-top').css('display','block');};var loadWhichComments=$("#load-comments").attr("data-url-title");var loadComments=function(){if(typeof states!="undefined")
{if(states.page=='article'||states.page=='column'||states.page=='blog'){$.get("/comments/embed-comments/"+loadWhichComments,function(data){$(".article-comments.form").before(data).trigger("comments-appended");$("#load-comments").remove();});}}};var dataUrlTitle=$("#comments h1").attr("data-url-title");var AlaPostLoad={loadTranslations:function(){var translationBlock=$('.minutiae-block.translation-block');if(typeof states!="undefined"){if(states.page=='article'||states.page=='column'||states.page=='blog'){$.get("/ajax/translations/"+dataUrlTitle,function(ret){translationBlock.replaceWith(ret);});}}},loadCommentCount:function(){var commentCountIndex=$(".entry-details").attr("data-url-title");if(typeof states!="undefined")
{if(states.page=='article'||states.page=='column'||states.page=='blog'){$.get("/comments/comment-count-comment-form/"+dataUrlTitle,function(ret){$('#comments h1 span').replaceWith(ret);},false);}
if(states.page=='article'||states.page=='column'){$.get("/comments/comment-count-bubble/"+dataUrlTitle,function(ret){$('.comment-bubble-articles span').replaceWith(ret);},false);}
if(states.page=='blog'){$.get("/comments/comment-count-bubble-blog/"+dataUrlTitle,function(ret){$('.comment-bubble-blog span').replaceWith(ret);},false);}}
if($('body').hasClass('home-page')){console.log('home');$.get("/comments/comment-count-index/"+commentCountIndex,function(ret){$('#home-page .comments').replaceWith(ret);},false);}},loadBsaAds:function(){var request=new XMLHttpRequest();request.open('GET','/ajax/bsa_ads/',true);request.onload=function(){if(request.status>=200&&request.status<400){var data=request.responseText;var bsaAds=document.getElementById('bsa-apiads');bsaAds.outerHTML=data;}};request.send();}};loadComments();$(window).setBreakpoints({distinct:true,breakpoints:[1,600]});$(window).bind('exitBreakpoint600',function(){$(window).unbind("scrollend");});$.fn.scrollStopped=function(callback){$(this).scroll(function(){var self=this,$this=$(self);if($this.data('scrollTimeout')){clearTimeout($this.data('scrollTimeout'));}
$this.data('scrollTimeout',setTimeout(callback,250,self));});};window.onload=function(){if(window.location.hash){parseHash=window.location.hash.split("#");if((parseHash[1]=="comment-form")||(parseHash[1]=="comments")){loadThoseComments(parseHash[1]);}else if($("#"+parseHash[1]).length){}}};window.log=function f(){log.history=log.history||[];log.history.push(arguments);if(this.console){var args=arguments,newarr;args.callee=args.callee.caller;newarr=[].slice.call(args);if(typeof console.log==='object')log.apply.call(console.log,console,newarr);else console.log.apply(console,newarr);}};(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return(window.console={});}}());$.support.selectstart="onselectstart"in document.createElement("div");$.fn.disableSelection=function(){return this.bind(($.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(event){event.preventDefault();});};if(document.URL.indexOf("do-not-share")==-1){Modernizr.load({test:($("[class*='language']").length>0),yep:["/components/assets/css/prism.css","/components/assets/js/libs/prism.js"],callback:function(url,res,key){if(url==="/components/assets/js/libs/prism.js"){Prism.highlightAll();}}});};$.fn.CommentEditor=function(options){var OPT;OPT=$.extend({url:"/?ACT=4",comment_body:'.comment-body',showEditor:'.edit-link',hideEditor:'.cancel-edit',hideEmbed:'.cancel-embed',saveComment:'.submit-edit',closeComment:'.mod-link',showEmbed:'.embed-link'},options);var view_elements=[OPT.comment_body,OPT.showEditor,OPT.closeComment,OPT.showEmbed].join(','),edit_elements='.edit-comment',embed_elements='.embed-comment';return this.each(function(){var id=this.id,parent=$(this);parent.find(OPT.showEditor).click(function(){showEditor(id);return false;});parent.find(OPT.hideEditor).click(function(){hideEditor(id);return false;});parent.find(OPT.hideEmbed).click(function(){hideEmbed(id);return false;});parent.find(OPT.saveComment).click(function(){saveComment(id);return false;});parent.find(OPT.closeComment).click(function(){closeComment(id);return false;});parent.find(OPT.showEmbed).click(function(){showEmbed(id);return false;});});function showEmbed(id){$("#"+id).find(view_elements).css('opacity','.1').end().find(embed_elements).slideDown('fast').end();}
function showEditor(id){$("#"+id).find(view_elements).css('opacity','.1').end().find(edit_elements).slideDown('fast').end();}
function hideEditor(id){$("#"+id).find(view_elements).css('opacity','1').end().find(edit_elements).slideUp('fast');}
function hideEmbed(id){$("#"+id).find(view_elements).css('opacity','1').end().find(embed_elements).slideUp('fast');}
var getHash;function closeComment(id){var confirmClose=confirm('Are you sure?');if(confirmClose==true){if(getHash==null){getHash=$("#comments-parent").data('xid');}
var data={status:"close",comment_id:id,XID:getHash};$.post(OPT.url,data,function(res){if(res.error){return $.error('Could not moderate comment.');}
hash=res.XID;$('input[name=XID]').val(hash);$('#'+id).fadeOut('fast');getHash=hash;AlaPostLoad.loadCommentCount();console.log('comment count loaded after comment deleted');});var urlTitle=$("#comments h1").attr("data-url-title");$.ajax({url:"/tools/cf_cache",type:"GET",dataType:'json',data:({url:urlTitle}),success:function(data){console.log(data);}});}}
function saveComment(id){if(getHash==null){getHash=$("#comments-parent").data('xid');}
var content=$("#"+id).find('.edit-comment'+' textarea').val(),data={comment:content,comment_id:id,XID:getHash};$.post(OPT.url,data,function(res){if(res.error){return $.error('Could not save comment.');}
hash=res.XID;$('input[name=XID]').val(hash);$("#"+id).find('.comment-body').html(res.comment);hideEditor(id);getHash=hash;});var urlTitle=$("#comments h1").attr("data-url-title");$.ajax({url:"/tools/cf_cache",type:"GET",dataType:'json',data:({url:urlTitle}),success:function(data){console.log(data);}});}};function commentSubmit(){$('#comment-form').on('submit',function(event){var urlTitle=$("#comments h1").attr("data-url-title");$.ajax({url:"/tools/cf_cache",type:"GET",dataType:'json',data:({url:urlTitle}),success:function(data){console.log(data);}});console.log('comment submitted');});}
commentSubmit();var properties=['-webkit-appearance','-moz-appearance','-o-appearance','appearance','font-family','font-size','font-weight','font-style','border','border-top','border-right','border-bottom','border-left','box-sizing','padding','padding-top','padding-right','padding-bottom','padding-left','min-height','max-height','line-height'],escaper=$('<span />');function escape(string){return escaper.text(string).text().replace(/\n/g,'<br>');};function autoResize(which){if(!which.data('autogrow-applied')){var textarea=which,initialHeight=textarea.innerHeight(),expander=$('<div />'),timer=null;expander.css({'position':'absolute','visibility':'hidden','bottom':'110%'})
$.each(properties,function(i,p){expander.css(p,textarea.css(p));});textarea.after(expander);textarea.css({'overflow-y':'hidden','resize':'none','box-sizing':'border-box'});function sizeTextarea(){clearTimeout(timer);timer=setTimeout(function(){var value=escape(textarea.val().replace(/\</g,'&lt;'))+'<br>z';expander.html(value);expander.css('width',textarea.innerWidth()+2+'px');textarea.css('height',Math.max(expander.innerHeight(),initialHeight)+6+'px');},100);}
textarea.on('input.autogrow propertychange.autogrow focus',sizeTextarea);sizeTextarea();textarea.data('autogrow-applied',true);};};$.fn.changeType=function(x,type){if(x.prop('type')==type)return x;try{return x.prop('type',type);}catch(e){var html=$("<div>").append(x.clone()).html();var regex=/type=(\")?([^\"\s]+)(\")?/;var tmp=$(html.match(regex)==null?html.replace(">",' type="'+type+'">'):html.replace(regex,'type="'+type+'"'));tmp.data('type',x.data('type'));var events=x.data('events');var cb=function(events){return function(){for(i in events)
{var y=events[i];for(j in y)
tmp.bind(i,y[j].handler);}}}(events);x.replaceWith(tmp);setTimeout(cb,10);return tmp;}}
$(document).ready(function(){if(typeof states!="undefined")
{if(window.location.href==states.site_url+states.segments+'/'+states.register){console.log('script.js call');AlaAuth.loadTemplate(states.register);history.replaceState(states.register,'on '+states.register,states.site_url+states.segments+'/'+states.register);}
if(window.location.href==states.site_url+states.segments+'/'+states.password){console.log('script.js call');AlaAuth.loadTemplate(states.password);history.replaceState(states.password,'on '+states.password,states.site_url+states.segments+'/'+states.password);}}});
