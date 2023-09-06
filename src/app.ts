import { log } from "console";
import { google, calendar_v3 } from "googleapis";
import express from 'express';
import path from 'path';

// Cargar el archivo JSON de credenciales generado en la consola de desarrolladores de Google.
const credentials = require("../credentials.json");

const calendarId = "cristian.maurin@gmail.com";

// Google calendar API settings
const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = google.calendar({ version: "v3" });

interface MyEvents {
  event_name: string;
  event_time: string;
}

// Create an array of dictionaries
let listOfDicts: MyEvents[] = [];

async function insertEvents(from: string, event_name: string) {
  try {
    // Autenticar con las credenciales.
    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      SCOPES
    );
    // Crea una instancia de la API de Google Calendar.
    const calendar = google.calendar({ version: "v3", auth });

    // Obtiene la fecha actual.
    const event_from = new Date(from)
    // Incrementar una hora en la fecha
    const unaHoraEnMs = 60 * 60 * 1000;  
    const event_to = new Date(event_from.getTime() + unaHoraEnMs);
    const event: calendar_v3.Schema$Event = {
      summary: event_name,
      description: event_name,
      start: {
        dateTime: event_from.toISOString(), // Fecha y hora de inicio en formato ISO 8601
        timeZone: 'GMT-0300', // Zona horaria
      },
      end: {
        dateTime: event_to.toISOString(), // Fecha y hora de finalización en formato ISO 8601
        timeZone: 'GMT-0300', // Zona horaria
      },
    };

    // Crea el evento en el calendario
    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event
    });

  } catch (error) {
    console.error("Error al obtener eventos:", error);
  }
}

async function listTodaysEvents() {
  try {
    // Autenticar con las credenciales.
    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      SCOPES
    );
    // Crea una instancia de la API de Google Calendar.
    const calendar = google.calendar({ version: "v3", auth });

    // Obtiene la fecha actual.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Consulta los eventos del día de hoy.
    const events = await calendar.events.list({
      auth: auth,
      calendarId: calendarId, // Puedes cambiarlo si deseas usar otro calendario.
      timeMin: new Date(2023, 8, 1).toISOString(),
      timeMax: new Date(2023, 9, 4).toISOString(), // Hasta el final del día.
    });
    listOfDicts = []
    if (events.data.items?.length) {
      events.data.items?.forEach((event) => {
        listOfDicts.push({ event_name: `${event.summary}`, event_time: `${event.start?.dateTime}` });
      });
    } else {
      console.log("creo un evento!");
    }
  } catch (error) {
    console.error("Error al obtener eventos:", error);
  }
}

import bodyParser from 'body-parser';

const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

app.get('/api/message', (req, res) => {
    const message = 'Hello from the server!';
    res.json({ message });
});

app.get('/api/get_events', (req, res) => {
    listTodaysEvents()
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
