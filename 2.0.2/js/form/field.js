/* global define */
define([
    "fb/jquery",
    "fb/i18n!fb/nls/forms"
],

/**
 * MODULE: Form Step
 * @exports fb/form/field
 * @version  1.0.0
 * @author  Sander van de Graaf
 */
function ($, $i18n) {
    "use strict";


    function Field($element){
        /**
         * Timeout after which a check of the current focussed input is triggered
         * @type {int}
         */
        var DONE_TYPING_TIMEOUT = 500;

        /**
         * Will hold a reference to the timeout trigger
         * @type {object}
         */
        // var done_typing_trigger;

        /**
         * The error class which is added to a form field whenever a problem is found
         * @type {string}
         */
        var ERROR_CLASS = 'fb-form-error';

        /**
         * Classname of wrapper around inputs which need to be validated
         * @type {string}
         */
        var FIELD_WRAPPER = '.fb-form-field-wrapper';

        var messages = [];

        /**
         * Setup of the events handlers for the input element, called upon instantiating
         */
        this.init = function() {
            // this feels a bit hackish, but we need to get a referenco to this object from the element
            // when the _done_typing_trigger is triggered
            $element.data('field', this);


            // hook on the different events
            $element.on('change blur', null, this, function($event){$event.data.validate();});
            $element.on('keyup keydown', null, this, function($event){$event.data._validate_field_after_interval($event);});

            // if the users uses the keyboard to select a value in a select, be sure to trigger
            // the change event after keyup
            if($element.prop('tagName') === 'select') {
                $element.on('keyup', function () { if (this.change) { this.change(); } });
            }

        },

        /**
         * Validate the current input field
         */
        this.validate = function() {
            var required = this._check_for_required_field();
            var pattern = this._check_for_pattern();
            var comparison = this._check_for_comparison();
            var element_ref = this;

            // last check: if the field is -not- required, and is empty, don't
            // do anything, the field probably has focus (for timeout validation)
            if ($element.attr('required') !== 'required' && $element.val() === '') {
                return true;
            }
            if($element.data('validate-url') != undefined) {
              var form = $($element.parents('form').get(0));
              var form_data = {};
              $.each(form.serializeArray(), function (i, field) {
                form_data[field.name] = field.value || "";
              });
              var data = {
                "name": $element.attr('name'),
                "value": $element.val(),
                "form": form_data
              }
              $.post($element.data('validate-url'), data, function(data){
                if(data.errors){
                  element_ref._set_invalid([data.errors[$element.attr('name')].message]);
                  return false;
                } else {
                  element_ref.set_valid($element);
                  return true;
                }
              });
            } else {
              if (required && pattern && comparison) {
                  this.set_valid($element);
                  return true;
              } else {
                  this._set_invalid(messages);
                  return false;
              }
            }
        },

        this.focus = function() {
            $element.focus();
        },

        this._check_for_required_field = function() {
            var valid = true;

            // is this field required, and does it have a value/is it checked?
            if ($element.attr('required') === 'required' && ($element.val() === '' || ($element.attr('type') === 'checkbox' && $element.is(':checked') !== true))) {
                valid = false;
                if ($element.attr('type') === 'checkbox') {
                    messages.push($i18n.required_checkbox);
                } else {
                    messages.push($i18n.required);
                }
            }

            return valid;
        },

        this._check_for_pattern = function() {
            var valid = true;

            // do we need to check for a pattern in the value?
            if ($element.attr('pattern')) {
                var $pattern = new RegExp($element.attr('pattern'));
                if ($pattern.test($element.val()) === false) {
                    valid = false;
                    messages.push($i18n.pattern_miss);
                }
            }

            return valid;
        },

        // do we need to compare this field value with some other field value?
        this._check_for_comparison = function() {
            var valid = true;

            if ($element.data('compare-with')) {
                var $other_element = $('#' + $element.data('compare-with'));
                if ($element.val() !== $other_element.val()) {
                    valid = false;
                    messages.push($i18n.not_the_same);
                }
            }

            return valid;
        },


        /**
         * Mark the field invalid, and add an element with the given error messages
         * @param {object} element A jquery object reference to an input which needs to get error messages
         * @param {list} messages A list of error messages
         */
        this._set_invalid = function (messages) {
            $element.removeClass('fb-field-filled-ok');
            $element.addClass('fb-field-filled-error');
            $element.data('valid-status', false);

            // if any field fails, the wrapper has an error
            var $wrapper = $element.closest(FIELD_WRAPPER);
            $wrapper.removeClass('fb-field-ok');
            $wrapper.addClass('fb-field-error');

            // check if an error element already exists, but only if we need to show
            // errors
            if ($element.data('hide-messages') !== "yes") {
                var $next_element = $element.next();
                var $error_container;
                if ($next_element.hasClass(ERROR_CLASS)) {
                    // reuse the existing element, clean it first
                    $next_element.text('');
                    $error_container = $next_element;
                } else {
                    $error_container = $('<div>').addClass(ERROR_CLASS);
                }
                // we only append the first message (for now)
                $error_container.text(messages[0]);
                $element.after($error_container);
            }
        },

        /**
         * Mark the field valid, and remove any error messages
         * @param {object} element A jquery object reference to an input. The error messages will be removed and it will be marked valid
         */
        this.set_valid = function () {
            $element.removeClass('fb-field-filled-error');
            $element.addClass('fb-field-filled-ok');
            $element.data('valid', true);

            // check if all fields in the group are valid, if so, mark the wrapper
            // as valid. First, set the wrapper to valid
            var $wrapper = $element.closest(FIELD_WRAPPER);
            $wrapper.removeClass('fb-field-error');
            $wrapper.addClass('fb-field-ok');

            // and check all fields for validity
            $wrapper.find('input,select').each(function (i, field) {
                var $field = $(field);
                var $wrapper = $field.closest(FIELD_WRAPPER);
                // console.log($field.data('valid'));
                if ($field.data('valid') !== true) {
                    // console.log('invalid');
                    $wrapper.removeClass('fb-field-ok');
                    $wrapper.addClass('fb-field-error');
                }
            });

            var $next_element = $element.next();
            if ($next_element.hasClass(ERROR_CLASS)) {
                $next_element.remove();
            }
        },

        /**
         * When the user stops typing, this trigger will be called
         */
        this._done_typing_trigger = function () {
            // get the input which has focus (perhaps there is a better object?)
            // and validate it, but only if it's not empty
            var $focused = $(':focus');
            var field = $focused.data('field');
            if ($focused.val() !== '' && field) {
                field.validate();
            }
        },

        /**
         * Whenever a user stops typing, setup a timer for auto field validation
         */
        this._validate_field_after_interval = function ($event) {
            if ($event.type === 'keydown') {
                clearTimeout($event.data.done_typing_trigger);
            }
            if ($event.type === 'keyup') {
                clearTimeout($event.data.done_typing_trigger);
                $event.data.done_typing_trigger = setTimeout(
                    this._done_typing_trigger,
                    DONE_TYPING_TIMEOUT
                );
                     // ($event, this)}, );
            }
        },


        this.get_element = function() {
            return $element[0];
        },

        // make sure to call the init method upon creation
        // TODO: move to prototype constructor
        this.init();
    }

    return Field;
});
