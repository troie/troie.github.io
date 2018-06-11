"use strict";define(function(){return function(e,n){return new Promise(function(t){e.addEventListener(n,function r(i){i.target===e&&(e.removeEventListener(n,r),t(i))})})}});
//# sourceMappingURL=listenOnce.js.map
