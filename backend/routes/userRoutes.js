import express from "express";
const router = express.Router()
import { authUser, registerUser, getUserProfile } from '../controllers/userControler.js'
import { protect } from '../middlewares/authMiddleware.js'


router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)



export default router; 