"use strict";define(["jquery","modules/cookie","foundation.reveal"],function(e,n){return{show:function(o,t){null===n.read(t)&&(e("#"+o).foundation("reveal","open"),n.write(t,"yes",{days:365}))},close:function(n){e("#"+n).foundation("reveal","close")},reset:function(e){n.remove(e)}}});
//# sourceMappingURL=roadblock.js.map
