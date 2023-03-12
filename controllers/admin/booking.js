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

        res.status(200).json({ "mag": "Booking has been created " + total, pl:place })
    }
    catch(err){
        
        next(err);
    }
}

export const updatedStatus =async (req,res,next)=>{
    try{
        console.log(req.body)
        await Booking.findByIdAndUpdate(req.params.id, { $set: {status: req.body.status }}, {
            new: true
          }) 
        
        if(req.accepts('json') !== undefined){
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
