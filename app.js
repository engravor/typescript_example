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
const googleapis_1 = require("googleapis");
// Cargar el archivo JSON de credenciales generado en la consola de desarrolladores de Google.
const credentials = require('./credentials.json');
const calendarId = 'cristian.maurin@gmail.com';
// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = googleapis_1.google.calendar({ version: "v3" });
function listTodaysEvents() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Autenticar con las credenciales.
            const auth = new googleapis_1.google.auth.JWT(credentials.client_email, null, credentials.private_key, SCOPES);
            // Crea una instancia de la API de Google Calendar.
            const calendar = googleapis_1.google.calendar({ version: 'v3', auth });
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
            console.log('Eventos del día de hoy:');
            if ((_a = events.data.items) === null || _a === void 0 ? void 0 : _a.length) {
                console.log("No se puede crear un evento! No hay lugar");
                // events.data.items?.forEach((event) => {
                //   console.log(`${event.summary}`);
                // });
            }
            else {
                console.log("creo un evento!");
            }
        }
        catch (error) {
            console.error('Error al obtener eventos:', error);
        }
    });
}
// Ejecuta la función para listar los eventos.
listTodaysEvents();
