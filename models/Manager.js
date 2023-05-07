import mongoose from "mongoose";
const {schema} = mongoose;

const ManagerSchema = new mongoose.Schema({
    managername :{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true,
        // unique: true
    },
    password :{
        type: String,
        required: true,
        
    },
    image :{
        type: String,
    },
    phone: {
        type: String,
   
      },

      owner :{
          type: String,
          required: true,
      },

      place :{
          type: String
      },
     
    isAdmin:{
        type: Boolean,
        default:false,
    },
},{timestamps:true}
);

  
export default mongoose.model("Manager",ManagerSchema)