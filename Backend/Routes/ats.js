const express = require('express');
const router=express.Router();
const Resume=require('../models/Resume');
const fetchuser=require('../middleware/fetchuser');
const Jobdesc=require('../models/Jobdesc');
const atsAnalyzer=require('../ATSService/atsAnalyzer');
const AtsAnalysis = require('../models/AtsAnalysis')
let success=false

//Route 1 Analyze Resume Login Required.
router.post('/analyze',fetchuser,async(req,res)=>{
    try {
        const {resumeId,jobdescId}=req.body;
        if (!resumeId || !jobdescId) {
            return res.status(400).json({success , message: "Resume ID and Job Description ID are required."});
        }
        const resume= await Resume.findById(resumeId);
        if (!resume){
            return res.status(404).json({message: "Resume not found"});
        };
        const job = await Jobdesc.findById(jobdescId);
        if (!job){
            return res.status(404).json({ message: "Job not found"});
        };
        if (resume.user.toString() !== req.user.id){
            return res.status(401).json({message: "Not Allowed"});
        };
        if(job.user.toString() !== req.user.id){
            return res.status(401).json({message: "Not Allowed"});
        };
        const resumeSkills= resume.parsedData?.skills || [];
        const jobSkills= job.parsedData?.skills || [];
        const result = atsAnalyzer(
           resumeSkills,jobSkills
        );
        
        const analysis = new AtsAnalysis({
            user: req.user.id,
            resume: resume._id,
            jobdesc: job._id,
            atsScore: result.atsScore,
            matchedSkills: result.matchedSkills,
            missingSkills: result.missingSkills,
            suggestions: result.suggestions,
        });
        
        const savedAnalysis = await analysis.save();
        return res.json({success:true ,analysis: result,savedAnalysis:savedAnalysis});

    } catch (error) {
        console.error(error);
        res.status(500).json({success,message:"Internal Server Error"});
    }
});
// Route 2: Fetch Ats Score History , Login Required.
router.get("/history", fetchuser, async (req, res) => {
  try {
    const history = await AtsAnalysis.find({user: req.user.id}).populate("resume", "text resumepath").populate("jobdesc", "title company").sort({ createdAt: -1 });
    return res.json({success: true,history});
    } catch (error) {
    console.error("ATS History Error:", error);
    return res.status(500).json({success ,message: "Internal Server Error"});
    }
});

module.exports = router;
