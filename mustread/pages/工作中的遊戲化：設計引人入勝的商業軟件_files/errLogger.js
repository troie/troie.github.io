"use strict";var _createClass=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}();function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}define([],function(){var e=function(){function e(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null;_classCallCheck(this,e),this.functionName=r,this.args=t,this.fileName=n,this.lineNumber=i,this.columnNumber=a,this.source=o}return _createClass(e,[{key:"toString",value:function(){return(this.functionName||"{anonymous}")+("("+(this.args||[]).join(",")+")")+(this.fileName?"@"+this.fileName:"")+(this.constructor.isNumber(this.lineNumber)?":"+this.lineNumber:"")+(this.constructor.isNumber(this.columnNumber)?":"+this.columnNumber:"")}}],[{key:"isNumber",value:function(e){return!isNaN(parseFloat(e))&&isFinite(e)}}]),e}(),r=function(){function r(e){_classCallCheck(this,r),this.error=e,this.FIREFOX_SAFARI_STACK_REGEXP=/(^|@)\S+:\d+/,this.CHROME_IE_STACK_REGEXP=/^\s*at .*(\S+:\d+|\(native\))/m,this.SAFARI_NATIVE_CODE_REGEXP=/^(eval@)?(\[native code])?$/}return _createClass(r,[{key:"parse",value:function(){if(void 0!==this.error.stacktrace||void 0!==this.error["opera#sourceloc"])return this.parseOpera();if(this.error.stack&&this.error.stack.match(this.CHROME_IE_STACK_REGEXP))return this.parseV8OrIE();if(this.error.stack)return this.parseFFOrSafari();throw new Error("Cannot parse given Error object")}},{key:"parseV8OrIE",value:function(){var r=this;return this.error.stack.split("\n").filter(function(e){return!!e.match(this.CHROME_IE_STACK_REGEXP)},this).map(function(t){t.indexOf("(eval ")>-1&&(t=t.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(\),.*$)/g,""));var n=t.replace(/^\s+/,"").replace(/\(eval code/g,"(").split(/\s+/).slice(1),i=r.constructor.extractLocation(n.pop()),a=n.join(" ")||void 0,o=["eval","<anonymous>"].indexOf(i[0])>-1?void 0:i[0];return new e(a,[],o,parseInt(i[1]),parseInt(i[2]),t)},this)}},{key:"parseFFOrSafari",value:function(){return this.error.stack.split("\n").filter(function(e){return!e.match(this.SAFARI_NATIVE_CODE_REGEXP)},this).map(function(r){if(r.indexOf(" > eval")>-1&&(r=r.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),-1===r.indexOf("@")&&-1===r.indexOf(":"))return new e(r);var t=r.split("@"),n=this.constructor.extractLocation(t.pop()),i=t.join("@")||void 0;return new e(i,[],n[0],parseInt(n[1]),parseInt(n[2]),r)},this)}},{key:"parseOpera",value:function(){return this.error.stack.split("\n").filter(function(e){return!!e.match(this.FIREFOX_SAFARI_STACK_REGEXP)&&!e.match(/^Error created at/)},this).map(function(r){var t=r.split("@"),n=e.extractLocation(t.pop()),i=t.shift()||"",a=i.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,o=void 0;i.match(/\(([^)]*)\)/)&&(o=i.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var s=void 0===o||"[arguments not available]"===o?void 0:o.split(",");return new e(a,s,n[0],parseInt(n[1]),parseInt(n[2]),r)})}}],[{key:"extractLocation",value:function(e){if(-1===e.indexOf(":"))return[e];var r=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(e.replace(/[()]/g,""));return[r[1],r[2]||void 0,r[3]||void 0]}}]),r}();return{error:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=window.getErrorContext()||{};n.errorName="Logger Error Report",n.errorMessage=e,n.customContext=t,n.reporter="Logger.js";var i=function(){try{throw new Error}catch(t){try{var e=new r(t).parse();return e.length>2&&e.splice(0,2),e}catch(e){return[]}}}();return i.length>0&&(n.functionContext=i[0],n.errorStack=n.errorName+": "+n.errorMessage+"\n"+i.join("\n, ")),window.fetch("/api/errors",{method:"POST",body:JSON.stringify(n),credentials:"same-origin",headers:{Accept:"application/json","Content-Type":"application/json","X-CSRF-TOKEN":window.csrfToken}}).catch(function(){})}}});
//# sourceMappingURL=errLogger.js.map
