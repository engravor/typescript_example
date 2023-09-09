import { google } from "googleapis";
import { calendar_v3 } from "googleapis/build/src/apis/calendar";
const credentials = require("../credentials.json");

const SCOPES = "https://www.googleapis.com/auth/calendar";

export class CalendarModel {
  private calendarId: string;

  constructor(calendarId: string) {
    this.calendarId = calendarId;
  }

  async insertEvent(from: string, event_name: string) {
    try {
      const auth = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        SCOPES
      );
      const calendar = google.calendar({ version: "v3", auth });

      const event_from = new Date(from);
      const unaHoraEnMs = 60 * 60 * 1000;
      const event_to = new Date(event_from.getTime() + unaHoraEnMs);

      const event: calendar_v3.Schema$Event = {
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

      const response = await calendar.events.insert({
        calendarId: this.calendarId,
        requestBody: event,
      });
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    }
  }

  async listTodaysEvents() {
    try {
      const auth = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        SCOPES
      );
      const calendar = google.calendar({ version: "v3", auth });

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const events = await calendar.events.list({
        auth: auth,
        calendarId: this.calendarId,
        timeMin: new Date(2023, 8, 1).toISOString(),
        timeMax: new Date(2023, 9, 4).toISOString(),
      });

      const listOfDicts: { event_name: string; event_time: string }[] = [];

      if (events.data.items?.length) {
        events.data.items?.forEach((event) => {
          listOfDicts.push({
            event_name: `${event.summary}`,
            event_time: `${event.start?.dateTime}`,
          });
        });
      } else {
        console.log("creo un evento!");
      }

      return listOfDicts;
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    }
  }
}
