import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../../utils/error.js"
import Owner from "../../models/Owner.js"

export const renderRegisterView =async (req,res,next)=>{
  try {
      // If the user is loggedin
      if (req.session.loggedin) {
          res.redirect('/admin');
      }
      res.render('admin/auth/sign_up');
  } catch(err){
      next(err)
  }
}

export const renderLoginView =async (req, res, next) => {
  try {
      // If the user is loggedin
      if (req.session.loggedin) {
          res.redirect('/admin');
      }
      res.render('admin/auth/sign_in');
  } catch(err){
      next(err)
  }
}

export const register = async (req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
      
        const { image } = req.files;
        const path = "/uploaded-images/";
        const filePath = './public' + path
        const fileName = filePath +  Date.now() + image.name;

        await image.mv(fileName);
        const imagePath = path + fileName

        const newOwner =new Owner({
          ownername:req.body.ownername,
          companyname:req.body.companyname,
          email:req.body.email,
          type:req.body.type,
          phone:req.body.phone,
          image:imagePath,
          password:hash
        })
        await newOwner.save()

        if(req.accepts('json') !== undefined){
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
        return next(createError(400, "Wrong password or name!"));

      const token = jwt.sign(
        { id: owner._id, isAdmin: owner.isAdmin },
        process.env.JWT
      );

      req.session.loggedin = true;

      const ownerResponse = {
        _id: owner._id,
        ownername: owner.ownername,
        companyname: owner.companyname,
        email: owner.email,
        phone: owner.phone,
        type: owner.type,
        isAdmin: owner.isAdmin,
        access_token: token
      };

      if(req.accepts('json') !== undefined){
        //respond in html
        res.cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .redirect('/admin');
      } else {
        res.status(200).json({ data: ownerResponse });
      }

    } catch (err) {
      next(err);
    }
}

export const logout = async (req,res,next)=>{
  try {
      req.session.loggedin = false;
      res.redirect('/admin/auth/sign-in');
    } catch (err) {
      next(err);
    }
}
