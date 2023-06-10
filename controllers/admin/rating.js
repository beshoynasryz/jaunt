import Booking from "../../models/Booking.js";
import Place from "../../models/Place.js";
import Rating from "../../models/Rating.js";

export const index = async (req, res, next) => {
  try {
    // TODO:: get feedback
  } catch (err) {
    next(err);
  }
};

export const rate = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.body.booking_id }).populate('user').populate('place');

    if (!booking)
    return next(createError(400, "No booking found with this id"));

    const rate = new Rating({
      rate: req.body.rate,
      rateServices: req.body.rateServices,
      comment: req.body.comment,
      rater: req.body.rater,
      booking: req.body.booking_id,
      user: booking.user._id,
      place: booking.place._id,
    });
    await rate.save();   
    const place = await Place.findById(booking.place._id);
    if(place.ratings?.length > 0){
     
        place.ratings.push(rate._id)
    } else {
       
        place.ratings = [rate._id];
    }
    await Place.updateOne({ _id: booking.place._id },
    { $set: {
        ratings: place.ratings
      } 
    })

    if (req.headers["accept"] !== "application/json") {
      res.redirect("back");
    } else {
      res.status(200).json({ mag: "Rating has been added", rate: rate });
    }
  } catch (err) {
    next(err);
  }
};
