/* global define */
define([
    "fb/jquery",
],
function ($) {
    "use strict";

    var $language_field = $('select[name=language]')
    var languages = {}
    var i = 0;

    var updateCountryField = function ($element) {

      $.ajax({
          url: 'https://www.flyingblue.com/api/language/matrix',
          type: 'post',
          data: {'country':$element.val()},
      }).done(function(data){
        // // console.log(data);
        languages = data;

        if (languages) {
          $language_field.find('option').remove();

          for(var key in languages) {
            var $option = $("<option></option>").text(languages[key]['name']).val(languages[key]['code']);
            $language_field.append($option);
          }
        }
      });
    };

    var init = function ($element) {
        $element.on('change', function(e){
          updateCountryField($element);
        });
    };

    return {
      init: init
    }
});