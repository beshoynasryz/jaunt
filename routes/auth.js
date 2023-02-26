import  express  from "express"
import { login, loginOwner, ownerRegister, register } from "../controllers/auth.js";

const router =express.Router();

router.post('/register',register)
router.post('/registerOwner',ownerRegister)
router.post('/loginOwner',loginOwner)
router.post('/login',login)

export default router
