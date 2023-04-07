import Place from "../models/Place.js"

export const getPlaces =async (req,res,next)=>{
    try {
        let places = await Place.find({ status: 'approved' })
        
        if(req.query.type && req.query.area){
            places = await Place.find({ type: req.query.type, area: req.query.area, status: 'approved' });
        } else if(req.query.type){
            places = await Place.find({ type: req.query.type, status: 'approved' });
        } else if(req.query.area){
            places = await Place.find({ area: req.query.area, status: 'approved' });
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
