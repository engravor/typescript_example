"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarController = void 0;
const model_1 = require("./model");
class CalendarController {
    constructor(calendarId) {
        this.model = new model_1.CalendarModel(calendarId);
    }
    getEvents(date_from, date_to) {
        return this.model.listEvents(date_from, date_to);
    }
    addEvent(event_name, event_date_from, event_date_to) {
        this.model.insertEvent(event_name, event_date_from, event_date_to);
    }
}
exports.CalendarController = CalendarController;
