"use strict";
// import cors from "cors";
// import express from "express";
// import Anthropic from "@anthropic-ai/sdk";
// import { TextBlock } from "@anthropic-ai/sdk/resources";
// import { getSystemPrompt } from "./prompts";
// import { basePrompt as reactBasePrompt } from "./defaults/react";
// import bodyParser from "body-parser";
// import axios from "axios";
// import { testPromptsArr } from "./userPrompts";
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
// // Configure axios defaults
// axios.defaults.timeout = 30000; // 30 second timeout
// axios.defaults.headers.common['Accept'] = 'application/json';
// // Create axios instance with default config
// const axiosInstance = axios.create({
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });
// // Add response interceptor for error handling
// axiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     console.error('Axios Error:', error.message);
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.error('Response Data:', error.response.data);
//       console.error('Response Status:', error.response.status);
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error('Request Error:', error.request);
//     }
//     return Promise.reject(error);
//   }
// );
// const anthropic = new Anthropic({
//   apiKey: "xai-OvR6xKY46HCd7LeksVuaUYkVbUgeJ8vqsxACAhZeRhWOmJP7nDyCVHdDMpHergVA8nOHK7LqON4HInvm",
//   baseURL: "https://api.x.ai/",
// });
// const app = express();
// const corsOptions = {
//   origin: "*",
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };
// app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.header("Cross-Origin-Embedder-Policy", "require-corp");
//   res.header("Cross-Origin-Opener-Policy", "same-origin");
//   next();
// });
// app.use(express.json());
// app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
// app.use((req, res, next) => {
//   res.setTimeout(120000, () => {
//     res.status(408).send('Request Timeout');
//   });
//   next();
// });
// // Utility function to handle async requests
// const asyncHandler = (fn:any) => (req:any, res:any, next:any) =>
//   Promise.resolve(fn(req, res, next)).catch(next);
// // Enhanced error handling middleware
// app.use((error:any, req:any, res:any, next:any) => {
//   console.error('Error:', error);
//   res.status(error.status || 500).json({
//     error: {
//       message: error.message || 'Internal server error',
//       status: error.status || 500
//     }
//   });
// });
// app.post("/template", asyncHandler(async (req:any, res:any) => {
//   // const response = await axiosInstance.post('/your-template-endpoint', {
//   //   // Add your template data here
//   // });
//   res.json({
//     ans: "react",
//     prompts: testPromptsArr,
//     uiPrompts: [reactBasePrompt]
//   });
// }));
// app.post("/chat", asyncHandler(async (req:any, res:any) => {
//   const messages = req.body.messages;
//   console.log("Starting API call to Anthropic...\n");
//   const startTime = Date.now();
//   const response = await anthropic.messages.create({
//     model: 'grok-beta',
//     messages: messages,
//     max_tokens: 8000,
//     system: getSystemPrompt()
//   });
//   const endTime = Date.now();
//   console.log(`Anthropic API call completed in ${endTime - startTime}ms\n`);
//   console.log(response);
//   res.json({
//     response: (response.content[0] as TextBlock)?.text
//   });
// }));
// // app.get("/getAccessToken", asyncHandler(async (req, res) => {
// //   const params = new URLSearchParams({
// //     client_id: process.env.CLIENT_ID,
// //     client_secret: process.env.CLIENT_SECRET,
// //     code: req.query.code
// //   }).toString();
// //   const response = await axiosInstance.post(
// //     `https://github.com/login/oauth/access_token?${params}`,
// //     null,
// //     {
// //       headers: {
// //         Accept: 'application/json'
// //       }
// //     }
// //   );
// //   res.json(response.data);
// // }));
// // app.get('/getUserData', asyncHandler(async (req, res) => {
// //   const authHeader = req.get('Authorization');
// //   if (!authHeader) {
// //     throw new Error('Authorization header is required');
// //   }
// //   const response = await axiosInstance.get("https://api.github.com/user", {
// //     headers: {
// //       Authorization: authHeader
// //     }
// //   });
// //   res.json(response.data);
// // }));
// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.json({ status: 'healthy', timestamp: new Date().toISOString() });
// });
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
// process.removeAllListeners('warning');
// // Graceful shutdown handling
// process.on('SIGTERM', () => {
//   console.info('SIGTERM signal received.');
//   process.exit(0);
// });
// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const prompts_1 = require("./prompts");
const react_1 = require("./defaults/react");
const body_parser_1 = __importDefault(require("body-parser"));
const userPrompts_1 = require("./userPrompts");
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
app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
});
app.use(express_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.json());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.use((req, res, next) => {
    res.setTimeout(6000000, () => {
        res.status(408).send('Request Timeout');
    });
    next();
});
app.post("/template", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            ans: "react",
            prompts: userPrompts_1.promptsArr,
            uiPrompts: [react_1.basePrompt]
        });
        return;
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/chat", (req, res) => {
    res.send("/chat get route working");
});
app.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const messages = yield req.body.messages;
    try {
        const response = yield anthropic.messages.create({
            model: 'grok-beta',
            messages: messages,
            max_tokens: 8000,
            system: (0, prompts_1.getSystemPrompt)()
        });
        res.json({
            response: (_a = response.content[0]) === null || _a === void 0 ? void 0 : _a.text
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
// app.get("/getAccessToken", async (req, res) => {
//   const params = "?client_id=" + process.env.CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET + "&code=" + req.query.code;
//   await axios.post("https://github.com/login/oauth/access_token" + params)
//     .then((response) => { return response.data })
//     .then((data) => {
//       res.json(data);
//     })
// })
// app.get('/getUserData', async (req, res) => {
//   req.get('Authorization'); //Bearer ACCESS_TOKEN
//   await axios
//     .get("https://api.github.com/user", {
//       headers: {
//         Authorization: req.get('Authorization')
//       }
//     })
//     .then((response) => { return response.data })
//     .then((data) => {
//       res.json(data);
//     })
// });
app.get('/', (req, res) => {
    res.send('Hello World!');
});
process.removeAllListeners('warning');
app.listen(3000);
