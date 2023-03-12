import  express  from "express"
import { createPlace, deletePlace, getPlace, updatePlace ,getOwnerPlaces,renderCreatePlaceView} from "../../controllers/admin/place.js";
import Place from "../../models/Place.js";
import { createError } from "../../utils/error.js";
import { verifyAdmin } from "../../utils/verifyToken.js";

const router =express.Router();

//create
router.post('/', verifyAdmin, createPlace)

//update
router.put('/:id',verifyAdmin, updatePlace)
//delete
router.delete('/:id',verifyAdmin, deletePlace)

    //get
router.get('/find/:id', getPlace)
    //getAll
// router.get('/',GetPlaces)
router.get('/owner-places',getOwnerPlaces)
router.get('/create-place',renderCreatePlaceView)
// router.get('/countByCity',countByCity)
// router.get('/countByArea',countByArea) //elmnt2a like zamlek,nozha

// router.get('/countByType',GetPlaces)

export default router 