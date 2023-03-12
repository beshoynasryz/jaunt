import  express  from "express"
import { getOwnerBookings, updatedStatus } from "../../controllers/admin/booking.js";

const router = express.Router();


router.get('/owner-bookings', getOwnerBookings)
// you can use this endpoint to cancel a booking from the mobile app just send { status: "canceled"}
router.post('/update-status/:id', updatedStatus)

export default router 