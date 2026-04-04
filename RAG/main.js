
import {PDFParse} from "pdf-parse";
import fs from "fs";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

let dataBuffer = fs.readFileSync('./story.pdf');

const parser = new PDFParse({
    data: dataBuffer
})

const data = await parser.getText()
 
const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 100, chunkOverlap: 0 })

const texts =  await splitter.splitText(data.text)

console.log(texts)