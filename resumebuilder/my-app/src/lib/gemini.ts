import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateAicontent(promt: string) {
  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash",
    input: promt
  });
  console.log(interaction.output_text);
}
