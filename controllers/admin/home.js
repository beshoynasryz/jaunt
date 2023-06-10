import Booking from "../../models/Booking.js";
import Manager from "../../models/Manager.js";
import Owner from "../../models/Owner.js";
import Place from "../../models/Place.js";

export const index = async (req, res, next) => {
    try {
    // If the user is loggedin 
        if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
            res.redirect('admin/auth/sign-in');
        }
        const places = await Place.find({
            $or: [{ status: 'pending' },
                {
                    status: 'approved'
                }
            ],
            $and: [{
                owner_id: req.session.owner._id
            }]
        }
        ).populate('manager').limit(40).exec();
        let bookings = await Booking
        .find({ owner_id: req.session.owner._id})
        .populate('user').limit(3).exec();

        let owners = []
       
        let leatesPlaces = []
        let placesResponse = places.map(place => {
            if (typeof place.receptionHours[0] !== 'undefined') {
                let receptionHours = place.receptionHours[0]
                return { ...place, receptionHours }
            }
        })
       
    if(req.session.owner.isAdmin) {
        leatesPlaces = await Place.find().limit(4).exec();
        
        owners = await Owner.find().limit(20).exec();
    } 
   
    
        const placeCount = await Place.find({ owner_id: req.session.owner._id, status: 'approved'});
        const placesofbranch = await Place.find({ owner_id: req.session.owner._id, status: 'approved'}).populate('manager');
       
        const managerCount = await Manager.find({ owner: req.session.owner._id});

        res.render('admin/index', 
        { 
            owner: req.session.owner,
            places: places,
            bookings: bookings,
            owners: owners,
            leatesPlaces: leatesPlaces,
            managerCount: managerCount.length,
            placeCount: placeCount.length,
            placesofbranch:placesofbranch,

        } );
    } catch(err){
        next(err)
    }
}
