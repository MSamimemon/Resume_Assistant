const mongoose=require('mongoose');
const {Schema} = mongoose;

const ApplicationSchema= new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    resume:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'resume',
        required:true
    },
    jobdesc:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'jobdesc',
        required:true
    },
    status:{
        type: String,
        enum: ['applied', 'interview', 'rejected', 'offer'],
        default: 'applied',
        required: true
    },
    notes:{
        type:String,
        default:''
    },
    appliedDate:{
        type:Date,
        default: Date.now
    },
},{timestamps:true});

module.exports=mongoose.model('application',ApplicationSchema);