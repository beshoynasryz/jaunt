import Manager from "../../models/Manager.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Place from "../../models/Place.js";


export const rendermanagerView =async (req, res, next) => {
    try {
        // If the user is loggedin
        if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
            res.redirect('/admin/auth/sign-in');
        }
        
        res.render('admin/manager/manager',  
          {
            layout: './admin/layouts/main', 
            owner: req.session.owner,
          } 
        );
         
    } catch(err){
        next(err)
    }
  }
  
  
export const create = async (req,res,next)=>{
    try {
        console.log(req.body)
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
      
        const { image } = req.files;
        const path = "/uploaded-images-2/";
        const filePath = './public' + path
        const fileName = Date.now() + image.name;
        const fullPath = filePath +  Date.now() + image.name;

        await image.mv(fullPath);
        const imagePath = path + fileName

        const newManager =new Manager({
          managername:req.body.managername,
          email:req.body.email,
          phone:req.body.phone,
          image:imagePath,
          password:hash,
          place:req.body.place,
          owner: req.session.owner 
        })
        await newManager.save()
        res.redirect('back');
    }catch(err){
        next(err)
    }
}

export const login = async (req,res,next)=>{
    try {
        const manager = await Manager.findOne({ email: req.body.email });
        if (!manager) return next(createError(404, "email not found!"));
    
        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          manager.password
        );
        
        if (!isPasswordCorrect)
          return next(createError(400, "Wrong password !"));
  
        const token = jwt.sign(
          { id: manager._id, isAdmin: owner.isAdmin },
          process.env.JWT
        );
  
        const ownerResponse = {
          _id: manager._id,
          managername: owner.managername,
          email: owner.email,
          phone: owner.phone,
          image: owner.image,
          isAdmin: owner.isAdmin,
          access_token: token
        };
        
        req.session.authId = ownerResponse._id;
        req.session.manager = ownerResponse;
        console.log('logged in', ownerResponse)
       
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