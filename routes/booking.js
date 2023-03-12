import  express  from "express"
import { createBooking ,updatedStatus} from "../controllers/admin/booking.js";

const router = express.Router();

// user
router.post('/create-booking', createBooking)
// you can use this endpoint to cancel a booking from the mobile app just send { status: "canceled"}
router.post('/update-status/:id', updatedStatus)

export default router 