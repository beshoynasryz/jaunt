import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    rate: {
      type: Number,
      required: true,
    },
    rateServices: {
      type: Number,
      
    },
    comment: {
      type: String,
    },
    rater :{
        type: String,
        required: true,
        enum:['place', 'user'],
        default: 'user',
    },
    booking: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Booking" 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    place: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Place" 
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Rating", ratingSchema);
