import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import config from "../config/config.js";

export const geminimodel = new ChatGoogle({
  model: "gemini-2.5-flash-lite",
  apiKey: config.GOOGLE_API_KEY,
});

export const mistralmodel = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: config.MISTRAL_API_KEY,
});

export const coheremodel = new ChatCohere({
  model: "command-a-03-2025",
  apiKey: config.COHERE_API_KEY,
});
