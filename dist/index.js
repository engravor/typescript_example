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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const controller_1 = require("./controller");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use(body_parser_1.default.json());
app.get("/api/message", (req, res) => {
    const message = "Hello from the server!";
    res.json({ message });
});
const calendarController = new controller_1.CalendarController("cristian.maurin@gmail.com");
app.get("/api/get_events", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listOfDicts = yield calendarController.getTodaysEvents();
    res.json(listOfDicts);
}));
app.post("/api/receive-date", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event_date, event_name } = req.body;
    yield calendarController.addEvent(event_date, event_name);
    const listOfDicts = yield calendarController.getTodaysEvents();
    res.json(listOfDicts);
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
