import  express  from "express"
import { changePassword, login, register, updateUser } from "../controllers/auth.js";

const router =express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/updateUser/:id', updateUser)
router.post('/changePassword/:id', changePassword)

export default router
