import Booking from "../../models/Booking.js";
import Owner from "../../models/Owner.js";
import Place from "../../models/Place.js";

export const index = async (req, res, next) => {
    try {
    // If the user is loggedin 
      if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
        res.redirect('admin/auth/sign-in');
	}
        const places = await Place.find({ owner_id: req.session.owner._id}).limit(40).exec();
        let bookings = await Booking
        .find({ owner_id: req.session.owner._id})
        .populate('user').limit(3).exec();

        let owners = []
        let ownersrequst = []
        let leatesPlaces = []

    if(req.session.owner.isAdmin) {
        leatesPlaces = await Place.find().limit(3).exec();
        ownersrequst = await Owner.find().limit(3).exec();
        owners = await Owner.find().limit(20).exec();
    } 
   
    
        res.render('admin/index', 
        { 
            owner: req.session.owner,
            places: places,
            bookings: bookings,
            owners: owners,
            ownersrequst: ownersrequst,
            leatesPlaces: leatesPlaces,


        } );
    } catch(err){
        next(err)
    }
}
