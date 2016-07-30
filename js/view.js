/**
 * @view.js
 * Author: Nihar Jyoti sarma.
 *
 * This file will render the template,all DOM manipulation stuff done here
 * All Event listener work has been done in this file.
 */

(function(window) {
    'use strict';
    /**
     * It creates a constructor function which will be
     * available as a attribute in MyFlightApp object
     * @view
     */
    function View() {
        /**
         * This function will create a one way flight data template
         * @param data
         * @returns {string}
         */
        this.oneWayTemplate = function(data){
            return '<div class="result__layout js-result--selected">\
                <div class="result--price font16">Rs.'+data.price+'</div>\
            <div class="result--description">\
            <div class="main-col-md-6 main-col-sm-6 main-col-xs-6">\
                '+this.mainTemplate(data)+' </div>\
            <div class="main-col-md-6 main-col-sm-6 main-col-xs-6 right"><a href="#" class="btn btn--submit text-align--right">Book this flight</a></div>\
            </div>\
            </div>';
        };

        /**
         * This function will create a two way flight data template(depart and return flight both)
         * @param data
         * @returns {string}
         */
        this.twoWayTemplate = function(data, index){
            return '<div class="result__layout js-result--select result--pointer" data-index="'+index+'">\
                <div class="result--price">Rs.'+data.price+'</div>\
            <div class="result--description padding-left1em">\
            <div class="">\
                '+this.mainTemplate(data)+' </div>\
            </div>\
            </div>';
        };

        /**
         * This function will generate to display the flightnumber,orgin,destination place info
         * also departure and arrival date
         * @param data
         * @returns {string}
         */
        this.mainTemplate = function(data){
            return '<div class="font12">'+data.airlineCode+'-'+data.flightNumber+'</div>\
            <div class="text-font--bold font14">'+data.origin+'->'+data.destination+'</div>\
            <div class="font12">Depart:'+MyFlightApp.eventBus.timeConversion(data.departure)+'</div>\
            <div class="font12">Arrive:'+MyFlightApp.eventBus.timeConversion(data.arrival)+'</div>';
        };

        /**
         * This function will generate a header template
         * @param data
         * @returns {string}
         */
        this.headerTemplate = function(data){
            return '<div class="border--bottom">\
                <span class="main-col-md-6 main-col-sm-6 main-col-xs-6 text-font--bold">'+data.origin.split("-")[0]+'->'+data.destination.split("-")[0]+'</span>\
            <span class="main-col-md-6 main-col-sm-6 main-col-xs-6 text-align--right font12">Depart:'+MyFlightApp.eventBus.timeFormat(data.date)+'<br/><span class="js-return-date"></span></span>\
            </div>';
        };

        this.modalpop = function(data){
            return '<div class="modal" style="position: absolute;top: 50%;border: 1px solid red;background: #FFF;z-index: 9999;opacity: 1;">\
                            <span>\
                            '+data.flightNumber+'</span>\
                            </div>';
        }

        this.$searchSubmit = document.querySelector('.js-search--submit');
        this.$passengerAdd = document.querySelector('.js--passenger');
        this.$adultChild = document.getElementsByClassName('js-updown');
        this.$toggleButton = document.getElementsByClassName('js-onetwo-way');

        /**
         * All Event Listener bind done
         */
        this.$searchSubmit.addEventListener('click', this.fetchData.bind(this));
        this.$passengerAdd.addEventListener('click', passengerAdd.bind(this));
        for(var i=0; i<this.$adultChild.length;i++){
            this.$adultChild[i].addEventListener('click', modifyPassengerQty.bind(this));
        }
        for(var i=0; i<this.$toggleButton.length;i++){
            this.$toggleButton[i].addEventListener('click', toggleOneTwoWay.bind(this));
        }
        return this;
    }

    /**
     * This function will work as a toggle between button one way and two way
     * @param e
     */
    function toggleOneTwoWay(e){
        e.preventDefault();
        var id = e.currentTarget.id;
        if(id=='two-way'){
            document.getElementById(id).classList.add('btn--active');
            document.getElementById(id).classList.remove('btn--disabled');
            document.getElementById('one-way').classList.remove('btn--active');
            document.getElementById('one-way').classList.add('btn--disabled');
            document.querySelector('.return-date').style.display = 'block';
        } else {
            document.getElementById(id).classList.add('btn--active');
            document.getElementById(id).classList.remove('btn--disabled');
            document.getElementById('two-way').classList.remove('btn--active');
            document.getElementById('two-way').classList.add('btn--disabled');
            document.querySelector('.return-date').style.display = 'none';
            document.querySelector('.js--return-date').value='';
        }
    }

    /**
     * This function will add the number of adult and child passenger
     * @param e
     */
    var passengerAdd = function(e){
        e.preventDefault();
        document.querySelector('.js-adult-child').style.display = 'block';
    }

    /**
     * This function will generate the number of adult and child
     * cliking on the plus and minus button user can modify the passenger quantity
     * @param e
     * @returns {number}
     */
    var modifyPassengerQty = function(e) {
        e.preventDefault();
        var id = e.currentTarget.id;
        var currentQty = (id == 'adult-up') || (id=='child-up') ? 1 : -1;
        var adultQty = document.getElementById('adult').value;
        var childQty = document.getElementById('child').value;
        if(id == 'adult-up' || id == 'adult-down') {
            var qty = adultQty;
        } else {
            var qty = childQty;
        }
        var newQty = parseInt(qty,10) + currentQty;

        if (newQty < 0) {
            newQty = 0;
        }
        if(id == 'adult-up' || id == 'adult-down'){
            document.getElementById('adult').value = newQty;
        } else {
            document.getElementById('child').value = newQty;
        }
        document.querySelector('.js--passenger').value = parseInt(document.getElementById('adult').value,10) +
        parseInt(document.getElementById('child').value,10);
        return newQty;
    };

    /**
     *
     * @param e
     */
    var selectTwoWay = function(e){

         var currentTarget = e.currentTarget;
         var whichWay = currentTarget.dataset.index.split('-')[0];
         var index = currentTarget.dataset.index.split('-')[1];
         var model = (whichWay == "oneWay") ? MyFlightApp.model.arrFlightData[0] : MyFlightApp.model.arrFlightData[1];
         var modal = this.modalpop(model[whichWay][index]);
         var modalElement = document.createElement("div");
         modalElement.innerHTML = modal;
         document.querySelector('body').appendChild(modalElement);

        //var currentTarget = e.currentTarget;
        //var whichWay = currentTarget.dataset.index.split('-')[0];
        //var index = currentTarget.dataset.index.split('-')[1];
        //var model = (whichWay == "oneWay") ? MyFlightApp.model.arrFlightData[0] : MyFlightApp.model.arrFlightData[1];
        //document.querySelector('.js-combineWay').classList.remove('hide');
        //if(whichWay == "twoWay"){
        //    document.querySelector('.js-arrivalWay').innerHTML = "";
        //    var newElement = document.createElement('div');
        //    var priceDepart = model[whichWay][index].price;
        //    newElement.innerHTML = this.mainTemplate(model[whichWay][index]);
        //    document.querySelector('.js-arrivalWay').appendChild(newElement);
        //} else {
        //    document.querySelector('.js-departWay').innerHTML = "";
        //    var newElement = document.createElement('div');
        //    var returnDepart = model[whichWay][index].price;
        //    newElement.innerHTML = this.mainTemplate(model[whichWay][index]);
        //    document.querySelector('.js-departWay').appendChild(newElement);
        //}
        //document.querySelector('.result--price').innerHTML = "Rs."+ (priceDepart + returnDepart);
    };

    /**
     *
     * @param data
     */
    var combineTowWay = function(data){
        document.querySelector('.js-combineWay').classList.remove('hide');
        document.querySelector('.js-departWay').innerHTML = "";
        document.querySelector('.js-arrivalWay').innerHTML = "";
        var oneElement = document.createElement('div');
        oneElement.innerHTML = this.mainTemplate(data[0].oneWay[0]);
        document.querySelector('.js-departWay').appendChild(oneElement);
        var twoElement = document.createElement('div');
        twoElement.innerHTML = this.mainTemplate(data[1].twoWay[0]);
        document.querySelector('.js-arrivalWay').appendChild(twoElement);
        document.querySelector('.result--price').innerHTML = "Rs."+ (data[0].oneWay[0].price + data[1].twoWay[0].price);
    };

    /**
     * this is the prototype of view, It will fetch the data
     * to the controller whatever user entered in the search filed
     * It will do the client side validation using validation.js file
     * rules = {
            "origin":{
                "required" : true
            },
            "destination":{
                "required": true
            },
            "departure":{
                "required": true
            },
            "passenger":{
                "required": true
            }
        }
     * we need to pass the rule to MyFlightApp.validator.validatorRule function
     * wchich is available in validator.js file
     * If it succeed,it trigger the publish method of helper function which will
     * internally call to controller to trigger ajax
     * @param e
     */
    View.prototype.fetchData = function (e) {
        var searchData = {};
        searchData.origin = document.querySelector('.js--origin').value;
        searchData.destination = document.querySelector('.js--destination').value;
        searchData.date = document.querySelector('.js--date').value;
        searchData.returndate = document.querySelector('.js--return-date').value;
        searchData.passenger = document.querySelector('.js--passenger').value;
        this.data = searchData;
        var rules = {
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
        if(MyFlightApp.validator.validatorRule(rules)){
            MyFlightApp.eventBus.publish("addTemplate",searchData);
        }
    };

    /**
     * This function will render the template as per different condition
     * it will check is it a one way search or two way search, as per user input
     * it will render the template and display everything
     * @param type
     * @param obj
     */
    View.prototype.renderView = function (type, obj) {
        //MyFlightApp.model.filter();
        var oneWayData = MyFlightApp.model.arrFlightData[0].oneWay;
        var isTwoWay = MyFlightApp.model.arrFlightData.length == 2;
        document.querySelector('.js-result--header').innerHTML = this.headerTemplate(this.data);
        document.querySelector('.js-no-return').innerHTML = "";
        document.querySelector('.js-result--oneWay').innerHTML = "";
        document.querySelector('.js-result--twoWay').innerHTML = "";

        if(isTwoWay){
            var twoWayData = MyFlightApp.model.arrFlightData[1].twoWay;
            document.querySelector('.js-remove--hide').classList.remove('hide');
            document.querySelector('.js-combineWay').classList.remove('hide');
            document.querySelector('.js-depart').classList.remove('hide');
            document.querySelector('.js-return').classList.remove('hide');
            for (var i = 0; i < oneWayData.length; i++) {
                var newElement = document.createElement('div');
                var index = "oneWay-"+i;
                newElement.innerHTML = this.twoWayTemplate(oneWayData[i],index);
                document.querySelector('.js-result--oneWay').appendChild(newElement);
            }
            for (var i = 0; i < twoWayData.length; i++) {
                var newElement = document.createElement('div');
                var index = "twoWay-"+i;
                newElement.innerHTML = this.twoWayTemplate(twoWayData[i],index);
                document.querySelector('.js-result--twoWay').appendChild(newElement);
            }
            document.querySelector('.js-return-date').innerHTML = "Return: "+MyFlightApp.eventBus.timeFormat(this.data.returndate);
            combineTowWay.call(this,MyFlightApp.model.arrFlightData);
            var resultShow = document.getElementsByClassName('js-result--select');
            for(var i=0; i<resultShow.length; i++){
                resultShow[i].addEventListener('click', selectTwoWay.bind(this));
            }
        } else {
            document.querySelector('.js-combineWay').classList.add('hide');
            document.querySelector('.js-depart').classList.add('hide');
            document.querySelector('.js-return').classList.add('hide');
            if (oneWayData.length == 0) {
                document.querySelector('.js-result--show').innerHTML = '<h2>No flight found</h2>';
                return;
            }
            for (var i = 0; i < oneWayData.length; i++) {
                var newElement = document.createElement('div');
                newElement.innerHTML = this.oneWayTemplate(oneWayData[i]);
                document.querySelector('.js-no-return').appendChild(newElement);
                if(i==0){
                    document.querySelector('.js-result--selected').classList.add('result--selected');
                }
            }
        }
    };

    window.MyFlightApp = window.MyFlightApp || {};
    window.MyFlightApp.view = new View();
})(window);