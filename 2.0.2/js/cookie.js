/* global define */
define([
    "fb/jquery",
],

/**
 * MODULE: Cookie
 * @version  1.0.0
 * @author  Michel Pouwels
 */
function ($) {
    "use strict";

    var _setCookie = function(name, value, days) {
	    var expires;
	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	        expires = "; expires=" + date.toGMTString();
	    }
	    else {
	        var date = new Date();
	        date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
	        expires = "; expires=" + date.toGMTString();
	    }
	    document.cookie = name + "=" + value + expires + "; path=/";
	}

    var _getCookie = function (cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	    }
	    return "";
	} 

    return {
    	_setCookie: _setCookie, 
    	_getCookie: _getCookie,
    }
});