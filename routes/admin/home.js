import  express  from "express"
import { index } from "../../controllers/admin/home.js";

const router = express.Router();

router.get('/admin', index);

export default router 