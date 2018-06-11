"use strict";define([],function(){return{getPrefixedEvent:function(n){var t,e={animation:"",webkitAnimation:"webkit",msAnimation:"ms",oAnimation:"o"},i=document.documentElement.style;for(var r in e)if(void 0!==i[r]){var o=e[r];return""===o?n:""+o+((t=n).charAt(0).toUpperCase()+t.slice(1))}return n}}});
//# sourceMappingURL=animation.js.map
