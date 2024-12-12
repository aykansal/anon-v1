// import cors from "cors";
// import express from "express";
// import Anthropic from "@anthropic-ai/sdk";
// import { TextBlock } from "@anthropic-ai/sdk/resources";
// import { getSystemPrompt } from "./prompts";
// import { basePrompt as reactBasePrompt } from "./defaults/react";
// import bodyParser from "body-parser";
// import axios from "axios";
// import { testPromptsArr } from "./userPrompts";

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

import cors from "cors";
require("dotenv").config();
import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import { TextBlock } from "@anthropic-ai/sdk/resources";
import { getSystemPrompt } from "./prompts";
import { basePrompt as reactBasePrompt } from "./defaults/react";
import bodyParser from "body-parser";
import { promptsArr, testPromptsArr } from "./userPrompts";

const anthropic = new Anthropic({
  apiKey: "xai-OvR6xKY46HCd7LeksVuaUYkVbUgeJ8vqsxACAhZeRhWOmJP7nDyCVHdDMpHergVA8nOHK7LqON4HInvm",
  baseURL: "https://api.x.ai/",
});

const app = express();
const corsOptions = {
  origin: "https://anonlabs-frontend.vercel.app",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next()
})
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.use((req, res, next) => {
  res.setTimeout(6000000, () => { // 120 seconds (2 minutes)
    res.status(408).send('Request Timeout');
  });
  next();
});

app.post("/template", async (req, res) => {
  try {
    res.json({
      ans: "react",
      prompts: testPromptsArr,
      uiPrompts: [reactBasePrompt]
    });
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/chat", (req, res) => {
  res.send("/chat get route working");
});

app.post("/chat", async (req, res) => {
  const messages = await req.body.messages;
  try {
    const response = await anthropic.messages.create({
      model: 'grok-beta',
      messages: messages,
      max_tokens: 8000,
      system: getSystemPrompt()
    });

    res.json({
      response: (response.content[0] as TextBlock)?.text
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

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

