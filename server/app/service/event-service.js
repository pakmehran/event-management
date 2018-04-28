var connection = require('../config/connection');

class EventService {

    constructor() {

    }

    getEvents(filters) {
        return new Promise(function(resolve, reject) {
            let query = "select * from Items";
            connection.query(query, function(err, results, fields) {

                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    updateAmount(eventObject) {
        return new Promise(function(resolve, reject) {
            var totalAmount = parseFloat(eventObject.netAmount);
            var recievedAmount = parseFloat(eventObject.amountRecieved)
            var recieved = 0;
            if (totalAmount == recievedAmount) {
                recieved = 1;
            }
            let query = 'Update cost_booking Set amount_balance ="' + eventObject.remaining + '", recieved_amount ="' + eventObject.advance + '" where events_code = "' + eventObject.events_code + '"';

            console.log("query" + query);
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    addEvent(eventObject) {
        return new Promise(function(resolve, reject) {
            let eventCost = eventObject.finance;
            let query = 'INSERT INTO `cost_booking` (`events_code`,`gross_amount`, `discount_amount`, `total_amount`,  `amount_balance`, `recieved_amount`, `recieved`)' +
                'VALUES ( "' + eventObject.eventCode + '", "' + eventCost.grossAmount + '", "' + eventCost.discount + '", "' + eventCost.netAmount + '", "' + eventCost.amountRemaining + '", "' + eventCost.amountPaid + '", "' + 0 + '")';
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });
        });
    }



    updateEvent(eventObject) {
        return new Promise(function(resolve, reject) {
            var totalAmount = parseFloat(eventObject.netAmount);
            var recievedAmount = parseFloat(eventObject.amountRecieved)
            var recieved = 0;
            if (totalAmount == recievedAmount) {
                recieved = 1;
            }
            let query = 'Update cost_booking Set amount_balance ="' + eventObject.remaining + '", recieved_amount ="' + eventObject.advance + '", total_amount ="' + eventObject.netAmount + '", gross_amount ="' + eventObject.totalCost + '", perHeadCost ="' + eventObject.perHead + '", noOfGuests ="' + eventObject.noOfGuests + '", discount_amount ="' + eventObject.discount + '" where events_code = "' + eventObject.events_code + '"';

            console.log("query" + query);
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }


    deleteEventItems(eventCode) {
        console.log("deleteEventItems" + eventCode);
        return new Promise(function(resolve, reject) {

            let query = 'Delete From booking_items where events_code =' + eventCode;

            console.log("query1" + query);
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getSpecificEvents(eventCode) {
        return new Promise(function(resolve, reject) {
            let query = 'SELECT * FROM `booking_items` Left JOIN `items` ON items.items_code = booking_items.items_code  Where booking_items.events_code =' + eventCode;
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getSpecificEventDetails(eventCode) {
        return new Promise(function(resolve, reject) {
            let query = 'SELECT cost_booking.events_code, cost_booking.gross_amount, cost_booking.discount_amount, cost_booking.total_amount, cost_booking.amount_balance, cost_booking.recieved_amount, event_booking.event_name, event_booking.event_date_start, event_booking.event_date_end, event_booking.location, event_booking.booking_date, customer.name, customer.number from cost_booking Left JOIN `event_booking` ON cost_booking.events_code = event_booking.events_code Left Join customer ON  cost_booking.events_code = customer.events_code Where event_booking.events_code =' + eventCode;
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getEvents() {
        return new Promise(function(resolve, reject) {
            let query = 'SELECT event_booking.events_code, event_booking.event_date_start, event_booking.event_date_end, cost_booking.gross_amount, cost_booking.discount_amount, cost_booking.total_amount, cost_booking.amount_balance, cost_booking.recieved_amount FROM `event_booking` LEFT JOIN  `cost_booking` ON event_booking.events_code = cost_booking.events_code INNER JOIN `customer` ON event_booking.events_code = customer.events_code  ORDER BY event_booking.event_date_start';
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getEventCodes() {
        return new Promise(function(resolve, reject) {
            let query = 'SELECT `events_code` FROM `cost_booking` ORDER BY `events_code` DESC LIMIT 1';
            connection.query(query, function(err, results, fields) {

                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    addEventDetails(eventObject) {
        return new Promise(function(resolve, reject) {
            let eventDetails = eventObject.eventDetails;
            let query = 'INSERT INTO `event_booking` (`events_code`, `event_name`, `event_date_start`, `event_date_end`,  `location`)' +
                'VALUES ( "' + eventObject.eventCode + '", "' + eventDetails.title + '", "' + eventDetails.dates[0].trim() + '", "' + eventDetails.dates[1].trim() + '", "' + eventDetails.location + '")';

            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    // addEventItems(eventObject) {
    //     let eventItems = eventObject.items;
    //     for (var i = 0; i < eventItems.length; i++) {
    //         this.addEventItem(eventItems[i]);
    //     }
    // }

    addEventItems(eventObject) {
        return new Promise(function(resolve, reject) {
            console.log("item" + JSON.stringify(eventObject))
            let query = 'INSERT INTO `booking_items` (`items_code`, `quantity_booked`, `event_date_start`,  `event_date_end`, `events_code`)' +
                'VALUES' + eventObject.sql
            connection.query(query, function(err, results, fields) {

                if (!err) {

                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getItemCategories(filters) {
        return new Promise(function(resolve, reject) {
            let query = "select * from items_category";
            connection.query(query, function(err, results, fields) {

                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getItemById(id) {
        return new Promise((resolve, reject) => {
            if (!!id) {
                let query = `SELECT * FROM customers where id=${id}`;
                connection.query(query, function(err, results, fields) {

                    if (!err) {
                        resolve(results);
                    } else {
                        reject(err)
                    }
                });
            } else {
                reject("error")
            }

        });
    }
}


module.exports = new EventService();