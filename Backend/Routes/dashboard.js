const express = require('express');
const router=express.Router();
const Resume = require('../models/Resume');
const Jobdesc = require('../models/Jobdesc');
const Application = require('../models/Application');
const fetchuser=require('../middleware/fetchuser');
let success=false;

router.get('/',fetchuser,async(req,res)=>{
    try {
        const ResumeCount = await Resume.countDocuments({user:req.user.id });
        const JobdescCount = await Jobdesc.countDocuments({user:req.user.id });
        const ApplicationCount = await Application.countDocuments({user:req.user.id });
        const recentResumes = await Resume.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(8);
        const recentApplications = await Application.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(8);

        res.json({success: true,ResumeCount,JobdescCount,ApplicationCount,recentResumes,recentApplications});
    } catch (error) {
        res.status(500).json({success,message:"Internal Server Error"});
    }
});
module.exports=router