import { response } from "express"
import Manager from "../../models/Manager.js"
import Place from "../../models/Place.js"
import Rating from "../../models/Rating.js"


export const createPlace =async (req,res,next)=>{
    try {
    var receptionHours = new Array()
    if(req.body.sunday){
        receptionHours.sunday = {
            from: req.body.sundayFrom,
            until: req.body.sundayUntil
        }
    }   
    if(req.body.monday){
        receptionHours.monday = {
            from: req.body.mondayFrom,
            until: req.body.mondayUntil
        }
    }   
    if(req.body.tuesday){
        receptionHours.tuesday = {
            from: req.body.tuesdayFrom,
            until: req.body.tuesdayUntil
        }
    }   
    if(req.body.wendesday){
        receptionHours.wendesday = {
            from: req.body.wendesdayFrom,
            until: req.body.wendesdayUntil
        }
    }    
    if(req.body.thursday){
        receptionHours.thursday = {
            from: req.body.thursdayFrom,
            until: req.body.thursdayUntil
        }
    }   
    if(req.body.friday){
        receptionHours.friday = {
            from: req.body.fridayFrom,
            until: req.body.fridayUntil
        }
    }   
    if(req.body.saturday){
        receptionHours.saturday = {
            from: req.body.saturdayFrom,
            until: req.body.saturdayUntil
        }
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
    
    
    const newPlace =  new Place (req.body)
   
        const savedPlace = await newPlace.save()
        console.log(savedPlace,'abdo mota');
        
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
        await Place.findByIdAndDelete({ _id: req.params.id })
        res.redirect('back');
      }
      catch(err){
        next(err)
      }
      
}
export const getPlace =async (req,res,next)=>{
   
    try{
        const place = await Place.findById(req.params.id).populate('manager');
        
        let ratings = await Rating.find({
        place: req.params.id,
        }).populate('user').populate("booking");

        res.render('admin/places/place-details', { 
            layout: './admin/layouts/main', 
            ratings: ratings,
            place: place,
            owner: req.session.owner 
          });
    }
    catch(err){
        next(err)
    }
}

export const getOwnerPlaces =async (req,res,next)=>{
    try {
        // If the user is loggedin
        if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
          res.redirect('/admin/auth/sign-in');
        }
        
    const places = await Place.find({ owner_id: req.session.owner._id,status:'approved'}).populate('manager')
        const ownerCafes = await Place.find({ type: 'cafe'}).populate('manager')
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


export const renderEditPlaceView = async (req,res,next)=>{
    try {
        // If the user is loggedin
      if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
          res.redirect('/admin/auth/sign-in');
        }

        const place = await Place.findById(req.params.id)
        const managers = await Manager.find({ owner: req.session.owner._id})

        res.render('admin/places/edit', { 
          layout: './admin/layouts/main',
          place: place,
          managers: managers,
          owner: req.session.owner 
        });
    }
    catch(err){
       next(err)
    }
}

export const updatedPlace =async (req,res,next)=>{
    try {
        var receptionHours = new Array()
        if(req.body.sunday){
            receptionHours.sunday = {
                from: req.body.sundayFrom,
                until: req.body.sundayUntil
            }
        }   
        if(req.body.monday){
            receptionHours.monday = {
                from: req.body.mondayFrom,
                until: req.body.mondayUntil
            }
        }   
        if(req.body.tuesday){
            receptionHours.tuesday = {
                from: req.body.tuesdayFrom,
                until: req.body.tuesdayUntil
            }
        }   
        if(req.body.wendesday){
            receptionHours.wendesday = {
                from: req.body.wendesdayFrom,
                until: req.body.wendesdayUntil
            }
        }    
        if(req.body.thursday){
            receptionHours.thursday = {
                from: req.body.thursdayFrom,
                until: req.body.thursdayUntil
            }
        }   
        if(req.body.friday){
            receptionHours.friday = {
                from: req.body.fridayFrom,
                until: req.body.fridayUntil
            }
        }   
        if(req.body.saturday){
            receptionHours.saturday = {
                from: req.body.saturdayFrom,
                until: req.body.saturdayUntil
            }
        } 
        if (receptionHours.length) {
            req.body.receptionHours = receptionHours
        }
        
        const images = req.files?.images;
        if (images) {
            var imagesArray = []
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
        }

        const menuimages = req.files?.menuimages;
        if (menuimages) {
            var imagesArray = []
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
        
            
        }
        const place = await Place.findOne({ _id: req.params.id });
        delete place.service1;
        delete place.service2;
        delete place.service3;
        delete place.service4;
        delete place.service5;
        delete place.service6;
        delete place.service7;
        delete place.service8;
        
        await place.updateOne(
            { $set: req.body },
            { new: true }
        );
        res.redirect('back');
    } 
    catch(err){
        next(err);
    }
}
 