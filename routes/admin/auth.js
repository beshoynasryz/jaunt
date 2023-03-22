import  express  from "express"
import { login, register, renderRegisterView, renderLoginView, logout, profile, updateOwner,changePassword, rendercontactView, renderPartnerView, renderCompaniesView, renderBookingwayView, renderBranchesBookingView, renderPartnermanageView, renderManageBranchesBookingView } from "../../controllers/admin/auth.js";

const router =express.Router();



router.get('/pages-contact', rendercontactView);
router.get('/partners', renderPartnerView);
router.get('/companies', renderCompaniesView);
router.get('/ownerbookings', renderBookingwayView);
router.get('/branchesbooking', renderBranchesBookingView);
router.get('/partnermanagerequst/:id?', renderPartnermanageView);

router.get('/managebranchesbooking/:id', renderManageBranchesBookingView);



router.get('/sign-up', renderRegisterView);
router.get('/sign-in', renderLoginView);
router.get('/profile', profile);
router.post('/update-owner', updateOwner);
router.post('/change-password', changePassword);
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/', function(req, res){
    res.render('index');
});
export default router

