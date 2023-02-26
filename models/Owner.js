import mongoose from "mongoose";
const {schema} = mongoose;

const OwnerSchema = new mongoose.Schema({
    ownername :{
        type: String,
        required: true,
        unique: true
    },
    companyname :{
        type: String,
        required: true,
        unique: true
    },

    email :{
        type: String,
        required: true,
        unique: true
    },
    type :{
        type: String,
        required: true,
       
    },
    password :{
        type: String,
        required: true,
        
    },
    
    phone: {
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
      },
     
    isAdmin:{
        type: Boolean,
        default:false,
    },
},{timestamps:true});

export default mongoose.model("Owner",OwnerSchema)