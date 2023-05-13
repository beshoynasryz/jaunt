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

      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
    },

    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place'
  },
     
},{timestamps:true}
);

  
export default mongoose.model("Manager",ManagerSchema)