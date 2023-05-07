import mongoose from "mongoose";
const {schema} = mongoose;

const placeSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
    },
    email :{
        type: String,
        required: true,
    },
    type :{
        type: String,
        enum:['park','workspace','restaurant','cafe'],
        required: true,
    },
    
    city :{
        type: String,
        required: true,
    },
    address :{
        type: String,
        required: true,
    },
    area :{
        type: String,
        required: true,
    },
    images :{
        type: [String],
    },

    desc :{
        type: String,
        required: true,
    },
    budget :{
        type: Number,
        required: true,
        
    },
    phone: {
        type: String,
      },
    rating:{
        type: Number,
        min: 0,
        max: 5,
    },
    capacity:{
        type:Number,
        required: true,
    },
    service1:{
        type:String,
       
    },
    
    service2:{
        type:String,
       
    },
    service3:{
        type:String,
       
    },
    service4:{
        type:String,
       
    },
    service5:{
        type:String,
       
    },
    service6:{
        type:String,
       
    },
    service7:{
        type:String,
       
    },
    service8:{
        type:String,
       
    },
   
    status :{
        type: String,
        enum:['pending','approved', 'declined'], 
        default: 'pending',
    },
 
      menuimages:{
        type: [String],
    },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
    owner_id :{
        type: String,
        required: true,
    },
    receptionHours: [],
},


{
    timestamps: true
})

export default mongoose.model("Place",placeSchema)
