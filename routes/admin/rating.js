import  express  from "express"
import { index, rate } from "../../controllers/admin/rating.js";

const router = express.Router();

router.get('/', index);
router.post('/rate', rate);

export default router

