import mongoose from "mongoose";
const {schema} = mongoose;

const BookingSchema = new mongoose.Schema({
    bookingNumber :{
        type: String,
        required: true,
        unique: true
    },
    date :{
        type: Date,
        required: true
    },
    checkin :{
        type: String,
        required: true
    },
    checkout :{
        type: String,
        required: true
    },
    total :{
        type: Number,
        required: true
    },
    numberOfTickets :{
        type: Number,
        default: 1
    },
    status :{
        type: String,
        enum:['pending','approved','canceled', 'declined'], 
        default: 'pending',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    },
    owner_id :{
        type: String,
        required: true
    },
},{timestamps:true}
);
  
export default mongoose.model("Booking",BookingSchema)  
