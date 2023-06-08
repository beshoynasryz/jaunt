import  express  from "express"
import { createBooking, getBooking, getUserBookings } from "../controllers/booking.js";

const router = express.Router();

// user
router.post('/create-booking', createBooking)
router.get('/get-user-bookings/:id', getUserBookings)
router.get('/bookings/:id', getBooking)

export default router 