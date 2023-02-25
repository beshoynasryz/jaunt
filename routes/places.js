import  express  from "express"
import { createPlace, deletePlace, getPlace, GetPlaces, updatePlace } from "../controllers/place.js";
import Place from "../models/Place.js";
import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router =express.Router();

//create
router.post('/', verifyAdmin, createPlace)

//update
router.put('/:id',verifyAdmin, updatePlace)
//delete
router.delete('/:id',verifyAdmin, deletePlace)

    //get
router.get('/:id', getPlace)
    //getAll
router.get('/',GetPlaces)
    
    




export default router 