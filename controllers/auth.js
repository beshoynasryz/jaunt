
import User from "../models/User.js"
import bcrypt from "bcryptjs"


export const login = async (req,res,next)=>{
  try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return next(createError(404, "email not found!"));
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return next(createError(400, "Wrong password or name!"));
  
      // const token = jwt.sign(
      //   { id: user._id, isAdmin: user.isAdmin },
      //   process.env.JWT
      // );
  
      // const { password, isAdmin, ...otherDetails } = user._doc;
      // res
      //   .cookie("access_token", token, {
      //     httpOnly: true,
      //   })
      //   .status(200)
      //   .json({ details: { ...otherDetails }, isAdmin });
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
}

export const register =async (req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
      
        
        const { image } = req.files;
        const path = "/uploaded-images-2/";
        const filePath = './public' + path
        const fileName = Date.now() + image.name;
        const fullPath = filePath +  Date.now() + image.name;

        await image.mv(fullPath);
        const imagePath = path + fileName

        const newUser =new User({
            name:req.body.name,
            email:req.body.email,
            image: imagePath,
            phone :req.body.phone,
            area :req.body.area,
            city :req.body.city,
            country :req.body.country,
            password:hash
        })

        await newUser.save()
        
        if(req.headers['content-type'] === 'application/json'){
          //respond in html
          res.redirect('/auth/sign-in');
        } else {
          res.status(200).json({ "mag": "User has been created", data: newUser })
        }
    }catch(err){
        next(err)
    }
}
 
export const updateUser =async (req,res,next)=>{
  try {
      // TODO:: add update image when there is an image has been selected
      const updateUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
     
     let userResponse =[]
     
       userResponse = {
        _id: updateUser._id.toHexString(),
        name: updateUser.name,
        email: updateUser.email,
        city: updateUser.city,
        phone: updateUser.phone,
        image: updateUser.image,
        country: updateUser.country,
        area: updateUser.area,

        // access_token: access_token
      };
      
    
      req.params.user = await userResponse;

     
     
     

      
      if(req.headers['content-type'] === 'application/json'){
        //respond in html
        res.redirect('/auth/sign-in');
      } else {
        res.status(200).json({ "mag": "User has been updated", data: updateUser })
      }
      // res.redirect('/admin/auth/profile');
      
  }
  catch(err){
      next(err);
  }
}

export const changePassword =async (req,res,next)=>{
  try{
    
    if (req.body.password !== req.body.cPassword)
      return next((400, "Confirm password is wrong!"));

    const user = await User.findById(req.params.id);
  
    if (!user)
      return next((400, "Wrong password!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    
    if (!isPasswordCorrect)
      return next((400, "Wrong password!"));

      
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    await User.updateOne({_id:req.params.id},{ $set: { password: hash } },{ new: true });

    res.status(200).json({ "mag": "User has been updated" })
  }
  catch(err){
    console.log(err);
      next(err);
  }
}