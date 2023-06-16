import Place from "../models/Place.js";

export const index =async (req, res, next) => {
    try {

        let placeCountAdmin = await Place.find();
        res.render('index', { layout: './admin/layouts/guest' , placeCountAdmin:placeCountAdmin.length }
        );
    } catch(err){
        next(err)
    }
}
