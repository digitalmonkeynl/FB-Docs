/* global define */
define([
    "fb/jquery",
    "fb/form/progress",
],

/**
 * MODULE: FORM VALIDATOR
 * @exports fb/form/validate
 * @description All the fields in the given form will be validated against their rules. Only when all fields are valid, the form will be submitted.
 * @version  1.0.1
 * @author  Sander van de Graaf
 */
function ($, $progress) {
    "use strict";

    /**
     * jQuery cached instance of the target form
     * @type {object}
     */
    var $form;

    /**
     * Classname which is used to find the next button for every step
     * @type {string}
     */
    var NEXT_BUTTON_CLASS = '.fb-form-next';

    /**
     * Classname which is used to find the previous button for every step (if any)
     * @type {string}
     */
    var PREV_BUTTON_CLASS = '.fb-btn--back';
    
    /**
     * Classname which is used to find the loading box
     * @type {string}
     */
    var LOADING_CLASS = '.fb-application-loader';

    /**
     * Switch to the given step
     * @function
     * @param  {int} step An integer to which step needs to be switched
     */
    var _to_step = function (step) {
        $progress.to_step(step);
    };

    /**
     * Forward to next step (if any)
     * @param  {object} event The event which triggered the call to the next step (eg: from a button)
     */
    var _next_step = function ($event) {
        $event.preventDefault();

        // if the current step is valid, move onto the next step
        if($progress.current_step().validate() === true) {
            // console.info('Step was valid');
            $progress.to_next_step();
        } else {
            // console.info('Step was not valid');
        }
    };

    /**
     * Backwards to previous step (if any), you can always go back, we don't check the current step for any errors, because of UX
     * @param  {object} event The event which triggered the call to the previous step (eg: from a button)
     */
    var _previous_step = function ($event) {
        $event.preventDefault();
        $progress.to_previous_step();
    };


    /**
     * Validate the full form, with all the steps, if a field fails, switch to the step for the first field, and focus the field in question
     * @param {object} event A reference to the event which triggered the submittal (eg: click of a submit button) 
     */
    var _submit_form = function ($event) {
        $event.preventDefault();

		

        // check all fields once more
        // var $fields = $form.find('input, select');
        var valid = $progress.validate();

        // if the form was invalid, don't send the data
        if (valid !== true) {
            $progress.focus_first_invalid_field();
            return false;
        }
        
        $form.find(LOADING_CLASS).show();
        
        // if we got here, all fields are OK
        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method') || 'POST',
            data: $form.serialize(),
        }).done(function ($response) {
	        
	        $form.find(LOADING_CLASS).hide();
	        
            switch ($response.status) {
                case 'html':
                    $form.html($response.html);
                    break;
                case 'redirect':
                    window.location.href = $response.redirect;
                    break;
                case 'injection':
                	if ($response.injections) {
	                	for (var $i = 0; $i < $response.injections.length; $i++) {
		                	var $element = $form.find(".injection_" + $response.injections[$i].fieldname);
                			$element.html($response.injections[$i].html);
                		}
                	}
                case 'error':
                    if ($response.errors) {
                        // loop through all errors, and focus on the fields
                        // with an error, if we can find them
                        for (var $i = 0; $i < $response.errors.length; $i++) {
                            var error = $response.errors[$i];
                            var $element = $form.find("input[name='" + error.fieldname + "']") || $form.find("select[name='" + error.fieldname + "']");
                            if ($element[0]) {
                                // only focus on the first field if there is 1 error
                                if($response.errors.length == 1) {
                                    $progress.focus_on_field($element[0]);
                                }
                                $($element[0]).data('field')._set_invalid([error.message]); // perhaps move this to $progress?
                            }
                        }
                    }

                    // if we did get a general error, display a general error.
                    // but only focus if there arent't any other errors (which)
                    /// will already be focused.
                    if ($response.general) {
                        // console.log('general error', $response.errors.length);
                        if ($response.errors && $response.errors.length === 0) {
                            _to_step(0);
                        }
                        // remove any old general errors
                        var general_error_container;
                        if ($('.fb-application-failed').length > 0) {
                            general_error_container = $('.fb-application-failed');
                        } else {
                            general_error_container = $('<div>').addClass('fb-application-failed');
                        }
                        var $general_failure = general_error_container.text($response.general);
                        $form.before($general_failure);
                    }
            }
        });
    };

    var init = function ($element) {
        $form = $element;

        // init the progress indicator with the steps
        $progress.init($form);

        // prevent browser checks from happening
        $form.attr('novalidate', 'novalidate');

        $form.find(NEXT_BUTTON_CLASS).on('click', _next_step);
        $form.find(PREV_BUTTON_CLASS).on('click', _previous_step);
        $(window).on('popstate', _previous_step);

        // on submit, be sure to check the whole form
        $form.on('submit', _submit_form);
    };

    return {
        init: init,
    };

});