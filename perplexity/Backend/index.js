require("dotenv").config();
const readline = require("readline");
const { ChatMistralAI } = require("@langchain/mistralai");
const sendEmail = require("./src/services/mail.services")
let { HumanMessage, tool, createAgent } = require("langchain");
const { default: z } = require("zod");
const { createFile, readFile, deleteFile, saveNote, generatePDF } = require("./src/services/file.services");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let emailtool = tool(
    sendEmail,
    {
        name: "emailTool",
        description: "Use this tool to send an email",
        schema: z.object({
            to: z.string().describe("The recipient's email address"),
            html: z.string().describe("The HTML content of the email"),
            subject: z.string().describe("The subject of the email"),
        })
    }
)

const createFileTool = tool(createFile, {
    name: "create_file",
    description: "Create a file with given content",
    schema: z.object({
        filename: z.string(),
        content: z.string()
    })
});

const readFileTool = tool(readFile, {
    name: "read_file",
    description: "Read content of a file",
    schema: z.object({
        filename: z.string()
    })
});

const deleteFileTool = tool(deleteFile, {
    name: "delete_file",
    description: "Delete a file",
    schema: z.object({
        filename: z.string()
    })
});

const noteTool = tool(saveNote, {
    name: "save_note",
    description: "Save a note",
    schema: z.object({
        note: z.string()
    })
});

const pdfTool = tool(generatePDF, {
    name: "generate_pdf",
    description: "Generate a PDF file",
    schema: z.object({
        filename: z.string(),
        content: z.string()
    })
});

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MINSTRAL_API_KEY
});


const agent = createAgent({
    model,
    tools: [emailtool, readFileTool, createFileTool, deleteFileTool, noteTool, pdfTool]
})


// input ko Promise bana diya
function ask(query) {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
}


let messages = []
async function startChat() {
    while (true) {
        const userInput = await ask("\x1b[32mYou:\x1b[0m ");
        messages.push(new HumanMessage(userInput))
        if (userInput === "exit") {
            break;
        }

        const response = await agent.invoke({ messages });

        const lastMessage = response.messages[response.messages.length - 1];

        // console.log(`\x1b[34m[AI]\x1b[0m ${lastMessage.content}`);

        messages.push(lastMessage);
    }

    rl.close();
}

startChat();