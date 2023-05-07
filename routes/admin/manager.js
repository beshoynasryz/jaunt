import  express  from "express" 
import { rendermanagerView, create } from "../../controllers/admin/manager.js";

const router =express.Router();

router.get('/', rendermanagerView);
router.post('/create', create);

export default router

