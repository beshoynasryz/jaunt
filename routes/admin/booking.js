import  express  from "express"
import { getOwnerBookings } from "../../controllers/admin/booking.js";

const router = express.Router();


router.get('/owner-bookings', getOwnerBookings)

export default router 