const express= require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchuser');
const Application = require ('../models/Application');
const { body ,validationResult } = require('express-validator');
let success=false;

//ROUTE 1 Get all Job Appliactions:
router.get('/fetchajobpplic',fetchuser,async(req,res)=>{
    try {
        const applica=await Application.find({user:req.user.id}).populate('resume').populate('jobdesc')
        res.json(applica);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
//ROUTE 2 Add Job Application
router.post('/addjobapplica',fetchuser,[
    body('status').isIn(['applied', 'interview', 'rejected', 'offer']).withMessage('Status must be applied, interview, rejected, or offer'),
    body('jobdesc').isMongoId().withMessage('Invalid Job Description ID'),
    body('resume').isMongoId().withMessage('Invalid Resume ID'),
    body('notes').optional().isLength({ max: 500 })
],async(req,res)=>{
    try{
        const {status, notes,jobdesc,resume}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ success,errors: errors.array() });
        }
        const applica= new Application({
            status , notes , user:req.user.id , jobdesc,resume
        })
        const saveapplica= await applica.save();
        res.json(saveapplica);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
// ROUTE 3 Update a Job Application.
router.put('/updatejobapplica/:id',fetchuser,async(req,res)=>{
    const {status, notes}=req.body;
    const newApplication = {};
    try {
        if (status) newApplication.status = status;
        if (notes) newApplication.notes = notes;
        let applica = await Application.findById(req.params.id);
        if (!applica) {
            return res.status(404).send("Not Found");
        }
        if (applica.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        applica = await Application.findByIdAndUpdate(
            req.params.id,
            { $set: newApplication },
            { new: true }
        );
        res.json(applica);
    } catch (error) {
       console.error(error.message);
        res.status(500).send("Internal Server Error"); 
    }
});
// ROUTE 4 Delete a Job Application.
router.delete('/deletejobapplica/:id',fetchuser,async(req,res)=>{
    try {
        let applica = await Application.findById(req.params.id);
        if (!applica){
           return res.status(404).send("Not Allowedd..."); 
        }
        if (applica.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        applica = await Application.findByIdAndDelete(req.params.id);
        res.json({ success:true, message: "Job Application has been Deleted." });
    } catch (error) {
       console.error(error.message);
        res.status(500).send("Internal Server Error"); 
    }
});

module.exports=router;