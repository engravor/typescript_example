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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// Cargar el archivo JSON de credenciales generado en la consola de desarrolladores de Google.
const credentials = require("../credentials.json");
const calendarId = "cristian.maurin@gmail.com";
// Google calendar API settings
const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = googleapis_1.google.calendar({ version: "v3" });
// Create an array of dictionaries
let listOfDicts = [];
function insertEvents(from, event_name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Autenticar con las credenciales.
            const auth = new googleapis_1.google.auth.JWT(credentials.client_email, null, credentials.private_key, SCOPES);
            // Crea una instancia de la API de Google Calendar.
            const calendar = googleapis_1.google.calendar({ version: "v3", auth });
            // Obtiene la fecha actual.
            const event_from = new Date(from);
            // Incrementar una hora en la fecha
            const unaHoraEnMs = 60 * 60 * 1000;
            const event_to = new Date(event_from.getTime() + unaHoraEnMs);
            const event = {
                summary: event_name,
                description: event_name,
                start: {
                    dateTime: event_from.toISOString(),
                    timeZone: 'GMT-0300', // Zona horaria
                },
                end: {
                    dateTime: event_to.toISOString(),
                    timeZone: 'GMT-0300', // Zona horaria
                },
            };
            // Crea el evento en el calendario
            const response = yield calendar.events.insert({
                calendarId: calendarId,
                requestBody: event
            });
        }
        catch (error) {
            console.error("Error al obtener eventos:", error);
        }
    });
}
function listTodaysEvents() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Autenticar con las credenciales.
            const auth = new googleapis_1.google.auth.JWT(credentials.client_email, null, credentials.private_key, SCOPES);
            // Crea una instancia de la API de Google Calendar.
            const calendar = googleapis_1.google.calendar({ version: "v3", auth });
            // Obtiene la fecha actual.
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            // Consulta los eventos del día de hoy.
            const events = yield calendar.events.list({
                auth: auth,
                calendarId: calendarId,
                timeMin: new Date(2023, 8, 1).toISOString(),
                timeMax: new Date(2023, 9, 4).toISOString(), // Hasta el final del día.
            });
            listOfDicts = [];
            if ((_a = events.data.items) === null || _a === void 0 ? void 0 : _a.length) {
                (_b = events.data.items) === null || _b === void 0 ? void 0 : _b.forEach((event) => {
                    var _a;
                    listOfDicts.push({ event_name: `${event.summary}`, event_time: `${(_a = event.start) === null || _a === void 0 ? void 0 : _a.dateTime}` });
                });
            }
            else {
                console.log("creo un evento!");
            }
        }
        catch (error) {
            console.error("Error al obtener eventos:", error);
        }
    });
}
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(body_parser_1.default.json());
app.get('/api/message', (req, res) => {
    const message = 'Hello from the server!';
    res.json({ message });
});
app.get('/api/get_events', (req, res) => {
    listTodaysEvents();
    res.json(listOfDicts);
});
app.post('/api/receive-date', (req, res) => {
    const { event_date, event_name } = req.body;
    insertEvents(event_date, event_name);
    listTodaysEvents();
    res.json(listOfDicts);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
