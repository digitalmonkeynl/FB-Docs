/* global define */
define([
    "fb/jquery",
    "fb/form/step",
],

/**
 * MODULE: Form Progress indicator
 * @exports fb/form/progress
 * @version  1.0.0
 * @author  Sander van de Graaf
 */
function ($, Step) {
    "use strict";

    var $progress_indicator;
    var $indicators = $([]);
    var steps = [];
    var current = 0;
    var step_indicator_class = '.fb-process-step';
    var step_indicator_active_class = 'fb-process-step-active';


    /**
     * Moves to the next step (duh)
     */
    var to_next_step = function() {
        var next = current + 1;
        to_step(next);
    };

    /**
     * Moves to the previous step
     */
    var to_previous_step = function() {
        var previous = current - 1;
        to_step(previous);
    };

    /**
     * Fetches the current active step
     * @return {object} Step object for the current step
     */
    var current_step = function() {
        return steps[current];
    };

    /**
     * Deactivates the current step, and actives the wanted step, also: updates the progress bar
     */
    var to_step = function(next_step) {
        // console.info('Moving to step: ' + next_step);

        // update progress indicator
        $indicators.removeClass(step_indicator_active_class);
        $($indicators[next_step]).addClass(step_indicator_active_class);

        // switch fieldsets
        steps[current].deactivate();
        steps[next_step].activate();

        current = next_step;
    };

    /**
     * Setup the progress object. Given a container and possible options, activates the first step found
     */
    var init = function (container, options) {
        var selector = '.fb-process';
        $progress_indicator = (options && options.container) ? $(options.container).addBack().find(selector) : $(selector);
        $indicators = $progress_indicator.find(step_indicator_class);

        // create step objects for every fieldset
        container.find('fieldset').each(function(i) {
            var part = new Step(i, $(this));
            steps.push(part);
        });

        // check if we have an equal amount of fieldsets and progress steps
        if($indicators.length !== steps.length) {
            // console.warn('The number of progress indicators (' + $indicators.length + ') and steps (' + steps.length + ') is not the same, bad stuff will happen');
        }

        // always start with the first step
        to_step(0);
    };

    /**
     * Finds the field for the given input (or select) element, and focusses on that field
     */
    var focus_on_field = function(element) {
        $(steps).each(function(i, step){
            $(step.get_fields()).each(function(j, field) {
                if (field.get_element() === element) {
                    to_step(i);
                    field.focus();
                    return false;
                }
            });
        });
    };

    /**
     * Loops through all of the fields. Find the first invalid field. Moves to that step, and focusses the field
     * @return {object} Returns an object reference to the invalid field, or null when no invalid field is found
     */
    var focus_first_invalid_field = function() {
        var first_invalid_field = null;
        $(steps).each(function(i, step){
            var invalid_field = step.get_first_invalid_field();
            if(invalid_field !== null) {
                // move the the step for this field, and focus the field
                to_step(i);
                invalid_field.focus();
                first_invalid_field = invalid_field;
                return false;
            }
        });

        return first_invalid_field;
    };


    /**
     * Validate all the steps
     * @return {bool} true if all the steps are valid, false if one of the steps is not valid
     */
    var validate = function() {
        var valid = true;
        $(steps).each(function(i, step){
            if(step.validate() !== true) {
                valid = false;
            }
        });

        return valid;
    };

    return {
        init: init,
        to_step: to_step,
        current_step: current_step,
        to_next_step: to_next_step,
        to_previous_step: to_previous_step,
        focus_first_invalid_field: focus_first_invalid_field,
        focus_on_field: focus_on_field,
        validate: validate,
    };

});