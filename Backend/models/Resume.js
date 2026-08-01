const mongoose= require('mongoose');
const {Schema} = mongoose;

const resumeSchema= new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text:{
        type: String ,
        required : true
    },
    resumepath :{
        type: String
    },
    parsedData: {
    type: Object,
    default: null
    },

},{timestamps:true});
module.exports= mongoose.model('resume',resumeSchema);