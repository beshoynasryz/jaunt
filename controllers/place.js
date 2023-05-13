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
        res.status(200).json(places)
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
