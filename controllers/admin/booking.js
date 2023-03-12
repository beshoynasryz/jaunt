import Booking from "../../models/Booking.js"
import Place from "../../models/Place.js";

export const getOwnerBookings = async (req,res,next)=>{
    // If the user is loggedin
    if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
        res.redirect('/admin/auth/sign-in');
    }

    let bookings = await Booking
        .find({ owner_id: req.session.owner._id})
        .populate('user');

    if(req.session.owner.isAdmin) {
        bookings = await Booking.find().populate('user');
    } 

    res.render('admin/bookings/index', { 
        layout: './admin/layouts/main',      
        bookings: bookings, 
        owner: req.session.owner 
    });
}

export const updatedStatus =async (req,res,next)=>{
    try{
        await Booking.findByIdAndUpdate(req.params.id, { $set: {status: req.body.status }}, {
            new: true
          })
        
        //   console.log('wwww',req.accepts('json'),req.headers['content-type'] === 'application/json')
        
        if(req.headers['content-type'] !== 'application/json'){
            //respond in html
            res.redirect('/bookings/owner-bookings');
          } else {
            res.status(200).json({ "mag": "Booking has been updated" })
          } 
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

export const GetBookings =async (req,res,next)=>{
    try{
        const Bookings = await Booking.find()
        res.status(200).json(Bookings) 
    }
    catch(err){
       next(err)
    }
}
