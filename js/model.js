/**
 * @model.js
 * Author: Nihar Jyoti sarma.
 *
 * This file will manipulate the json response and do the filter
 * and parse the new json Response
 */

(function(window) {
    'use strict';
    /**
     * It creates a constructor function which will be
     * available as a attribute in MyFlightApp object
     * @model
     */
    function Model() {
        /**
         * This function create some object
         * @param response - ajax response value from flight-data.json
         * @param subData - user enter data for searching flight
         */

        this.flightModel = function (response,subData) {
            var self = this;
            self.origin = subData.origin.split("-")[1];
            self.destination = subData.destination.split("-")[1];
            self.departDate = new Date(subData.date);
            self.getDay = self.departDate.getDay()+1;
            self.passenger = subData.passenger;
            self.response = response;
            self.returndate = subData.returndate;
            self.return = (subData.returndate !="") ?  true : false;
        };
    }

    /**
     * This function will create a prototype of model and iterate a json response
     * and do the filter
     * using Array.prototype.filter.Create a empty array and push the
     * data to that array as oneway or twoway attribute.
     */
    Model.prototype.filter = function(){
        var self= this;
        this.arrFlightData = [];
        var flightSearchData = this.response.filter(function(el){
            return el.origin == self.origin && el.destination == self.destination &&
                el.operationalDays.indexOf(self.getDay)>-1 && el.availableSeats >= self.passenger;
        });
        this.arrFlightData.push({oneWay:flightSearchData});
        if(this.return){
            var origin = self.destination,
                destination = self.origin,
                departDate = new Date(self.returndate),
                getDay = departDate.getDay()+ 1,
                passenger = self.passenger;
            var flightSearchData = this.response.filter(function(el){
                return el.origin == origin && el.destination == destination &&
                    el.operationalDays.indexOf(getDay)>-1 && el.availableSeats >= passenger;
            });
            this.arrFlightData.push({twoWay:flightSearchData});
        }
    }
    window.MyFlightApp = window.MyFlightApp || {};
    window.MyFlightApp.model =  new Model();
})(window);

