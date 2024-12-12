import cors from "cors";
require("dotenv").config();
import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import { TextBlock } from "@anthropic-ai/sdk/resources";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { basePrompt as reactBasePrompt } from "./defaults/react";
import bodyParser from "body-parser";
import axios from "axios";
import { testPromptsArr } from "./userPrompts";

const anthropic = new Anthropic({
  apiKey: "xai-OvR6xKY46HCd7LeksVuaUYkVbUgeJ8vqsxACAhZeRhWOmJP7nDyCVHdDMpHergVA8nOHK7LqON4HInvm",
  baseURL: "https://api.x.ai/",
});

const app = express();
const corsOptions = {
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next()
})
app.use(express.json());
app.use(bodyParser.json());

app.post("/template", async (req, res) => {
  try {
    res.json({
      ans: "react",
      prompts:testPromptsArr ,
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
})

app.post("/chat", async (req, res) => {
  const messages = await req.body.messages;
  const response = await anthropic.messages.create({
    model: 'grok-beta',
    messages: messages,
    max_tokens: 8000,
    system: getSystemPrompt()
  })
  console.log(response);
  res.json({
    response: (response.content[0] as TextBlock)?.text
  });
})

app.get("/getAccessToken", async (req, res) => {
  const params = "?client_id=" + process.env.CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET + "&code=" + req.query.code;
  await axios.post("https://github.com/login/oauth/access_token" + params)
    .then((response) => { return response.data })
    .then((data) => {
      res.json(data);
    })
})

app.get('/getUserData', async (req, res) => {
  req.get('Authorization'); //Bearer ACCESS_TOKEN
  await axios
    .get("https://api.github.com/user", {
      headers: {
        Authorization: req.get('Authorization')
      }
    })
    .then((response) => { return response.data })
    .then((data) => {
      res.json(data);
    })
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

process.removeAllListeners('warning');

app.listen(3000);