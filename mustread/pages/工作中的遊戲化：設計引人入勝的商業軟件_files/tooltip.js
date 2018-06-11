"use strict";define(["jquery"],function(t){return{applyTo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body;t("[data-tip]",e).each(function(e,i){var n=t(i),d=t(window).width()-(n.offset().left+n.outerWidth())<230?"tip-rtl":"",o=n.outerWidth()>230?"tip-center":"";n.addClass(d+" "+o)})}}});
//# sourceMappingURL=tooltip.js.map
