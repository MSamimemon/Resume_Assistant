const mongoose=require('mongoose');
const {Schema}=mongoose;

const JobdescSchema=new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required: true
    },
    company:{
        type:String
    },
    text:{
        type:String,
        required:true
    },
    parsedData: {
    type: Object,
    default: null
    }
},{timestamps:true});

module.exports=mongoose.model('jobdesc',JobdescSchema);