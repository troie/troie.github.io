"use strict";define([],function(){var n=function(n){return window.open(n,"idf-window-"+Date.now(),"width=600,height=400,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=no")};return{open:n,openAndCallOnClosing:function(e,t){var o,r,i,s=n(e);return o=s,r=t,i=setInterval(function(){o&&!o.closed||(clearInterval(i),r())},100),s}}});
//# sourceMappingURL=windowOpener.js.map
