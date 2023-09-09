import { CalendarModel } from "./model";

export class CalendarController {
  private model: CalendarModel;

  constructor(calendarId: string) {
    this.model = new CalendarModel(calendarId);
  }

  async getTodaysEvents() {
    return await this.model.listTodaysEvents();
  }

  async addEvent(event_date: string, event_name: string) {
    await this.model.insertEvent(event_date, event_name);
  }
}