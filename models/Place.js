import mongoose from "mongoose";
const {schema} = mongoose;

const placeSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
    },
    type :{
        type: String,
        required: true,
    },
    
    city :{
        type: String,
        required: true,
    },
    area :{
        type: String,
        required: true,
    },
    photos :{
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
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
      },
    rating:{
        type: Number,
        min: 0,
        max: 5,
    },
    capacity:{
        type:Number,
        required: true,
    }
})

export default mongoose.model("Place",placeSchema)
