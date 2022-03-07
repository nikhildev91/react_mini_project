import express from "express";
import { blockUser } from "../controllers/userControler.js";
const router = express.Router()
import {
    authUser,
    registerUser,
    getUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
} from '../controllers/userControler.js'
import { protect, admin } from '../middlewares/authMiddleware.js'


router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/:id').delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)

router.route('/:id/block').get(protect, admin, getUserById).put(blockUser)



export default router; 