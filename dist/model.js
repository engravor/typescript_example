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
exports.CalendarModel = void 0;
const googleapis_1 = require("googleapis");
const credentials = require("../credentials.json");
const SCOPES = "https://www.googleapis.com/auth/calendar";
class CalendarModel {
    constructor(calendarId) {
        this.calendarId = calendarId;
    }
    insertEvent(from, event_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const auth = new googleapis_1.google.auth.JWT(credentials.client_email, null, credentials.private_key, SCOPES);
                const calendar = googleapis_1.google.calendar({ version: "v3", auth });
                const event_from = new Date(from);
                const unaHoraEnMs = 60 * 60 * 1000;
                const event_to = new Date(event_from.getTime() + unaHoraEnMs);
                const event = {
                    summary: event_name,
                    description: event_name,
                    start: {
                        dateTime: event_from.toISOString(),
                        timeZone: "GMT-0300",
                    },
                    end: {
                        dateTime: event_to.toISOString(),
                        timeZone: "GMT-0300",
                    },
                };
                const response = yield calendar.events.insert({
                    calendarId: this.calendarId,
                    requestBody: event,
                });
            }
            catch (error) {
                console.error("Error al obtener eventos:", error);
            }
        });
    }
    listTodaysEvents() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const auth = new googleapis_1.google.auth.JWT(credentials.client_email, null, credentials.private_key, SCOPES);
                const calendar = googleapis_1.google.calendar({ version: "v3", auth });
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const events = yield calendar.events.list({
                    auth: auth,
                    calendarId: this.calendarId,
                    timeMin: new Date(2023, 8, 1).toISOString(),
                    timeMax: new Date(2023, 9, 4).toISOString(),
                });
                const listOfDicts = [];
                if ((_a = events.data.items) === null || _a === void 0 ? void 0 : _a.length) {
                    (_b = events.data.items) === null || _b === void 0 ? void 0 : _b.forEach((event) => {
                        var _a;
                        listOfDicts.push({
                            event_name: `${event.summary}`,
                            event_time: `${(_a = event.start) === null || _a === void 0 ? void 0 : _a.dateTime}`,
                        });
                    });
                }
                else {
                    console.log("creo un evento!");
                }
                return listOfDicts;
            }
            catch (error) {
                console.error("Error al obtener eventos:", error);
            }
        });
    }
}
exports.CalendarModel = CalendarModel;
