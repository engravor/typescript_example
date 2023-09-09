import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { CalendarController } from "./controller";

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());

app.get("/api/message", (req, res) => {
  const message = "Hello from the server!";
  res.json({ message });
});

const calendarController = new CalendarController("cristian.maurin@gmail.com");

app.get("/api/get_events", async (req, res) => {
  const listOfDicts = await calendarController.getTodaysEvents();
  res.json(listOfDicts);
});

app.post("/api/receive-date", async (req, res) => {
  const { event_date, event_name } = req.body;
  await calendarController.addEvent(event_date, event_name);
  const listOfDicts = await calendarController.getTodaysEvents();
  res.json(listOfDicts);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});