"use strict";define(["lightense-image"],function(e){var n=function(n){var t=document.querySelector(".lightense-backdrop");t&&t.parentNode.removeChild(t),e(n)},t=function(e){var t;e instanceof HTMLImageElement&&((t=e).width>0&&t.height>0&&t.src?n(e):e.addEventListener("load",function(e){n(e.currentTarget)}))};return{setup:function(e){if("number"==typeof e.length&&e.length>0)for(var n=0;n<e.length;n++)t(e[n]);else t(e)}}});