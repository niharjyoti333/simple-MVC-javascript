/**
 * @validator.js
 * Author: Nihar Jyoti sarma.
 *
 * This file will validate the data
 */

(function(window){
    'use strict';
    function validator(){
        this.required = function(val) {
            return (/\S/.test(val));
        };
        this.date = function(val) {
            // Checks for the following valid date formats:
            // MM/DD/YY   MM/DD/YYYY   MM-DD-YY   MM-DD-YYYY
            // Also separates date into month, day, and year variables

            var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{2}|\d{4})$/;

            // To require a 4 digit year entry, use this line instead:
            // var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/;

            var matchArray = val.match(datePat); // is the format ok?
            if (matchArray == null) {
                return false;
            }
            var month = matchArray[1]; // parse date into variables
            var day = matchArray[3];
            var year = matchArray[4];
            if (month < 1 || month > 12) { // check month range
               // alert("Month must be between 1 and 12.");
                return false;
            }
            if (day < 1 || day > 31) {
                //alert("Day must be between 1 and 31.");
                return false;
            }
            if ((month==4 || month==6 || month==9 || month==11) && day==31) {
                //alert("Month "+month+" doesn't have 31 days!")
                return false
            }
            if (month == 2) { // check for february 29th
                var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
                if (day>29 || (day==29 && !isleap)) {
                    //alert("February " + year + " doesn't have " + day + " days!");
                    return false;
                }
            }
            return true;  // date is valid
        }
    }

    /**
     * this will pass the rule like below
     *  var rules = {
            "origin":{
                "required" : true
            },
            "destination":{
                "required": true
            },
            "departure":{
                "required": true,
                "date": true
            },
            "passenger":{
                "required": true
            }
        };
     * here like  "origin" is the input field ID
     * If required comes as true then add a class error in the input box
     * and return false boolean value. then data will not submit
     * @param options
     * @returns {boolean}
     */
    validator.prototype.validatorRule = function(options){
        var isValid = true;
        var error = document.getElementsByClassName('error');
        for(var i=0; i<error.length; i++){
            error[i].classList.remove('error');
        }
        for(var element in options){
            var el = document.getElementById(element);
            var val = el.value;
            for(var rule in options[element]){
                if(rule === 'required') {
                    if (!this.required(val)) {
                        el.classList.add('error');
                        isValid = false;
                    }
                }
                if(rule === 'date'){
                    if (!this.date(val)) {
                        el.classList.add('error');
                        isValid = false;
                    }
                }
            }
        }
        if(isValid) {
            return true;
        } else {
            return false;
        };
    }
    window.MyFlightApp = window.MyFlightApp || {};
    window.MyFlightApp.validator =  new validator();
})(window)