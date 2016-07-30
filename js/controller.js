/**
 * @controller.js
 * Author: Nihar Jyoti sarma.
 *
 * This file will trigger a ajax call after it success it pass
 * the value to model file where the data will manipulate
 */

(function(window) {
    'use strict';
    /**
     * It creates a constructor function which will be
     * available as a attribute in MyFlightApp object
     * @constructor
     */
    function Controller() {
        /**
         * This function will trigger and ajax call to get the response
         * and pass the response to model to manipulate the data.
         * @param val
         */
        this.flightProcess = function (val) {
            var dataObj = val;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var model = MyFlightApp.model;
                    model.flightModel(JSON.parse(xhttp.responseText),dataObj);
                    model.filter();
                    MyFlightApp.view.renderView('add', dataObj);
                }
            };
            xhttp.open("GET", "js/flight-data.json", true);
            xhttp.send();
        };

        MyFlightApp.eventBus.subscribe("addTemplate", this.flightProcess);
    }

    window.MyFlightApp = window.MyFlightApp || {};
    window.MyFlightApp.controller = new Controller();
})(window);