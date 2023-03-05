import mongoose from "mongoose";
const {schema} = mongoose;

const OwnerSchema = new mongoose.Schema({
    ownername :{
        type: String,
        required: true
    },
    companyname :{
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
        // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
      },
     
    isAdmin:{
        type: Boolean,
        default:false,
    },
},{timestamps:true}
);
// OwnerSchema.path('phone').validate(function validatePhone() {
//     return ( this.phone > 999999999 );
//   });
  
export default mongoose.model("Owner",OwnerSchema)