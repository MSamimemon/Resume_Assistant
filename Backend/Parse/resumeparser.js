const fs = require('fs');
const PdfParse = require('pdf-parse');
const pdfparse= require('pdf-parse');

const resumeParser=async(filePath)=>{
    try {
        const filedata=fs.readFileSync(filePath);
        const data= await PdfParse(filedata);
        return {
            text:data.text,
            pages:data.numpages
        };
    } catch (error) {
        console.error("Resume parsing error:", error);
        throw new Error("Failed to parse resume");
    }
};
module.exports=resumeParser