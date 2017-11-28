define("fb/menu",["fb/jquery","fb/window-events","fb/img-responsive/img-srcset"],function(e,n,s){"use strict";var t,i,o,a=e(".fb-header"),l=a.find(".fb-menu"),r=l.find(".fb-menu-item"),f=l.find(".fb-menu-noitem"),m=a.find(".js-fb-icon-mobile"),u=e(window).width(),h=4,b=[],d=[],c="normal";f.show();var v=f.innerWidth();f.hide();var w=function(){var n,s,t,i=l.width(),o=0;if(d=[],f.hide(),i<480){t=!1;for(var a=0,r=b.length;a<r;a++)n=e(b[a].html),n.parent().show(),s=e("<div>").append(n.clone()).html(),d.push(s),n.parent().hide();m.show()}else{m.hide(),h>i&&(i=i-v-12),t=!1;for(var u=0,c=b.length;u<c;u++)n=e(b[u].html),o+b[u].width<i&&!t?(n.parent().show(),o+=b[u].width):(t=!0,s=e("<div>").append(n.clone().removeClass("fb-menu-link").addClass("fb-submenu-link")).html(),d.push(s),n.parent().hide())}if(0!==d.length){f.show();for(var w='<ul class="fb-linklist">',p=0,k=d.length;p<k;p++)w+="<li>"+d[p]+"</li>";w+="</ul>",e("#fb-menu-responsive").empty().append(w)}},p=function(){window.alert("MOBILE MENU")},k=function(n){var s=e(n.currentTarget);switch(n.type){case"mouseenter":s.addClass("js-fb-menu-mobile");break;case"mouseleave":s.removeClass("js-fb-menu-mobile");break;case"touchstart":n.preventDefault();var t=e(n.target);t.hasClass("fb-menu-item")||t.hasClass("fb-menu-link")?s.hasClass("js-fb-menu-mobile")?s.removeClass("js-fb-menu-mobile"):(s.addClass("js-fb-menu-mobile"),r.not(s).removeClass("js-fb-menu-mobile")):t.hasClass("fb-submenu-link")&&(window.location=t.attr("href"))}},C=function(e,n){n&&(o=n&&n.scrollTop>i&&u>480?"sticky":"normal")!==c&&(c=o,"sticky"===o?a.addClass("fb-nav-sticky"):a.removeClass("fb-nav-sticky"))},g=function(e,n){u=n.width,w()},j=function(){var n=e(this),s=n.outerWidth(),t=n.find(".fb-menu-link")[0];h+=s,b.push({width:s,html:t}),n=null},y=function(){var n=e("body"),i=n.attr("data-srcset");if(i){var o=s.get({srcset:i}).best.src;o!==t&&(t=o,n.css("background-image",'url("'+o+'")'))}};return{init:function(){y(),n.onResize(y),0!==l.length&&(l.css("overflow","inherit"),i=l.offset().top,r.not(".fb-menu-noitem").each(j),r.on("touchstart",k),r.on("mouseenter mouseleave",k),n.onScroll(C),n.onResize(g),m.on("click",p),w())}}});