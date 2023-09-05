import { log } from "console";
import { google, calendar_v3 } from "googleapis";

// Cargar el archivo JSON de credenciales generado en la consola de desarrolladores de Google.
const credentials = require("./credentials.json");

const calendarId = "cristian.maurin@gmail.com";

// Google calendar API settings
const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = google.calendar({ version: "v3" });

async function insertEvents() {
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

    const event: calendar_v3.Schema$Event = {
      summary: 'Título del evento',
      description: 'Descripción del evento',
      start: {
        dateTime: '2023-09-01T10:00:00Z', // Fecha y hora de inicio en formato ISO 8601
        timeZone: 'America/Los_Angeles', // Zona horaria
      },
      end: {
        dateTime: '2023-09-01T11:00:00Z', // Fecha y hora de finalización en formato ISO 8601
        timeZone: 'America/Los_Angeles', // Zona horaria
      },
    };


    // Crea el evento en el calendario
    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event
    });

    console.log("Se creao un evento.");

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

    console.log("Eventos del día de hoy:");
    if (events.data.items?.length) {
      console.log("No se puede crear un evento! No hay lugar");
      // events.data.items?.forEach((event) => {
      //   console.log(`${event.summary}`);
      // });
    } else {
      console.log("creo un evento!");
    }
  } catch (error) {
    console.error("Error al obtener eventos:", error);
  }
}

// Ejecuta la función para listar los eventos.
listTodaysEvents(); 
insertEvents();
