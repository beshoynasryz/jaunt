import Manager from "../../models/Manager.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Place from "../../models/Place.js";
import Booking from "../../models/Booking.js";
import Rating from "../../models/Rating.js";

export const managerIndex = async (req, res, next) => {
  try {
    let bookings = await Booking.find({place:req.session.owner.place._id}).populate("user").populate('place');
   
    let userRates = await Rating.find({
      place: req.session.owner.place._id,
      rater: 'user',
    }).populate('user').populate("booking").limit(4).exec();
    

    res.render("admin/manager/index", {
      layout: "./admin/layouts/main",
      owner: req.session.owner,
      bookings: bookings,
      userRates: userRates,
    });
  } catch (err) {
    next(err);
  }
};
export const managerRequest = async (req, res, next) => {
  try {
    let bookings = await Booking.find({
      place: req.session.owner.place._id,
    }).populate("user");

    res.render("admin/manager/managerRequest", {
      layout: "./admin/layouts/main",
      owner: req.session.owner,
      bookings: bookings,
    });
  } catch (err) {
    next(err);
  }
};
export const managerFeedBacks = async (req, res, next) => {
  try {
    let ratings = await Rating.find({
      place: req.session.owner.place._id,
    }).populate('user').populate("booking");
    

//     const newRatings = await ratings.map(async (item) => {
//       let rating = await Rating.findOne({
//         booking: item.booking,
//         rater: 'place',
//       }).populate('user').populate("booking");
      
//       const isRated = rating != null
//       item.isRated = isRated;
//       return item;
//     });
// console.log(newRatings);

    res.render("admin/manager/managerFeedBacks", {
      layout: "./admin/layouts/main",
      owner: req.session.owner,
      ratings: ratings,
    });
  } catch (err) {
    next(err);
  }
}; 

async function updateRatings(item) {
  let rating = await Rating.findOne({
    booking: item.booking,
    rater: 'place',
  }).populate('user').populate("booking");
  
  const isRated = rating != null
  item.isRated = isRated;
  console.log(isRated);
  return item;
}

export const rendermanagerView = async (req, res, next) => {
  try {
    // If the user is loggedin
    if (req.session.authId && req.session.authId !== req.session.owner?._id) {
      res.redirect("/admin/auth/sign-in");
    }
    const places = await Place.find({
      owner_id: req.session.owner._id,
    }).populate("manager");
    const managers = await Manager.find({ owner_id: req.session.owner._id });
    res.render("admin/manager/manager", {
      layout: "./admin/layouts/main",
      owner: req.session.owner,
      places: places,
      managers: managers,
    });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    console.log(req.body);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const { image } = req.files;
    const path = "/uploaded-images-2/";
    const filePath = "./public" + path;
    const fileName = Date.now() + image.name;
    const fullPath = filePath + Date.now() + image.name;

    await image.mv(fullPath);
    const imagePath = path + fileName;

    const newManager = new Manager({
      managername: req.body.managername,
      email: req.body.email,
      phone: req.body.phone,
      image: imagePath,
      password: hash,
      place: req.body.place,
      owner: req.session.owner,
    });
    await newManager.save();
    res.redirect("back");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const manager = await Manager.findOne({ email: req.body.email });
    if (!manager) return next(createError(404, "email not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      manager.password
    );

    if (!isPasswordCorrect) return next(createError(400, "Wrong password !"));

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
      access_token: token,
    };

    req.session.authId = ownerResponse._id;
    req.session.manager = ownerResponse;
    console.log("logged in", ownerResponse);

    //respond in html
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .redirect("/admin");
  } catch (err) {
    next(err);
  }
};
   