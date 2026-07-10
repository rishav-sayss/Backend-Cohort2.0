import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateAicontent(promt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: promt,
  });

  return response.text;

}
