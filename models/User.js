import mongoose from "mongoose";
const {schema} = mongoose;

const UserSchema = new mongoose.Schema({
    name :{
        type: String, required: true,  unique: true
    },  email :{
        type: String, required: true,unique: true
    },  password :{
        type: String, required: true,
    },  image :{
        type: String,
    }, phone: {
        type: String,
      }, city :{
        type: String, required: true,
    }, country :{
        type: String, required: true,
    }, area :{
        type: String, required: true,
    }, isAdmin:{
        type: Boolean, default:false,
    },
},{timestamps:true});

export default mongoose.model("User",UserSchema)