import Place from "../../models/Place.js"


export const createPlace =async (req,res,next)=>{
    try {
    var imagesArray = []
    const { images } = req.files;
    console.log(images)
    const path = "/uploaded-images/";
    const filePath = './public' + path

    if (images.length) {
        for (let i = 0; i < images.length; i++) {
            const fileName = Date.now() + images[i].name;
            await images[i].mv(filePath + fileName);
            imagesArray.push(path + fileName);
          }
    } else if(Object.keys(images).length !== 0) {
        const fileName = Date.now() + images.name;

        await images.mv(filePath + fileName);
        const imagePath = path + fileName
        imagesArray.push(imagePath)
    }

    req.body.images = imagesArray
    console.log(req.body)
    const newPlace = new Place (req.body)
   
        const savedPlace = await newPlace.save()
        
        // const places = await Place.find({ owner_id: req.session.owner._id})
        res.redirect('/admin/places/owner-places');
    }
    catch(err){
        
        next(err);
    }
}
export const updatePlace =async (req,res,next)=>{
    try{
        const updatedPlace = await Place.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true})
        res.status(200).json(updatedPlace)
    }
    catch(err){
        next(err);
    }
    
}
export const deletePlace =async (req,res,next)=>{
    try{
        await Place.findByIdAndDelete(req.params.id)
          res.status(200).json("place has been deleted")
      }
      catch(err){
        next(err)
      }
      
}
export const getPlace =async (req,res,next)=>{
   
    try{
        const Place = await Place.findById(req.params.id)
        res.status(200).json(Place)
    }
    catch(err){
        next(err)
    }
}

// export const countByCity =async (req,res,next)=>{
//         const cities =req.query.cities.split(",")
//     try{
//         const list =  await Promise.all(cities.map(city=>{
//             return Place.countDocuments({city:city})
//         }))
//         res.status(200).json(list);
//     }
//     catch(err){
//        next(err)
//     }
// }
// export const countByArea =async (req,res,next)=>{
//         const areas =req.query.areas.split(",")
//     try{
//         const list =  await Promise.all(areas.map(area=>{
//             return Place.countDocuments({area:area})
//         }))
//         res.status(200).json(list);
//     }
//     catch(err){
//        next(err)
//     }
// }



export const getOwnerPlaces =async (req,res,next)=>{
    try {
       

        // If the user is loggedin
        if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
          res.redirect('/admin/auth/sign-in');
        }
        
        const places = await Place.find({ owner_id: req.session.owner._id})
        res.render('admin/places/index', { 
          layout: './admin/layouts/main', 
          places: places, 
          owner: req.session.owner 
        });
    }
    catch(err){
       next(err)
    }
}
export const renderCreatePlaceView=async (req,res,next)=>{
    try {
        // If the user is loggedin
      if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
          res.redirect('/admin/auth/sign-in');
        }

        res.render('admin/places/create', { 
          layout: './admin/layouts/main',
          owner: req.session.owner 
        });
    }
    catch(err){
       next(err)
    }
}