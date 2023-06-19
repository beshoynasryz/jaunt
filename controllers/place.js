import Owner from "../models/Owner.js";
import Place from "../models/Place.js"
import Rating from "../models/Rating.js";

export const getPlaces =async (req,res,next)=>{
    try {
        let places = await Place.find({ status: 'approved' }).populate('ratings')
        
        if(req.query.type && req.query.area){
            places = await Place.find({ type: req.query.type, area: req.query.area, status: 'approved' }).populate('ratings');
        } else if(req.query.type){
            places = await Place.find({ type: req.query.type, status: 'approved' }).populate('ratings');
        } else if(req.query.area){
            places = await Place.find({ area: req.query.area, status: 'approved' }).populate('ratings');
        } 
        
        let placesResponse = places.map(async function(place){
            const owner = await Owner.findById(place.owner_id)
            return await {
               
                _id: place._id,
                receptionHours: place.receptionHours,
                name: place.name,
                type: place.type, 
                city: place.city,
                area: place.area,
                address: place.address,
                images: place.images,
                desc: place.desc,
                budget: place.budget,
                phone: place.phone,
                capacity: place.capacity,
                status: place.status,
                createdAt: place.createdAt,
                updatedAt: place.updatedAt,
                service1: place.service1,
                service2: place.service2,
                service3: place.service3,
                service4: place.service4,
                service5: place.service5,
                service6: place.service6,
                service7: place.service7,
                service8: place.service8,
                ratings: place.ratings,
                menuimages: place.menuimages,

                owner: {
                    companyname: owner.companyname,
                    imagelogo: owner.imagelogo,
                },
               
            
               
            }
        }).sort('-createdAt')
        const results = await Promise.all(placesResponse);
        res.status(200).json(results)
    }
    catch(err){
       next(err)
    }  
}
 
export const getPlace =async (req,res,next)=>{
    try {
        const place = await Place.findById(req.params.id).populate('ratings')
        res.status(200).json(place)
    }
    catch(err){
        next(err)
    }
}
