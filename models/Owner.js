import mongoose from "mongoose";
const {schema} = mongoose;

const OwnerSchema = new mongoose.Schema({
    ownername :{
        type: String, required: true
    },
    companyname :{
        type: String, required: true
    },
    type :{
        type: String, required: true
    },
    email :{
        type: String, required: true,
    },
    password :{
        type: String, required: true,
        
    },
    image :{
        type: String,
    },
    imagelogo :{
        type: String,
    },
    phone: {
        type: String,
      },
    isAdmin:{
        type: Boolean, default:false,
    },
},{timestamps:true}
);
export default mongoose.model("Owner",OwnerSchema)