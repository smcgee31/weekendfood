!function(){"use strict";function t(e,o){var i;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=e,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!t.notNeeded(e)){for(var r=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],a=this,c=0,s=r.length;c<s;c++)a[r[c]]=u(a[r[c]],a);n&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,o){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,o):i.call(e,t,n,o)},e.addEventListener=function(t,n,o){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(e,t,n,o)}),"function"==typeof e.onclick&&(i=e.onclick,e.addEventListener("click",function(t){i(t)},!1),e.onclick=null)}function u(t,e){return function(){return t.apply(e,arguments)}}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!e,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,i=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=o&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(o&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],(n=document.createEvent("MouseEvents")).initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},t.prototype.determineEventType=function(t){return n&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;o&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,n;if(!(e=t.fastClickScrollParent)||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,n,r;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],o){if((r=window.getSelection()).rangeCount&&!r.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n},t.prototype.onTouchMove=function(t){return!this.trackingClick||((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0)},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,a,c,s,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(u=t.changedTouches[0],(l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l).fastClickScrollParent=this.targetElement.fastClickScrollParent),"label"===(c=l.tagName.toLowerCase())){if(e=this.findControl(l)){if(this.focus(l),n)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-a>100||o&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),o&&"select"===c||(this.targetElement=null,t.preventDefault()),!1);return!(!o||i||!(s=l.fastClickScrollParent)||s.fastClickLastScrollTop===s.scrollTop)||(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return!this.targetElement||(!!t.forwardedTouchEvent||(!t.cancelable||(!(!this.needsClick(this.targetElement)||this.cancelNextClick)||(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1))))},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail||((e=this.onMouse(t))||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;n&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,o,i;if(void 0===window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/))[1]>=10&&i[2]>=3&&(e=document.querySelector("meta[name=viewport]"))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction||(!!(+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]>=27&&(e=document.querySelector("meta[name=viewport]"))&&(-1!==e.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))||("none"===t.style.touchAction||"manipulation"===t.style.touchAction))},t.attach=function(e,n){return new t(e,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}();
(function(t){"use strict";t.Placeholders={Utils:{addEventListener:function(t,e,r){return t.addEventListener?t.addEventListener(e,r,!1):t.attachEvent?t.attachEvent("on"+e,r):void 0},inArray:function(t,e){var r,a;for(r=0,a=t.length;a>r;r++)if(t[r]===e)return!0;return!1},moveCaret:function(t,e){var r;t.createTextRange?((r=t.createTextRange()).move("character",e),r.select()):t.selectionStart&&(t.focus(),t.setSelectionRange(e,e))},changeType:function(t,e){try{return t.type=e,!0}catch(t){return!1}}}}})(this),function(t){"use strict";function e(){}function r(){try{return document.activeElement}catch(t){}}function a(t,e){var r,a,n=!!e&&t.value!==e,u=t.value===t.getAttribute(N);return!(!n&&!u||"true"!==t.getAttribute(S))&&(t.removeAttribute(S),t.value=t.value.replace(t.getAttribute(N),""),t.className=t.className.replace(T,""),a=t.getAttribute(k),parseInt(a,10)>=0&&(t.setAttribute("maxLength",a),t.removeAttribute(k)),(r=t.getAttribute(w))&&(t.type=r),!0)}function n(t){var e=t.getAttribute(N);return!(""!==t.value||!e)&&(t.setAttribute(S,"true"),t.value=e,t.className+=" "+L,t.getAttribute(k)||(t.setAttribute(k,t.maxLength),t.removeAttribute("maxLength")),t.getAttribute(w)?t.type="text":"password"===t.type&&P.changeType(t,"text")&&t.setAttribute(w,"password"),!0)}function u(t,e){var r,a,n,u,i;if(t&&t.getAttribute(N))e(t);else for(a=t?t.getElementsByTagName("input"):o,n=t?t.getElementsByTagName("textarea"):c,i=0,u=(r=a?a.length:0)+(n?n.length:0);u>i;i++)e(r>i?a[i]:n[i-r])}function i(t){u(t,a)}function l(t){var e,u,l,o,c,d;t.form&&("string"==typeof(h=t.form)&&(h=document.getElementById(h)),h.getAttribute(B)||(P.addEventListener(h,"submit",(d=h,function(){i(d)})),h.setAttribute(B,"true"))),P.addEventListener(t,"focus",(c=t,function(){s&&c.value===c.getAttribute(N)&&"true"===c.getAttribute(S)?P.moveCaret(c,0):a(c)})),P.addEventListener(t,"blur",(o=t,function(){n(o)})),s&&(P.addEventListener(t,"keydown",(l=t,function(t){return g=l.value,"true"===l.getAttribute(S)&&g===l.getAttribute(N)&&P.inArray(x,t.keyCode)?(t.preventDefault&&t.preventDefault(),!1):void 0})),P.addEventListener(t,"keyup",(u=t,function(){a(u,g),""===u.value&&(u.blur(),P.moveCaret(u,0))})),P.addEventListener(t,"click",(e=t,function(){e===r()&&e.value===e.getAttribute(N)&&"true"===e.getAttribute(S)&&P.moveCaret(e,0)}))),t.setAttribute(C,"true"),t.setAttribute(N,b),(s||t!==r())&&n(t)}var o,c,s,d,g,v,p,b,m,h,f,A,y,E=["text","search","url","tel","email","password","number","textarea"],x=[27,33,34,35,36,37,38,39,40,8,46],L="placeholdersjs",T=RegExp("(?:^|\\s)"+L+"(?!\\S)"),N="data-placeholder-value",S="data-placeholder-active",w="data-placeholder-type",B="data-placeholder-submit",C="data-placeholder-bound",k="data-placeholder-maxlength",I=document.createElement("input"),R=document.getElementsByTagName("head")[0],V=document.documentElement,D=t.Placeholders,P=D.Utils;if(D.nativeSupport=void 0!==I.placeholder,!D.nativeSupport){for(o=document.getElementsByTagName("input"),c=document.getElementsByTagName("textarea"),s="false"===V.getAttribute("data-placeholder-focus"),d="false"!==V.getAttribute("data-placeholder-live"),(v=document.createElement("style")).type="text/css",p=document.createTextNode("."+L+" { color:#ccc; }"),v.styleSheet?v.styleSheet.cssText=p.nodeValue:v.appendChild(p),R.insertBefore(v,R.firstChild),y=0,A=o.length+c.length;A>y;y++)f=o.length>y?o[y]:c[y-o.length],(b=f.attributes.placeholder)&&((b=b.nodeValue)&&P.inArray(E,f.type)&&l(f));m=setInterval(function(){for(y=0,A=o.length+c.length;A>y;y++)f=o.length>y?o[y]:c[y-o.length],(b=f.attributes.placeholder)?(b=b.nodeValue)&&P.inArray(E,f.type)&&(f.getAttribute(C)||l(f),(b!==f.getAttribute(N)||"password"===f.type&&!f.getAttribute(w))&&("password"===f.type&&!f.getAttribute(w)&&P.changeType(f,"text")&&f.setAttribute(w,"password"),f.value===f.getAttribute(N)&&(f.value=b),f.setAttribute(N,b))):f.getAttribute(S)&&(a(f),f.removeAttribute(N));d||clearInterval(m)},100)}P.addEventListener(t,"beforeunload",function(){D.disable()}),D.disable=D.nativeSupport?e:i,D.enable=D.nativeSupport?e:function(t){u(t,n)}}(this);