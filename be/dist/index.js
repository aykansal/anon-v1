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
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const prompts_1 = require("./prompts");
const react_1 = require("./defaults/react");
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
const anthropic = new sdk_1.default({
    apiKey: "xai-OvR6xKY46HCd7LeksVuaUYkVbUgeJ8vqsxACAhZeRhWOmJP7nDyCVHdDMpHergVA8nOHK7LqON4HInvm",
    baseURL: "https://api.x.ai/",
});
const app = (0, express_1.default)();
const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.post("/template", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            ans: "react",
            prompts: prompts_1.templatePrompts,
            uiPrompts: [react_1.basePrompt]
        });
        return;
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const messages = req.body.messages;
    const response = yield anthropic.messages.create({
        model: 'grok-beta',
        messages: messages,
        max_tokens: 8000,
        system: (0, prompts_1.getSystemPrompt)()
    });
    console.log(response);
    res.json({
        response: (_a = response.content[0]) === null || _a === void 0 ? void 0 : _a.text
    });
}));
app.get("/getAccessToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = "?client_id=" + process.env.CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET + "&code=" + req.query.code;
    yield axios_1.default.post("https://github.com/login/oauth/access_token" + params)
        .then((response) => { return response.data; })
        .then((data) => {
        res.json(data);
    });
}));
app.get('/getUserData', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.get('Authorization'); //Bearer ACCESS_TOKEN
    yield axios_1.default
        .get("https://api.github.com/user", {
        headers: {
            Authorization: req.get('Authorization')
        }
    })
        .then((response) => { return response.data; })
        .then((data) => {
        res.json(data);
    });
}));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
process.removeAllListeners('warning');
app.listen(3000);
