const fs = require("fs/promises");
const PDFDocument = require("pdfkit");
// create file
async function createFile({ filename, content }) {
    await fs.writeFile(filename, content);
    return `File ${filename} created`;
}

// read file
async function readFile({ filename }) {
    const data = await fs.readFile(filename, "utf-8");
    return data;
}

// delete file
async function deleteFile({ filename }) {
    await fs.unlink(filename);
    return `File ${filename} deleted`;
}

async function saveNote({ note }) {
    await fs.appendFile("notes.txt", note + "\n");
    return "Note saved";
}

 

async function generatePDF({ filename, content }) {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filename));

    doc.text(content);
    doc.end();

    return `PDF ${filename} created`;
}

module.exports = {createFile,readFile,deleteFile,saveNote,generatePDF}