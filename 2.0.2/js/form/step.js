/* global define */
define([
    "fb/jquery",
    "fb/form/field"
],

/**
 * MODULE: Form Step
 * @exports fb/form/step
 * @version  1.0.0
 * @author  Sander van de Graaf
 */
function ($, Field) {
    "use strict";


    function Step(my_step, $element){
        /**
         * Array with fields for this step which need to validate
         * @type {object}
         */
        var fields = [];

        /**
         * Fetches all inputs for this step and caches them.
         */
        this.init = function() {
            $element.find('input, select').each(function(i, element) {
                var f = new Field($(element));
                fields.push(f);
            });

            $element.data('Step', this);
        };

        this.get_fields = function() {
            return fields;
        };

        /**
         * Checks if all the fields for this step are valid.
         * @return {bool}
         */
        this.validate = function() {
            var valid = true;
            // fields.valid();
            // console.log(fields[0].get_element());
            $(fields).each(function (i, field) {
                if (field.validate() === false) {
                    valid = false;
                }
            });
            return valid;
        },

        this.get_first_invalid_field = function() {
            var invalid_field = null;
            $(fields).each(function (i, field) {
                if (field.validate() === false) {
                    invalid_field = field;
                    return false;
                }
            });
            return invalid_field;
        },

        /**
         * Activate this step (appear)
         */
        this.activate = function() {
            // console.info('activating', my_step);
            $element.show();
        },

        /**
         * Deactivate this step (hide)
         */
        this.deactivate = function() {
            // console.info('deactivating', my_step);
            $element.hide();
        },

        // make sure to call the init method upon creation
        // TODO: move to prototype constructor?
        this.init();
    }

    return Step;
});