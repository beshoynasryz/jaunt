import  express  from "express"
import { createPlace, deletePlace, getPlace, updatePlace ,getOwnerPlaces,renderCreatePlaceView, updatedStatus, renderEditPlaceView, updatedPlace } from "../../controllers/admin/place.js";
import Place from "../../models/Place.js";
import { createError } from "../../utils/error.js";
import { verifyAdmin } from "../../utils/verifyToken.js";

const router =express.Router();

//create
router.post('/', verifyAdmin, createPlace)

//update
router.put('/:id',verifyAdmin, updatePlace)
//delete
router.get('/delete/:id', deletePlace)

    //get
router.get('/place-details/:id', getPlace)
    //getAll
// router.get('/',GetPlaces)
router.get('/owner-places',getOwnerPlaces)
router.post('/update-status/:id',updatedStatus)
router.get('/create-place',renderCreatePlaceView)
router.get('/edit-place/:id',renderEditPlaceView)
router.post('/update-place/:id',updatedPlace)
// router.get('/countByCity',countByCity)
// router.get('/countByArea',countByArea) //elmnt2a like zamlek,nozha

// router.get('/countByType',GetPlaces)

export default router 