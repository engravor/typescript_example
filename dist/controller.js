"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarController = void 0;
const model_1 = require("./model");
class CalendarController {
    constructor(calendarId) {
        this.model = new model_1.CalendarModel(calendarId);
    }
    getTodaysEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.listTodaysEvents();
        });
    }
    addEvent(event_date, event_name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.insertEvent(event_date, event_name);
        });
    }
}
exports.CalendarController = CalendarController;
