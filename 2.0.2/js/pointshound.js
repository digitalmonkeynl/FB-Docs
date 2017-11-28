/* global define */
define([
    "jquery-typeahead",
    "bootstrap-datepicker"
],

    /**
     * MODULE: LAZY SELECT LANGUAGE
     * @exports fb/select-language
     */

function (Typeahead, Datepicker) {
    "use strict";

    var _submitForm = function(f) {

        f.preventDefault();

        console.log($("input:radio[name='flow']:checked").val());
        console.log($('input[name="location-id"]').val());
        console.log($('input[name="check-in"]').val());
        console.log($('input[name="check-out"]').val());
        console.log($('input[name="adults"]').val());
        console.log($('input[name="children"]').val());

        var flow = $("input:radio[name='flow']:checked").val();
        var destination_id = $('input[name="location-id"]').val();
        var checkin = $('input[name="check-in"]').val();
        var checkout = $('input[name="check-out"]').val();
        var adults = $('input[name="adults"]').val();
        var children = $('input[name="children"]').val();

        if (parseInt(children) > 0) { } else {

            children = 0;

        }

        //console.log('https://klm:airfrance@fb-uat.pointshound.com/select-hotel?flow=' + flow + '&destination_id=' + destination_id + '&checkin=' + checkin + '&checkout=' + checkout + '&adults=' + adults + '&children=' + children + '&locale=en-US&currency=EUR&from_fare_finder_request=1');
        window.location = 'https://klm:airfrance@fb-uat.pointshound.com/select-hotel?flow=' + flow + '&destination_id=' + destination_id + '&checkin=' + checkin + '&checkout=' + checkout + '&adults=' + adults + '&children=' + children + '&locale=en-US&currency=EUR&from_fare_finder_request=1';

        //window.location = 'https://flyingblue.pointshound.com/select-hotel?flow=' + flow + '&destination_id=' + destination_id + '&checkin=' + checkin + '&checkout=' + checkout + '&adults=' + adults + '&children=' + children + '&locale=en-US&currency=EUR&from_fare_finder_request=1';
    }

    // INITCOMPONENTS WAY OF CICKSTARTING APP
    var init = function (el) {

        $('.js-typeahead-input').on('click', function(e) {

            $(this).val('');
            $('input[name="location-id"]').val('');

        })

        $(el).on('submit', _submitForm);


        $('.date').datepicker({
            format: 'dd/mm/yyyy',
            startDate: '-3d',
            autoclose: true
        });

        // $('.datepickercheckin').datepicker().on('show', function(e) {
        //         console.log('Loaded zie je....');
        //     });

        // $('.datepicker').datepicker().on('show', function(e) {
        //         console.log('Check-in/out fields');
        //     });

        $('.js-typeahead-input').typeahead({

            minLength: 1,
            order: "asc",
            dynamic: true,
            hint: true,
            source: {

                project: {
                    display: "value",
                    ajax: [{
                        type: "GET",
                        url: "https://www.flyingblue.com/api/pointshound.json",
                        data: {
                            location: "{{query}}"
                        }
                    }, "data"]
                }
            },
            callback: {
                onClickAfter: function (node, a, item, event) {

                    $('input[name="location-id"]').val(item.id);

                }
            },
            debug: true

        });

    };

    return {
        'init': init
    };
});
