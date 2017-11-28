/*global define */
define(["fb/jquery"],

function () {
	"use strict";

	var destUrl = '/account/login.html';

	var _checkUrl = function () {

		if (window.location.protocol !== 'https:') {
			destUrl = 'https://' + window.location.host + destUrl;
		}

		window.location.href = destUrl;
	};

	var init = function ($element) {

		$element.on('click', _checkUrl);
		_checkUrl();
	};

	return {
		init: init
	};

});
