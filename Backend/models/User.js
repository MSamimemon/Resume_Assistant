const mongoose= require('mongoose');
const {Schema} = mongoose;

const UserSchema=new Schema({
    name: {
        type:String,
        required:true
    },
    mobileNo: {
        type:String,
        required:true,
        unique: true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpire: {
        type: Date,
        default: null
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const User=mongoose.model('user',UserSchema);
User.createIndexes();
module.exports=User;