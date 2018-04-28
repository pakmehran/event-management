let BaseController = require('./base-controller');
let EventService = require('../service/event-service');
var redis = require('redis');


class EventController extends BaseController {
    constructor() {
        super();

    }

    getItems() {
        let itemPromise = EventService.getItems(null);
        return itemPromise;
    }

    getItemsCategories() {
        let itemPromise = EventService.getItemCategories(null);
        return itemPromise;
    }

    createEvent(eventObject) {
        let itemPromise = EventService.addEvent(eventObject);
        return itemPromise;
    }

    updateAmount(eventObject) {
        let itemPromise = EventService.updateAmount(eventObject);
        return itemPromise;
    }


    updateEvent(eventObject) {
        let itemPromise = EventService.updateEvent(eventObject);
        return itemPromise;
    }

    deleteEventItems(eventObject) {
        if (eventObject.hasOwnProperty("events_code")) {
            let itemPromise = EventService.deleteEventItems(eventObject.events_code);
            return itemPromise;
        }
    }

    addEventDetails(eventObject) {
        let eventPromise = EventService.addEventDetails(eventObject);
        return eventPromise;
    }

    addEventItems(eventObject) {

        let eventPromise = EventService.addEventItems(eventObject);
        return eventPromise;
    }

    getSpecificEvents(eventCode) {
        let itemPromise = EventService.getSpecificEvents(eventCode);
        return itemPromise;
    }

    getSpecificEventDetails(eventCode) {
        let itemPromise = EventService.getSpecificEventDetails(eventCode);
        return itemPromise;
    }

    getEventCodes() {
        let itemPromise = EventService.getEventCodes();
        return itemPromise;
    }

    getEvents() {
        let itemPromise = EventService.getEvents();
        return itemPromise;
    }

    getItemById(id) {

        let cachedData = this.getCachedInfo(id);

        if (!!cachedData && cachedData.length > 0) {

            console.log("getting data from cache");

            return Promise.resolve(cachedData);
        } else {
            return EventService.getCustomerById(id);
        }
    }

    getCachedInfo(id) {
        return [{
            "id": 1,
            "Customer Name": "FMW",
            "Customer Email": "arehman@folio3.com"
        }];
    }
}

module.exports = new EventController();