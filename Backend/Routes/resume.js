const resumeParser=require('../Parse/resumeparser');
const extractData= require('../Parse/parseData');
const express = require('express');
const Resume = require('../models/Resume');
const router = express.Router();
const fs= require('fs');
const fetchuser=require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const upload = require ('../middleware/upload');
const PdfParse = require('pdf-parse');
let success= false;
// ROUTE 1 Fetch all Resumes Login Requires
router.get('/fetchresume',fetchuser,async(req,res)=>{
    const resume=await Resume.find({user:req.user.id});
    res.json(resume);
});
// ROUTE 2 add a Resumes Login Requires
router.post('/addresume',fetchuser,[
    body('text')
    // body('resumepath','The Resume path is InValid.').matches(/\.(pdf|doc|docx)$/i).withMessage('Only PDF, DOC, or DOCX files are allowed')
],async(req,res)=>{
    try {
        const {text , resumepath}=req.body;
        const errors=validationResult(req);
        if (!errors.isEmpty()){
              return res.status(400).json({ success,errors: errors.array() });
        }
        const parsedData=await extractData(text)
        const resume = new Resume({
            text:text , resumepath:resumepath ||"" , parsedData:parsedData,user:req.user.id
        })
        const saveresume = await resume.save();
        res.json(saveresume);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
});
// ROUTE 3: Delete a Resume 
router.delete('/deleteresume/:id',fetchuser,async(req,res)=>{
    try {
        let resume = await Resume.findById(req.params.id);
        if (!resume){
            return res.status(404).send("Not Allowedd...");
        }
        if (resume.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        resume= await Resume.findByIdAndDelete(req.params.id)
        res.json({ success:true, message: "Resume has been deleted." });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Upload Resumes Login Requires
router.post('/uploadresume',fetchuser,upload.single('resume'),[
    body('text','Title is required').notEmpty()
],async(req,res)=>{
    try{
        const {text }=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({success,errors: errors.array()});
        }
        if (!req.file){
            return res.status(400).json({success,message:"Please upload a PDF or DOCX file."});
        }
        const parsedResume = await resumeParser(req.file.path);
        const structuredData = await extractData(parsedResume.text)
        const resume = new Resume({
            text , resumepath: req.file.path , parsedData:{...parsedResume,...structuredData} , user:req.user.id
        });
        const saveresume= await resume.save();
        res.json(saveresume);
    }catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 5: Updates Update Resumes Login Requires
router.put('/updateresume/:id',fetchuser,upload.single("resume"),async(req,res)=>{
    try {
        const resume = await Resume.findById(req.params.id);
        if(!resume){
            return res.status(404).json({ message: "Resume not found."});
        }
        if (resume.user.toString() !== req.user.id){
            return res.status(401).json({success,message:"Not Allowed"});
        }
        if (!req.file){
            return res.status(400).json({ success,message: "Please upload a new resume."});
        }
        const parsedResume = await resumeParser(req.file.path);
        if (!parsedResume ||!parsedResume.text ||typeof parsedResume.text !== "string" ||!parsedResume.text.trim()){
            try {
                await fs.promises.unlink(req.file.path);
            }catch (deleteError) {console.error("Could not delete failed upload:",deleteError.message);}
            return res.status(400).json({success: false,message: "Resume parser did not return valid text."});
        }
        const structuredData = await extractData(parsedResume.text);
        const oldResumePath = resume.resumepath;
        resume.text = req.body.text || resume.text;
        resume.resumepath = req.file.path;
        resume.parsedData = {...parsedResume,...structuredData};
        const updatedResume = await resume.save();
        if (oldResumePath && oldResumePath !== req.file.path) {
            try {
                await fs.promises.unlink(oldResumePath);
                console.log("Old resume deleted.");
            }catch (deleteError) {console.log("Old resume file could not be deleted:",deleteError.message);}
        }
        return res.status(200).json({success: true,message: "Resume updated successfully.",resume: updatedResume});
    } catch (error) {
        console.error("Update resume error:", error);
        if (req.file?.path) {
            try {
                await fs.promises.unlink(req.file.path);
                console.log("New resume deleted because update failed.");
            } catch (deleteError) {console.log("New resume could not be deleted:",deleteError.message);}
        }
        return res.status(500).json({success: false,message: error.message || "Internal Server Error"});
    }
});
module.exports=router;
