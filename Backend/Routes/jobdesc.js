const extractjobSkills=require('../ATSService/jobSkillExtractor');
const express=require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Jobdesc = require('../models/Jobdesc');
const { body, validationResult } = require('express-validator');
let success= false;

// ROUTE 1 :get all job description 
router.get('/fetchjobdesc',fetchuser,async (req,res)=>{
    const jobdesc= await Jobdesc.find({user:req.user.id})
    res.json(jobdesc);
});

// ROUTE 2 :Add job description 
router.post('/addjobdesc',fetchuser,[
    body('title','Title is Required.').notEmpty(),
    body('text','Text must be more than 5 words').isLength({min:5})
],async(req,res)=>{
    try {
        const {title , text , company}=req.body;
        const skills= extractjobSkills(text);
        const errors=validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ success,errors: errors.array() });  
        }
        const jobdesc = new Jobdesc({
            text , title , parsedData:{skills}, company , user:req.user.id
        })
        const savejobdesc=await jobdesc.save();
        res.json(savejobdesc);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
});
//ROUTE 3 Delete the job Desc:
router.delete('/deletejobdesc/:id',fetchuser,async(req,res)=>{
    try {
        let jobdesc =await Jobdesc.findById(req.params.id)
        if (!jobdesc){
            return res.status(404).send("Not Allowedd...");
        }
        if (jobdesc.user.toString()!== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        jobdesc=await Jobdesc.findByIdAndDelete(req.params.id);
          res.json({ success:true, message: "Job Description has been deleted." });
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports=router;


