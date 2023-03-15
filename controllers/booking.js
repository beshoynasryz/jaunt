import Booking from "../models/Booking.js"
import Place from "../models/Place.js";

export const getUserBookings = async (req,res,next)=>{
    try {
        let bookings = await Booking
            .find({ user: req.params.id})
            .populate('place');

        res.status(200).json(bookings)
    }
    catch(err){
        next(err)
    }
}

//function for get booking with each place (test)

// export const getPlaceBookings = async (req,res,next)=>{
//     try {
//         let bookings = await Booking
//             .find({ owner_id: req.params.id})
           

//         res.status(200).json(bookings)
//     }
//     catch(err){
//         next(err)
//     }
// }

 

export const createBooking =async (req,res,next)=>{
    try {
        const place = await Place.findById(req.body.place) 
        let total = place.budget * req.body.numberOfTickets;

        if(place.type === "workspace"){
            var checkinDateTime = req.body.date + ' ' + req.body.checkin
            var checkoutDateTime = req.body.date + ' ' + req.body.checkout
            const diffHours = new Date(checkoutDateTime).getHours() - new Date(checkinDateTime).getHours()
            total = place.budget * req.body.numberOfTickets * diffHours
        }

        const newBooking = new Booking({
            bookingNumber:req.body.bookingNumber,
            date:req.body.date,
            checkin:req.body.checkin,
            checkout:req.body.checkout,
            numberOfTickets:req.body.numberOfTickets,
            status:req.body.status,
            user:req.body.user,
            total: total,
            place:req.body.place,
            owner_id: place.owner_id,
        })
        await newBooking.save()

        res.status(200).json({ "mag": "Booking has been created ", booking: newBooking })
    }
    catch(err){
        
        next(err);
    }
}


export const getBooking =async (req,res,next)=>{
    try {
        const Booking = await Booking.findById(req.params.id)
        res.status(200).json(Booking)
    }
    catch(err){
        next(err)
    }
}

export const updateBooking =async (req,res,next)=>{
    try{
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true})
        res.status(200).json(updatedBooking)
    }
    catch(err){
        next(err);
    }
    
}
export const deleteBooking =async (req,res,next)=>{
    try{
        await Booking.findByIdAndDelete(req.params.id)
          res.status(200).json("Booking has been deleted")
      }
      catch(err){
        next(err)
      }
      
}
export const GetBookings =async (req,res,next)=>{
    try{
        const Bookings = await Booking.find()
        res.status(200).json(Bookings)
    }
    catch(err){
       next(err)
    }
}
