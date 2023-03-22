import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../../utils/error.js"
import Owner from "../../models/Owner.js"
import Booking from "../../models/Booking.js"
import Place from "../../models/Place.js"


// export const getOwnerBookings = async (req,res,next)=>{
//   // If the user is loggedin
//   if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
//       res.redirect('/admin/auth/sign-in');
//   }

//   let bookings = await Booking
//       .find({ owner_id: req.session.owner._id})
//       .populate('user');

//   if(req.params.id){
//       bookings = await Booking 
//       .find({ place: req.params.id })  
//       .populate('user'); 
//   }

//   if(req.session.owner.isAdmin) {
//       bookings = await Booking.find().populate('user');
//   } 

//   res.render('admin/bookings/index', {
//       layout: './admin/layouts/main', 
//       bookings: bookings, 
//       owner: req.session.owner 
//   });
// }
export const renderManageBranchesBookingView =async (req, res, next) => {
  try {
      // If the user is loggedin
      if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
          res.redirect('/admin/auth/sign-in');
      }

      let leatesPlaces = await Place
       .find({ owner_id: req.params.id });

      const selectedowner = await Owner.findById(req.params.id);
      res.render('admin/ownerbookings/managebranchesbooking',
        { 
          layout: './admin/layouts/main',
          owner: req.session.owner,
          selectedowner: selectedowner,
          leatesPlaces:leatesPlaces
        }
      ); 
       
  } catch(err){
      next(err)
  }
}


export const renderCompaniesView =async (req, res, next) => {
  try {
      // If the user is loggedin
      if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
          res.redirect('/admin/auth/sign-in');
      }
      
      const owners = await Owner.find();
      res.render('admin/companie/companies',  
        { 
          layout: './admin/layouts/main',
          owner: req.session.owner,
          owners: owners,
        }
      ); 
       
  } catch(err){
      next(err)
  }
}

export const renderBranchesBookingView =async (req, res, next) => {
  try {
      // If the user is loggedin
      if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
          res.redirect('/admin/auth/sign-in');
      }

     let bookings = await Booking
            .find({ owner_id: req.session.owner._id})
            .populate('user');
      
        if(req.params.id){
            bookings = await Booking 
            .find({ place: req.params.id })  
            .populate('user'); 
           
        }
      
        if(req.session.owner.isAdmin) {
            bookings = await Booking.find().populate('user');
        } 
      
        let leatesPlaces = []

        if(req.session.owner.isAdmin) {
            leatesPlaces = await Place.find();
           
        } 


      // const owners = await Owner.find();

      res.render('admin/ownerbookings/branchesbooking',
        { 
          layout: './admin/layouts/main',
          owner: req.session.owner,
          bookings: bookings, 
          leatesPlaces :leatesPlaces,
          // owners: owners,
        }
      ); 
       
  } catch(err){
      next(err)
  }
}

export const renderRegisterView =async (req,res,next)=>{
  try {
      // If the user is loggedin
      if (req.session.authId && (req.session.authId === req.session.owner?._id)) {
          res.redirect('/admin');
      }
      res.render('admin/auth/sign_up', { layout: './admin/layouts/guest' });
  } catch(err){
      next(err)
  }
}

export const renderLoginView =async (req, res, next) => {
  try {
      // If the user is loggedin
      if (req.session.authId && (req.session.authId === req.session.owner?._id)) {
          res.redirect('/admin');
      }
      res.render('admin/auth/sign_in', { layout: './admin/layouts/guest' });
  } catch(err){
      next(err)
  }
}

export const rendercontactView =async (req, res, next) => {
  try {
      // If the user is loggedin
      if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
          res.redirect('/admin/auth/sign-in');
      }
      res.render('admin/auth/pages-contact',  
        { 
          layout: './admin/layouts/main',
          owner: req.session.owner
        }
      );
       
  } catch(err){
      next(err)
  }
}
export const renderPartnerView =async (req, res, next) => {
  try {
      // If the user is loggedin
      if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
          res.redirect('/admin/auth/sign-in');
      }
      
      const owners = await Owner.find();
      res.render('admin/partner/partners',  
        { 
          layout: './admin/layouts/main',
          owner: req.session.owner,
          owners: owners,
        }
      );
       
  } catch(err){
      next(err)
  }
}
export const renderPartnermanageView =async (req, res, next) => {
  try {
      // If the user is loggedin
      if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
          res.redirect('/admin/auth/sign-in');
      }
      
      const owners = await Owner.find();
      res.render('admin/ownerbookings/partnermanagerequst',  
        { 
          layout: './admin/layouts/main',
          owner: req.session.owner,
          owners: owners,
        }
      );
       
  } catch(err){
      next(err)
  }
}
export const renderBookingwayView =async (req, res, next) => {
  try {
      // If the user is loggedin
      if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
          res.redirect('/admin/auth/sign-in');
      }
      
     
      res.render('admin/ownerbookings/bookingway',  
        { 
          layout: './admin/layouts/main',
          owner: req.session.owner,
         
        }
      ); 
       
  } catch(err){
      next(err)
  }
}


export const profile =async (req, res, next) => {
  try {
      // If the user is loggedin
      if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
        res.redirect('/admin/auth/sign-in');
      }
      res.render('admin/auth/profile', { 
        layout: './admin/layouts/main', 
        owner: req.session.owner
      });
  } catch(err){
      next(err)
  }
}

export const register = async (req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
      
        const { image } = req.files;
        const path = "/uploaded-images-2/";
        const filePath = './public' + path
        const fileName = Date.now() + image.name;
        const fullPath = filePath +  Date.now() + image.name;

        await image.mv(fullPath);
        const imagePath = path + fileName

        const newOwner =new Owner({
          ownername:req.body.ownername,
          companyname:req.body.companyname,
          type:req.body.type,
          email:req.body.email,
          type:req.body.type,
          phone:req.body.phone,
          image:imagePath,
          password:hash
        })
        await newOwner.save()

        if(req.headers['content-type'] !== 'application/json'){
          //respond in html
          res.redirect('/admin/auth/sign-in');
        } else {
          res.status(200).json({ "mag": "Owner has been created" })
        } 
    }catch(err){
        next(err)
    }
}

export const login = async (req,res,next)=>{
  try {
      const owner = await Owner.findOne({ email: req.body.email });
      if (!owner) return next(createError(404, "email not found!"));
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        owner.password
      );
      
      if (!isPasswordCorrect)
        return next(createError(400, "Wrong password !"));

      const token = jwt.sign(
        { id: owner._id, isAdmin: owner.isAdmin },
        process.env.JWT
      );

      const ownerResponse = {
        _id: owner._id,
        ownername: owner.ownername,
        companyname: owner.companyname,
        type: owner.type,
        email: owner.email,
        phone: owner.phone,
        image: owner.image,
        isAdmin: owner.isAdmin,
        access_token: token
      };
      
      req.session.authId = ownerResponse._id;
      req.session.owner = ownerResponse;

     
        //respond in html
        res.cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .redirect('/admin');
      

    } catch (err) {
      next(err);
    }
}

export const logout = async (req,res,next)=>{
  try {
      req.session.authId = null;
      req.session.owner = null;
      res.redirect('/admin/auth/sign-in');
    } catch (err) {
      next(err);
    }
}

export const updateOwner =async (req,res,next)=>{
  try {
      // TODO:: add update image when there is an image has been selected
      const updatedOwner = await Owner.findByIdAndUpdate(req.session.owner._id,{$set: req.body},{new:true})
      const ownerResponse = {
        _id: updatedOwner._id.toHexString(),
        ownername: updatedOwner.ownername,
        companyname: updatedOwner.companyname,
        type: updatedOwner.type,
        email: updatedOwner.email,
        phone: updatedOwner.phone,
        image: updatedOwner.image,
        isAdmin: updatedOwner.isAdmin,
        access_token: req.session.owner.access_token
      };

      req.session.owner = await ownerResponse;

      res.redirect('/admin/auth/profile');
  }
  catch(err){
      next(err);
  }
}

export const changePassword =async (req,res,next)=>{
  try{
    
    if (req.body.password !== req.body.cPassword)
      return next(createError(400, "Confirm password is wrong!"));

    const owner = await Owner.findById({ _id: req.session.owner._id });
  
    const isPasswordCorrect = await bcrypt.compare(
      req.body.currentPassword,
      owner.password
    );
    

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password!"));

      
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    await Owner.updateOne(
      { _id: req.session.owner._id },
      { $set: { password: hash } },
      { new: true }
    );

    req.session.authId = null;
    req.session.owner = null;
    res.redirect('/admin/auth/sign-in');
  }
  catch(err){
      next(err);
  }
}