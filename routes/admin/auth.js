import  express  from "express"
import { login, register, renderRegisterView, renderLoginView, logout } from "../../controllers/admin/auth.js";

const router =express.Router();

router.get('/sign-up', renderRegisterView);
router.get('/sign-in', renderLoginView);

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)


router.get('/', function(req, res){
    res.render('index');
});
export default router
