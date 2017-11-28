/* global define */
define([
    "fb/jquery",
],
function ($) {
    "use strict";

    var $root;
    var $form = $('.fb-search-form');
    var $search = $('.fb-search-input');
    var $suggestions = $('.fb-search-suggestions-list');
    var $results = $('.fb-search-results');

    $suggestions.hide().empty();
    $results.hide();

    var init = function($el){
      $root = $el;
      $form = $root.find('.fb-search-form');
      $search = $root.find('.fb-search-input');
      $suggestions = $root.find('.fb-search-suggestions-list');


      var lookup = function($event, $element) {
        $event.preventDefault();
        $search = $root.find('.fb-search-input:visible');

        if($event.which == 27) {
          // escape is pressed
          $suggestions.hide().empty();
          $results.hide().empty()
          return true;
        }

        // if no suggestion list is available, submit the input for search
        var active = $suggestions.find('li[class=active]');
        if($event.which == 13 && active.length == 0) {
          $event.data['query'] = $search.val();
          search($event, $form);
          return false;
        }

        if(($event.which == 38 || $event.which == 40 || $event.which == 13) && $suggestions.find('li').length > 0) {
          console.info($event.which);

          // find active element
          var selected = $suggestions.find('li[class=active]');
          var first = $suggestions.find('li').first();
          var last = $suggestions.find('li').last();
          var items = $suggestions.find('li');

          // enter (select)
          if($event.which == 13) {
            search({'data':{'query':selected.children(0).text()}});
            return false;
          }

          //up
          if($event.which == 38) {
            if(selected[0]) {
              selected.removeClass('active');
              selected.prev().addClass('active');
            } else {
              last.addClass('active');
            }
          }

          // down
          if($event.which == 40) {
            if(selected[0]) {
              selected.removeClass('active');
              selected.next().addClass('active');
            } else {
              first.addClass('active');
              // console.log('first', first.text())
            }
          }
          return true;
        }
        $.ajax({
            url: "https://www.flyingblue.com/api/search/autocomplete.json?term=" + $element.val(),
            type: 'get',
            success: function(data) {
              $suggestions.hide().empty();
              var max = 10;
              var counter = 0;

              $(data).each(function(i, result){
                if(counter < max) {
                  var link = $('<a>' + result.label + '</a>');
                  var item = $('<li>').append(link);
                  $(link, item).on('click', null, {query: result.label, element: $element}, function($event){
                    $event.preventDefault();
                    search($event, $form);
                    return false;
                  })
                  $suggestions.append(item);
                }
                counter = counter + 1;
              });
              if(data.length > 0) {
                $suggestions.show();
              }
            },

        });
      }

      // whem clicking somewhere, remove any result lists, if the clicked
      // element wasn't somewhere in the current visible list,
      // this is not very efficient, but works
      $(document).on({'mousedown touchevent': function(e) {
        var target = $(e.target);
        var current_list = $root.find('.fb-search-suggestions-list:visible');
        var result_list = $('.fb-search-results:visible');
        $search = $root.find('.fb-search-input:visible');

        if(current_list.length != 0){
          if($.contains(current_list[0], e.target) == false){
            $suggestions.hide().empty();
            $search.val('');
          }
        }

        if(result_list.length != 0){
          if($.contains(result_list[0], e.target) == false){
            $results.hide().empty();
            $search.val('');
          }
        }
      }});

      var search = function($event, $form){
        $search = $root.find('.fb-search-input:visible');

        $suggestions.hide();
        $results.empty().show();
        // var $input = $results.find('.fb-search-input');
        var query = $event.data['query'];
        console.info('Searching for: ' + query);

        $.ajax({
            url: "https://www.flyingblue.com/api/search/results.json",
            type: 'post',
            data: {'ajax_search': query},
            success: function(data) {
              $results.html(data);
              var $foo = $results.find('.fb-search-input');
              $foo.on('keyup', null, lookup, function($event){$event.data($event, $search)});
              $results.find('.fb-search-reslults-close-link').on('click', function(){
                $results.hide();
              })
            }
        });
        return false;
      }

      // hook on the keyup event for search terms
      $search.on('keyup', null, lookup, function($event){$event.data($event, $search)});
      $form.on('submit', function(){return false;});


    };

    return {
      init: init
    }
});
