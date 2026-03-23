let { ChatGoogleGenerativeAI } = require("@langchain/google-genai")

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});

exports.testapi = () => {
    model.invoke("").then((response) => {
        
    })
}



