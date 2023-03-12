import  express  from "express"
import { getPlace, getPlaces } from "../controllers/place.js";


const router = express.Router();

router.get('/', getPlaces)
router.get('/:id', getPlace)

export default router 