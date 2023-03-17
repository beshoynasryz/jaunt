import mongoose from "mongoose";
const {schema} = mongoose;

const placeSchema = new mongoose.Schema({
    name :{
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
    owner_id :{
        type: String,
        required: true,
    },
})

export default mongoose.model("Place",placeSchema)
