"use strict";var _createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(n,t,i){return t&&e(n.prototype,t),i&&e(n,i),n}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}require(["require.config"],function(){return new(function(){function e(){_classCallCheck(this,e),this.openBtn=document.querySelector(".js-open-offcanvas"),this.menuWrap=document.querySelector(".offCanvas-wrap"),this.menu=document.querySelector(".offCanvas-menu"),this.menu&&(this.onClick=this.onClick.bind(this),this.onClickOutside=this.onClickOutside.bind(this),this.addEventListeners())}return _createClass(e,null,[{key:"OPEN_CLASS",get:function(){return"menu-open"}}]),_createClass(e,[{key:"addEventListeners",value:function(){var e=this;this.openBtn.addEventListener("click",this.onClick),["click","touchstart"].forEach(function(n){return document.addEventListener(n,e.onClickOutside)})}},{key:"onClick",value:function(){this.openMenu()}},{key:"onClickOutside",value:function(n){this.menu.contains(n.target)||this.openBtn.contains(n.target)||!this.menuWrap.classList.contains(e.OPEN_CLASS)||this.closeMenu()}},{key:"openMenu",value:function(){this.menuWrap.classList.add(e.OPEN_CLASS)}},{key:"closeMenu",value:function(){this.menuWrap.classList.remove(e.OPEN_CLASS)}}]),e}())});
//# sourceMappingURL=offcanvas.js.map
