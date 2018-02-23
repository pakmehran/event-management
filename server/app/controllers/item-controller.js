let BaseController = require('./base-controller');
let ItemService = require('../models/item-service');
var redis = require('redis');


class ItemController extends BaseController {
    constructor() {
        super();

    }

    getItems() {
        let itemPromise = ItemService.getItems(null);
        return itemPromise;
    }
    getItemById(id) {

        let cachedData = this.getCachedInfo(id);

        if (!!cachedData && cachedData.length > 0) {

            console.log("getting data from cache");

            return Promise.resolve(cachedData);
        } else {
            return CustomerModel.getCustomerById(id);
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

module.exports = new CustomerController();