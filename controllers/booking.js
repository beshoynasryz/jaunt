import Booking from "../models/Booking.js";
import Owner from "../models/Owner.js";
import Place from "../models/Place.js";

export const getUserBookings = async (req,res,next)=>{
    try {
        console.log(req.params.status)
        if(req.params.status != 'history'){
            var bookings = await Booking.find({ user: req.params.id, status: req.params.status }).populate('place');
        } else { 
            var bookings = await Booking.find({ user: req.params.id }).populate('place');
        }
        
        let bookingsResponse = bookings.map(async function(booking){
            const owner = await Owner.findById(booking.owner_id)
            return await {
                _id: booking._id,
                bookingNumber: booking.bookingNumber,
                date: booking.date,
                checkin: booking.checkin, 
                checkout: booking.checkout,
                numberOfTickets: booking.numberOfTickets,
                status: booking.status,
                total:booking.total,
                bookingNumber:booking.bookingNumber,
                place: { 
                    // type: booking.place?.type,
                    // address: booking.place?.address,
                    // city: booking.place?.city,
                    // area: booking.place?.area,
                    _id: booking.place?._id,
                    receptionHours: booking.place?.receptionHours,
                
                    type: booking.place?.type, 
                    city: booking.place?.city,
                    area: booking.place?.area,
                    address: booking.place?.address,
                    images: booking.place?.images,
                    desc: booking.place?.desc,
                    budget: booking.place?.budget,
                    phone: booking.place?.phone,
                    capacity: booking.place?.capacity,
                    status: booking.place?.status,
                    createdAt: booking.place?.createdAt,
                    updatedAt: booking.place?.updatedAt,
                    service1: booking.place?.service1,
                    service2: booking.place?.service2,
                    service3: booking.place?.service3, 
                    service4: booking.place?.service4,
                    service5: booking.place?.service5,
                    service6: booking.place?.service6,
                    service7: booking.place?.service7,
                    service8: booking.place?.service8,
                    
                    menuimages: booking.place?.menuimages,
                },
                owner: {
                    companyname: owner?.companyname,
                    imagelogo: owner?.imagelogo,
                },
            }
        })
        const results = await Promise.all(bookingsResponse);
        res.status(200).json(results)
    }
    catch(err){
        next(err)
    }
}

const getRandomBookingNumber = (min = 0, max = 500000) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const num =  Math.floor(Math.random() * (max - min + 1)) + min;
    return 'BN-' + num.toString().padStart(6, "0")
};

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
            bookingNumber: getRandomBookingNumber(),
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
        // console.log(newBooking);
        // return
        await newBooking.save()

        res.status(200).json({ "mag": "Booking has been created ", booking: newBooking })
    }
    catch(err){
        
        next(err);
    }
}

export const getBooking =async (req,res,next)=>{
    try {
        const userBooking = await Booking.findById(req.params.id).populate('place')
        res.status(200).json(userBooking) 
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

