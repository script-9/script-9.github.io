(this["webpackJsonpscript-9.github.io"]=this["webpackJsonpscript-9.github.io"]||[]).push([[0],{13:function(e,t,n){e.exports=n(28)},27:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(7),o=n(4),i=n(2),s=n(1),l=n.n(s),u=n(6),d=n(3),f=function(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(e){return(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)}))},m=function(e){var t,n,a;return l.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(e){r.next=4;break}return r.abrupt("return",!1);case 4:if(!e.idbId){r.next=12;break}return r.next=7,l.a.awrap(d.b(e.idbId));case 7:return t=r.sent,n=e.contents.code!==t.contents.code,r.abrupt("return",n);case 12:return a=!!e.contents.code,r.abrupt("return",a);case 14:case"end":return r.stop()}}))},b=function(){return d.c().then((function(e){return Promise.all(e.map((function(e){return d.b(e)})))}))},v=function(e){var t=e.gist,n=e.path,c=e.cassette,s=e.setCassette,v=e.isOnline,E=e.setCovers,h=Object(a.useState)(!1),p=Object(o.a)(h,2),w=p[0],g=p[1];Object(a.useEffect)((function(){c?Object(i.c)("".concat(n,"?idbId=").concat(c.idbId)):Object(i.c)("".concat(n))}),[c,n]),Object(a.useEffect)((function(){m(c).then(g)}),[c]);var O=!c||!c.contents.code,j=w&&c.contents.code,k=c;return r.a.createElement("nav",null,r.a.createElement("div",{className:"pages"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(i.a,{to:t?"/?id=".concat(t.id):"/"},"Home")),r.a.createElement("li",null,r.a.createElement(i.a,{to:t?"/code?id=".concat(t.id):"/code"},"Code")))),!v&&r.a.createElement("div",null,"OFFLINE"),r.a.createElement("div",{className:"buttons"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("button",{disabled:O,onClick:function(){s(null)}},"New")),r.a.createElement("li",null,r.a.createElement("button",{disabled:!j,onClick:function(){var e,t;return l.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return e=Object(u.a)({},c,{updatedAt:Date.now(),idbId:c.idbId||f()}),n.next=3,l.a.awrap(d.d(e.idbId,e));case 3:return s(e),n.next=6,l.a.awrap(b());case 6:t=n.sent,E(t);case 8:case"end":return n.stop()}}))}},"Save")),r.a.createElement("li",null,r.a.createElement("button",{disabled:!k,onClick:function(){var e;return l.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.awrap(d.a(c.idbId));case 2:return s(null),t.next=5,l.a.awrap(b());case 5:e=t.sent,E(e);case 7:case"end":return t.stop()}}))}},"Delete")))))},E=n(12),h=n.n(E),p=[["second",1],["minute",60],["hour",3600],["day",86400],["week",604800],["month",2592e3],["year",31536e3]],w=function(e){for(var t=e.now,n=e.before,a=Math.round((t-n)/1e3),r=0;r<p.length;r++)if(a<p[r][1])return 0===r?"Just now":(a=Math.round(a/p[r-1][1]))+" "+p[r-1][0]+(1===a?" ago":"s ago")},g=function(e){var t=e.covers,n=e.setCassette,a=e.cassette,c=Date.now();return r.a.createElement("ul",{className:"Covers"},h()(t).sortBy(["updatedAt"]).reverse().map((function(e,t){return r.a.createElement("li",{key:t},r.a.createElement("div",null,r.a.createElement("span",{className:"time-ago"},w({now:c,before:e.updatedAt})),r.a.createElement("button",{disabled:a&&e.idbId===a.idbId,onClick:function(){return function(e){var t;return l.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,l.a.awrap(d.b(e));case 2:t=a.sent,n(t),Object(i.c)("/code");case 5:case"end":return a.stop()}}))}(e.idbId)}},"Load"),r.a.createElement("span",null,e.contents.code)))})).value())},O=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"Shelf"},r.a.createElement("h1",null,"Shelf"),r.a.createElement(g,e)))},j=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(v,e),r.a.createElement("div",{className:"Home"},r.a.createElement("h1",null,"Home"),r.a.createElement(O,e)))},k=function(e){var t=e.cassette,n=e.setCassette;return r.a.createElement("div",{className:"Editor"},r.a.createElement("h1",null,"Editor"),r.a.createElement("textarea",{value:t&&t.contents.code||"",onChange:function(e){e.persist(),n((function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(u.a)({},t,{contents:{code:e.target.value}})}))}}))},C=function(e){var t=e.cassette;return r.a.createElement("div",{className:"Output"},r.a.createElement("h1",null,"Output"),r.a.createElement("pre",null,t&&t.contents.code||null))},y=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(v,e),r.a.createElement("div",{className:"Code"},r.a.createElement("h1",null,"Code"),r.a.createElement(k,e),r.a.createElement(C,e),r.a.createElement(O,e)))},N=function(e,t){var n=Object(a.useRef)();Object(a.useEffect)((function(){n.current=e}),[e]),Object(a.useEffect)((function(){if(null!==t){var e=setInterval((function(){n.current()}),t);return function(){return clearInterval(e)}}}),[t])},x=function(){return fetch("/img/favicon.co").then((function(e){if(!e.ok)throw new Error(e.statusText);return e}))},I=(n(27),function(){var e=Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_T,t=Object(a.useState)(null),n=Object(o.a)(t,2),c=n[0],s=n[1],l=Object(a.useState)(null),u=Object(o.a)(l,2),d=u[0],f=u[1],m=Object(a.useState)([]),v=Object(o.a)(m,2),E=v[0],h=v[1],p=Object(a.useState)(!0),w=Object(o.a)(p,2),g=w[0],O=w[1];Object(a.useEffect)((function(){b().then(h)}),[]),N((function(){x().then((function(){O(!0)})).catch((function(){O(!1)}))}),5e5);var k={token:e,isOnline:g,gist:c,setGist:s,cassette:d,setCassette:f,covers:E,setCovers:h};return r.a.createElement("div",{className:"App"},r.a.createElement(i.b,null,r.a.createElement(j,Object.assign({path:"/"},k)),r.a.createElement(y,Object.assign({path:"/code"},k))))}),S=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function A(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var W=document.getElementById("root");W.hasChildNodes()?Object(c.hydrate)(r.a.createElement(I,null),W):Object(c.render)(r.a.createElement(I,null),W),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");S?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):A(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):A(t,e)}))}}()}},[[13,1,2]]]);
//# sourceMappingURL=main.757721de.chunk.js.map