import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is Required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is Required"]
    }
},{
    timestamps:true
})

//To interact with the data base
export default mongoose.model('users', userSchema)