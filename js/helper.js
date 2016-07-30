/**
 * @helper.js
 * Author: Nihar Jyoti sarma.
 *
 * This file will generate all helper methods
 */

(function (window){
    'use strict';
    var topics =  {};
    /**
     * This function will create a topic if not created
     * topic is nothing but add template
     * @param topic
     * @param listener
     */
    var subscribe =  function(topic, listener) {
        // create the topic if not yet created
        if(!topics[topic]) topics[topic] = [];

        // add the listener
        topics[topic].push(listener);
    };
    /**
     * This function will send the event to listener
     * which will trigger in the controller file
     * @param topic
     * @param data
     */
    var  publish =  function(topic, data) {
        // return if the topic doesn't exist, or there are no listeners
        if(!topics[topic] || topics[topic].length < 1) return;

        // send the event to all listeners
        topics[topic].forEach(function(listener) {
            listener(data || {});
        });
    }
    /**
     * This function will generate AM/PM format Time from UTC format
     * @param data
     * @returns {string}
     */
    var timeConversion = function(data){
        var d = new Date(data);
        var hour = d.getUTCHours() == 0 ? 12 : (d.getUTCHours() > 12 ? d.getUTCHours() - 12 : d.getUTCHours());
        var min = d.getUTCMinutes() < 10 ? '0' + d.getUTCMinutes() : d.getUTCMinutes();
        var ampm = d.getUTCHours() < 12 ? 'AM' : 'PM';
        var time = hour + ':' + min + ' ' + ampm;
        return time;
    }
    /**
     * This function will generate a specific format date display like "19 June 2016"
     * @param data
     * @returns {string}
     */
    var timeFormat = function(data){
        var month = ["january","February","March","April","May","June","July","August","September","October","November","December"];
        var d = new Date(data);
        return d.getDate()+' '+month[d.getMonth()]+' '+d.getFullYear();
    }

    window.MyFlightApp = window.MyFlightApp || {};
    window.MyFlightApp.eventBus = {
        subscribe : subscribe,
        publish   : publish,
        timeConversion : timeConversion,
        timeFormat:timeFormat
    }
})(window);