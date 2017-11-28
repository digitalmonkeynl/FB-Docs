/* global define */
define([
    "fb/jquery",
],
function ($) {
    "use strict";

    var $loader = $('.fb-calculator-loading')
    var $first = $('.fb-calculator-step.step1')
    var $form = $('.fb-calculator-form')
    var $results = $('.fb-calculator-data')
    var $errors = $('.fb-application-error')

    var $from = $('.fb-calculator-from')
    var $to = $('.fb-calculator-to')
    var $via = $('.fb-calculator-via')

    var $airline = $('select[name=marketing_airline]')
    var $cabin_class = $('select[name=cabin_class]')
    var $booking_class = $('select[name=booking_class]')

    var cabin_classes = {}

    var $selected;
    var $submitted = false;


    var check_fields = function(){
      return true;
    }

    var load_results = function(url) {
      if(check_fields()) {

        // reset and hide all previous data in right window
        //$first.hide();
        $errors.empty().hide();
        $loader.show();
        $results.empty();
        $('.fb-application-textfield-error').removeClass('fb-application-textfield-error');

        // make the call
        $.ajax({
            url: url,
            type: 'post',
            data: $form.serializeArray()
        }).done(function(data){
          if(data.status == "error"){
            $submitted = false;
            // display the general error
            if('general' in data) {
              $('.fb-calculator-main-error').text(data.general).show();
              return;
            }

            // display any form errors
            if('errors' in data) {

              $(data.errors).each(function(i, error){
                $form.find('input[name=' + error.fieldname + ']').parent().find('.fb-application-error').html(error.message).show();
                $form.find('select[name=' + error.fieldname + ']').parent().find('.fb-application-error').html(error.message).show();

                $form.find('input[name=' + error.fieldname + '][type=text]').addClass('fb-application-textfield-error')
              });
              $first.show();
            }

          };

          // if we got html, just print it
          if(data.status == 'html') {
            $first.hide();
            $submitted = true;
            $results.html(data.html)
            // $results.show();
          }

        }).always(function(){
          $loader.hide();
        });
      }
    };
    
    var canSubmit = function() {
      if ($from.val() != '' && $to.val() != '')
      {
          
      }

      $.ajax({
            url: 'https://www.flyingblue.com/api/calculator/formdata',
            type: 'post',
            data: $form.serializeArray()
        });
    }

    var init = function(){
      $loader.hide();
      $errors.empty().hide();

      var lookup = function($event, $element) {
        $event.preventDefault();
        
        $element.parent().find('.fb-application-error').html('').hide();
        $element.removeClass('fb-application-textfield-error')

        if($event.which == 27) {
          // escape is pressed
          $element.parent().find('ul').hide().empty();
          return true;
        }
        if(($event.which == 38 || $event.which == 40 || $event.which == 13) && $element.parent().find('li').length > 0) {
          // find active element
          var selected = $element.parent().find('li[class=active]');
          var first = $element.parent().find('li').first();
          var last = $element.parent().find('li').last();
          var items = $element.parent().find('li');

          // enter (select)
          if($event.which == 13) {
            // click on the selected airport
            selected.children(0).click();
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
            url: "https://www.flyingblue.com/api/calculator/airports",
            type: 'post',
            data: {'name': $element.val()},
            success: function(data) {
              var $parent = $element.parent();
              var $list = $parent.find('ul');
              $list.hide();
              
              $list.empty(); // cleanup list


              // Foreach airport, create an LI element
              $(data).each(function(i, airport) {

                var link = $('<a href="">' + airport.label + ' (' + airport.ac + ')</a>')
                var item = $('<li>').append(link)

                // on click, select the aiport, and cleanup the list
                $(link, item).on('click', null, {airport: airport, element: $element}, function($event) {
                  $event.preventDefault();

                  $selected = $event;
                  // console.log('clicked');
                  $event.data.element.data('airport', airport);
                  $event.data.element.val(airport.label + ' (' + airport.ac + ')');
                  $(this).closest('ul').hide().empty();

                  // set the hidden input to the actual airport short code
                  $event.data.element.parent().find('input[type=hidden]').val(airport.ac);
                  // $element.focus();

                  // if the form was already submitted before, this data was changed
                  // so we resubmit the form
                  if($submitted && $last){
                    $last.click();
                  }
                  
                  canSubmit();

                  return false;
                });

                // append the airport to the list
                $list.append(item);

                $list.show();
              });
            },

        });
      }

      // hook on the different events
      $from.on('keyup', null, lookup, function($event){$event.preventDefault();$event.data($event, $from);return false;});
      $to.on('keyup', null, lookup, function($event){$event.preventDefault();$event.data($event, $to);return false;});
      $via.on('keyup', null, lookup, function($event){$event.preventDefault();$event.data($event, $via);return false;});

      // always ignore the return key
      $(document).ready(function() {
        $(window).keydown(function(event){
          if(event.keyCode == 13) {
            event.preventDefault();
            return false;
          }
        });
      });

      // reset fields when receiving focus
      function clear($event, $element){
        $element.val('');
        $element.parent().find('input[type=hidden]').val('');
        $element.closest('ul').hide().empty();
      }
      $from.on('focus', null, clear , function($event){$event.data($event, $from)});
      $to.on('focus', null, clear, function($event){$event.data($event, $to)});
      $via.on('focus', null, clear, function($event){$event.data($event, $via)});

      // whem clicking somewhere, remove any result lists, if the clicked
      // element wasn't somewhere in the current visible list, 
      // this is not very efficient, but works
      $(document).on({'mousedown touchevent': function(e) {
        var target = $(e.target);
        var current_list = $('.fb-calculator-lookup-results:visible');
        if(current_list.length == 0){
          return;
        }
        if($.contains(current_list[0], e.target)){
          // do nothing
        } else {
          current_list.hide().empty();
        }
      }});

      // toggle advanced form
      $('.fb-calculator-advanced-link').on('click', function(){ 
          $( ".fb-calculator-form-advanced" ).slideToggle( 500 );
          $( ".fb-calculator-advanced-link" ).toggleClass( "fb-calculator-form-hide-link" );
      });

      // on button click, copy and append via airport
      $('.via-fieldset-source').hide();
      $('.fb-calculator-via-add').on('click', function($event){
        var current_list = $('.fb-calculator-lookup-results:visible');
        if(current_list.length > 0){
          return false;
        }
        var $parent = $('.via-fieldset-source').parent();
        var $copy = $('.via-fieldset-source').clone(false);
        var $input = $copy.find('.fb-calculator-via-input');
        $input.on('keyup', null, lookup, function($event){$event.data($event, $input)});
        $copy.removeClass('via-fieldset-source').addClass('via-fieldset').addClass('via-copy')
        $copy.insertBefore($(this));
        $copy.show();
        return false;
      });

      // if the airline changes, post the airline, and load the results as values for the booking class
      $airline.on('change', function(e){

      $(this).parent().find('.fb-application-error').html('').hide();
        $(this).removeClass('fb-application-textfield-error');

        $.ajax({
            url: 'https://www.flyingblue.com/api/calculator/classes',
            type: 'post',
            data: {'marketing_airline':$airline.val()},
        }).done(function(data){
          // console.log(data);
          cabin_classes = data;

          // remove all current options
          $cabin_class.find('option').remove();
          $booking_class.find('option').remove();

          // add the options to the selects
          var $select_me = $("<option></option>").text('Select').val('');
          $cabin_class.append($select_me);
          $select_me = null;
          $select_me = $("<option></option>").text('Select').val('');
          $booking_class.append($select_me);

          if (cabin_classes) {
            // add all classes to the cabin class list
            for(var key in cabin_classes) {
              var $option = $("<option></option>").text(cabin_classes[key]['name']).val(key);
              $cabin_class.append($option);
            }
          }
          canSubmit();
        });
      })

      // miles needed
      $('.fb-calculator-submit-needed').on('click', function(e){
        $last = $(this);
        
        $('.fb-application-submit').removeClass('fb-application-submit-active');
        $(this).addClass('fb-application-submit-active');
        
        load_results('https://www.flyingblue.com/api/calculator/spendmiles');
        return false;
      });

      // earn miles
      $('.fb-calculator-submit-earn').on('click', function(e){
        $last = $(this);
        
        $('.fb-application-submit').removeClass('fb-application-submit-active');
        $(this).addClass('fb-application-submit-active');
        
        load_results('https://www.flyingblue.com/api/calculator/earnmiles');
        return false;
      });

      // upgrade
      $('.fb-calculator-submit-upgrade').on('click', function(e){
        $last = $(this);
        
        $('.fb-application-submit').removeClass('fb-application-submit-active');
        $(this).addClass('fb-application-submit-active');
        
        load_results('https://www.flyingblue.com/api/calculator/upgrade');
        return false;
      });

      // change the direction and submit
      $('.fb-calculator-direction').on('change', function(e){
        if($last) {
          $last.click();
        }
      });

      // if a new cabin class is selected, reload the bookin classes
      $cabin_class.on('change', function(e){
      $(this).parent().find('.fb-application-error').html('').hide();
        $(this).removeClass('fb-application-textfield-error');
        
        // reset the booking class
        $booking_class.find('option').remove();
        //var $select_me = $("<option></option>").text('Select').val('');
        //$booking_class.append($select_me);


        if($(this).val() == ''){
          return;
        }

        // append all options
        for(var key in cabin_classes[$(this).val()]['classes']) {
          // console.log(key);
          var $option = $("<option></option>").text(cabin_classes[$(this).val()]['classes'][key]).val(cabin_classes[$(this).val()]['classes'][key]);
          $booking_class.append($option);
        }

        if($submitted && $last){
          $last.click();
        }
        
        canSubmit();

      });
      
      
      if ($airline.val() != '') {
        $.ajax({
              url: 'https://www.flyingblue.com/api/calculator/classes',
              type: 'post',
              data: {'marketing_airline':$airline.val()},
          }).done(function(data){cabin_classes = data;});
    }

      // if the form was previously submitted, be sure to resubmit on a change
      $booking_class.on('change', function(e){
        if($submitted && $last){
          $last.click();
        }
        canSubmit();
      });
    }

    return {
      init: init
    }
});

// will hold the last button which is clicked
var $last = false;

// global scope, we need this because of the returned html
function change_cabinclass(wanted) {
  $('select[name=cabin_class]').children().each(function(counter, item){
    if($(item).val() == wanted){
      $('select[name=cabin_class]').prop('selectedIndex', counter);
      $last.click();
      return false;
    }
  });
}

function change_bookingclass(wanted, submit) {
  $('select[name=cabin_class]').children().each(function(counter, item){
    if($(item).val() == wanted){
      $('select[name=cabin_class]').prop('selectedIndex', counter);
      if(submit) {
        $last.click(); 
      }
    }
  });
}

function switch_from_to(submit) {
  var from_val = $('input[name="airport[from]"]').val();
  var to_val = $('input[name="airport[to]"]').val();
  var from = $('.fb-calculator-from').val()
  var to = $('.fb-calculator-to').val()

  $('input[name="airport[to]"]').val(from_val);
  $('input[name="airport[from]"]').val(to_val);
  $('.fb-calculator-from').val(to)
  $('.fb-calculator-to').val(from)

  if(submit) {
    $last.click();
  }
}

function toggleFieldData(field) {
  $('.fb-calculator-total').hide();
  $(field).fadeToggle();
}