import { google } from 'googleapis';

// Cargar el archivo JSON de credenciales generado en la consola de desarrolladores de Google.
const credentials = require('./credentials.json');

const calendarId = 'cristian.maurin@gmail.com';

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version : "v3"});

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
    const calendar = google.calendar({ version: 'v3', auth });

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

    console.log('Eventos del día de hoy:');
    if (events.data.items?.length) {
      console.log("No se puede crear un evento! No hay lugar");
      // events.data.items?.forEach((event) => {
      //   console.log(`${event.summary}`);
      // });
    } else {
      console.log("creo un evento!");
    }
      
  } catch (error) {
    console.error('Error al obtener eventos:', error);
  }
}

// Ejecuta la función para listar los eventos.
listTodaysEvents();