import  express  from "express" 
import { rendermanagerView, create, managerIndex, managerRequest, managerFeedBacks, deleteManager } from "../../controllers/admin/manager.js";

const router =express.Router();

router.get('/', rendermanagerView);
router.post('/create', create);

router.get('/home', managerIndex);
router.get('/managerRequest', managerRequest);
router.get('/managerFeedBacks', managerFeedBacks);
router.get('/delete/:id', deleteManager);


export default router

