const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { ChatMistralAI } = require("@langchain/mistralai");
const { HumanMessage, SystemMessage, AIMessage } = require("@langchain/core/messages");

// Models
const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY,
    streaming: true
});

const mistralModel = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: process.env.MISTRAL_API_KEY,
    streaming: true
});

const SYSTEM_PROMPT = `You are a helpful and precise assistant for answering questions.
If you don't know the answer, say you don't know. 
Provide clear, concise, and accurate responses.
Format your response with proper markdown when appropriate.`;

// 🔹 Normal response (no streaming)
async function generateResponse(messages) {
    try {
        const messageArray = [
            new SystemMessage(SYSTEM_PROMPT),
            ...messages.map(msg => {
                if (msg.role === "user") return new HumanMessage(msg.content);
                if (msg.role === "assistant" || msg.role === "ai") return new AIMessage(msg.content);
            }).filter(Boolean)
        ];

        const response = await mistralModel.invoke(messageArray);
        return response.content || "";
    } catch (error) {
        throw new Error(`AI Service Error: ${error.message}`);
    }
}

// 🔥 REAL STREAMING FUNCTION - Returns async generator
async function* generateResponseStream(messages, onToken) {
    try {
        const messageArray = [
            new SystemMessage(SYSTEM_PROMPT),
            ...messages.map(msg => {
                if (msg.role === "user") return new HumanMessage(msg.content);
                if (msg.role === "assistant" || msg.role === "ai") return new AIMessage(msg.content);
            }).filter(Boolean)
        ];

        // 🔥 Stream directly from model
        const stream = await mistralModel.stream(messageArray);

        for await (const chunk of stream) {
            const text = chunk.content || "";

            if (text) {
                if (onToken) {
                    onToken(text); // 🔥 send token to controller
                }
                yield text; // 🔥 yield token to caller
            }
        }
    } catch (error) {
        throw new Error(`Streaming Error: ${error.message}`);
    }
}

// 🔹 Chat Title
async function generateChatTitle(message) {
    const response = await mistralModel.invoke([
        new SystemMessage(`
You are a helpful assistant that generates concise and descriptive titles for chat conversations.

Generate a short title (2-4 words).
        `),
        new HumanMessage(`Message: "${message}"`)
    ]);

    return response.content || "";
}

module.exports = {
    generateChatTitle,
    generateResponse,
    generateResponseStream
};