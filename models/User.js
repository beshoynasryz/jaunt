import mongoose from "mongoose";
const {schema} = mongoose;

const UserSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        unique: true
    },
    email :{
        type: String,
        required: true,
        unique: true
    },
    password :{
        type: String,
        required: true,
        
    },
    photo :{
        type: [String],
        
    },
    phone: {
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
      },
      city :{
        type: String,
        required: true,
    },
      country :{
        type: String,
        required: true,
    },
    area :{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default:false,
    },
},{timestamps:true});
UserSchema.path('phone').validate(function validatePhone() {
    return ( this.phone > 999999999 );
  });

export default mongoose.model("User",UserSchema)