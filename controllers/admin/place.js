import Manager from "../../models/Manager.js"
import Place from "../../models/Place.js"

export const createPlace =async (req,res,next)=>{
    try {
    var receptionHours = []
    if(req.body.sunday){
        receptionHours.push(
            {
                sunday: {
                    from: req.body.sundayFrom,
                    until: req.body.sundayUntil
                }
            } 
        )
    }   
    if(req.body.monday){
        receptionHours.push(
            {
                monday: {
                    from: req.body.mondayFrom,
                    until: req.body.mondayUntil
                }
            } 
        )
    }   
    if(req.body.tuesday){
        receptionHours.push(
            {
                tuesday: {
                    from: req.body.tuesdayFrom,
                    until: req.body.tuesdayUntil
                }
            } 
        )
    }   
    if(req.body.wendesday){
        receptionHours.push(
            {
                wendesday: {
                    from: req.body.wendesdayFrom,
                    until: req.body.wendesdayUntil
                }
            } 
        )
    }   
    if(req.body.thursday){
        receptionHours.push(
            {
                thursday: {
                    from: req.body.thursdayFrom,
                    until: req.body.thursdayUntil
                }
            } 
        )
    }   
    if(req.body.friday){
        receptionHours.push(
            {
                friday: {
                    from: req.body.fridayFrom,
                    until: req.body.fridayUntil
                }
            } 
        )
    }   
    if(req.body.saturday){
        receptionHours.push(
            {
                saturday: {
                    from: req.body.saturdayFrom,
                    until: req.body.saturdayUntil
                }
            } 
        )
    }   

    req.body.receptionHours = receptionHours

    var imagesArray = []
    const { images } = req.files;
    const path = "/uploaded-images-2/";
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
    
    //image menu
 
    var imagesArray = []
    const { menuimages } = req.files;
    const pathmenu = "/uploaded-images-2/";
    const filePathmenu = './public' + pathmenu

    if (menuimages.length) {
        for (let i = 0; i < menuimages.length; i++) {
            const fileName = Date.now() + menuimages[i].name;
            await menuimages[i].mv(filePathmenu + fileName);
            imagesArray.push(path + fileName);
          }
    } else if(Object.keys(menuimages).length !== 0) {
        const fileName = Date.now() + menuimages.name;

        await menuimages.mv(filePathmenu + fileName);
        const imagePath = pathmenu + fileName
        imagesArray.push(imagePath)
    }

    req.body.menuimages = imagesArray
 


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
        const ownerCafes = await Place.find({ type: 'cafe'})
        res.render('admin/places/index', { 
          layout: './admin/layouts/main', 
          places: places, 
          ownerCafes: ownerCafes, 
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

        const managers = await Manager.find({ owner: req.session.owner._id})
        res.render('admin/places/create', { 
          layout: './admin/layouts/main',
          managers: managers,
          owner: req.session.owner 
        });
    }
    catch(err){
       next(err)
    }
}


export const updatedStatus =async (req,res,next)=>{
    try{
        await Place.findByIdAndUpdate(req.params.id, { $set: {status: req.body.status }}, {
            new: true
          })
          
         
        //   console.log('wwww',req.accepts('json'),req.headers['content-type'] === 'application/json')

        if(req.headers['content-type'] !== 'application/json'){
            //respond in html
            res.redirect('back');
          } else {
            res.status(200).json({ "mag": "place status has been updated" })
          } 
    } 
    catch(err){
        next(err);
    }
}
