define([
    "fb/jquery",
    "fb/i18n!fb/nls/generic"
],

function ($, I18n) {
    "use strict";

    //var apiPath = '/api/';
    var $app;
    var form_error = false;
    var root = require.toUrl('fb-root'); // website domain
    var core = require.toUrl('fb-core'); // cdn location versionised content

    var _validateApplication = function () {
        form_error = false;
        _addAppLoader();

        // Haal alle mogelijke errors weg
        $app.find('.fb-application-error').remove();
        $app.find('.fb-application-failed').remove();
        $app.find('.fb-application-textfield-error').removeClass('fb-application-textfield-error');

        // Controleer voor elk veld of deze client side validatie heeft
        $app.find('input, select').each(
            function () {
                _checkFormField($(this));
            }
        );

        // Indien geen client side errors, dan via Ajax het formulier posten
        if (!form_error) {
            _validateFormThroughAjax();
        }

        _removeAppLoader();
    };

    var _validateFormThroughAjax = function () {

        var url = root + 'api/' + $app.attr('action');

        var $login = $.ajax({
            url: url,
            data: $app.find('input, select'),
            type: 'get'
        });

        $login.success(function (response) {
            /**
            * Als we willen dat de gebruiker na een geldige inlog doorgestuurd word naar b.v. zijn profiel pagina
            * dan zal redirect gevuld zijn. 
            */
            switch (response.status) {
            case 'html':
                $app.html(response.html);
                break;
            case 'redirect':
                window.location.href = response.redirect;
                break;
            case 'error':
                // Er zijn fouten opgetreden, we gaan even kijken welke velden niet goed zijn en tonen een foutmelding
                if (response.errors) {
                    for (var i = 0, len = response.errors.length; i < len; i++) {
                        _addFormError($app.find("input[name='" + response.errors[i].fieldname + "']"), response.errors[i].message);
                    }
                }

                // het kan ook voorkomen dat een formulier een generieke fout heeft. We tonen dan boven aan het formulier deze foutmelding.
                if (response.general) {
                    var global = $('<div class="fb-application-failed">' + response.general + '</div>');
                    $app.find('.fb-application-data').prepend(global);
                }
                break;
            }
        });
    };

    var _checkFormField = function ($field) {
        var field = $field.data('field');
        var required = $field.attr('required');
        var regex = new RegExp($field.attr('pattern'));
        var msg;

        if (field && required && $field.val() === '') {
            $field.addClass('fb-application-textfield-error');
            msg = I18n['form.' + field.fieldname + '.incorrect'] || 'Incorrect field value';
            _addFormError($field, msg);
        } else if (field && required && !regex.test($field.val())) {
            $field.addClass('fb-application-textfield-error');

            msg = I18n['form.' + field.fieldname + '.incorrect'] || 'Required field value';
            _addFormError($field, msg);
        }
    };

    var _addFormError = function ($field, message) {
        var msg = $('<span class="fb-application-error">' + message + '</span>');
        $(msg).insertBefore($field);

        $field.on('focus', _removeErrorField);

        form_error = true;
    };

    var _removeErrorField = function () {
        $(this).removeClass('fb-application-textfield-error');
        $(this).prev('.fb-application-error').remove();
    };

    var _addAppLoader = function () {
        var html = '<div class="fb-application-loader"><span class="fb-application-loader-table">' +
            ' <strong class="fb-application-loader-cell"><img src="' + core + '/img/form/loading.gif"' +
            ' class="fb-appliaction-loader-img" alt=""></strong></span></div>';
        $app.find('.fb-application-data').append(html);
    };

    var _removeAppLoader = function () {
        $app.find('.fb-application-loader').remove();
    };

    var init = function ($application) {
        $app = $application;
        $app.find('.fb-application-submit').on('click', _validateApplication);
    };

    return {
        init: init
    };

});
