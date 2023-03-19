import  express  from "express"
import { getManageBookings, getOwnerBookings, updatedStatus } from "../../controllers/admin/booking.js";

const router = express.Router();

router.get('/manage-bookings', getManageBookings)

router.get('/owner-bookings/:id?', getOwnerBookings)
// you can use this endpoint to cancel a booking from the mobile app just send { status: "canceled"}
router.post('/update-status/:id', updatedStatus)

export default router 