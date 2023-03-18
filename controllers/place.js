import Place from "../models/Place.js"

export const getPlaces =async (req,res,next)=>{
    try {
        let places = await Place.find()
        
        if(req.query.type && req.query.area){
            places = await Place.find({ type: req.query.type, area: req.query.area });
        } else if(req.query.type){
            places = await Place.find({ type: req.query.type });
        } else if(req.query.area){
            places = await Place.find({ area: req.query.area });
        }
        res.status(200).json(places)
    }
    catch(err){
       next(err)
    } 
}

export const getPlace =async (req,res,next)=>{
    try {
        const place = await Place.findById(req.params.id)
        res.status(200).json(place)
    }
    catch(err){
        next(err)
    }
}