import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    }
})

const user = mongoose.model('user',UserSchema)
export default user;