import  express  from "express"
import { createBooking, getUserBookings } from "../controllers/booking.js";

const router = express.Router();

// user
router.post('/create-booking', createBooking)
router.get('/get-user-bookings/:id', getUserBookings)

export default router 