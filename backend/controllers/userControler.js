import asyncHandler from "express-async-handler";
import generateToken from "../Utils/generateToken.js";
import User from "../models/userModel.js";


// @desc   Auth user & get token
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    console.log(user);
    if (user.isActive === true) {
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            res.status(401)
            throw new Error('Invaild Email or Password')
        }
    } else {
        res.status(401)
        throw new Error('Currently you are blocked from Admin')
    }


});


// @desc   Register a new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email })


    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })

    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }

});

// @desc   Get User Profile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
});


// @desc   Get all Users
// @route  GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    if (users) {
        res.json(users)
    } else {
        res.status(404)
        throw new Error('Users Not Found')
    }
});

//@desc  block user
//@route PUT/api/users/:id
//@access private/admin
const blockUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    console.log(user)
    if (user) {
        if (user.isAdmin) {
            res.json({ message: 'cannot block admin', updadatedUser })
        } else {
            user.isActive = !user.isActive
            const updadatedUser = await user.save()
            if (user.isActive == true) {
                res.json({ message: 'user unblocked', updadatedUser })
            } else {
                res.json({ message: 'user is blocked', updadatedUser })
            }
        }
    }
})

// @desc   Delete User
// @route  DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({ message: "User removed" })
    } else {
        res.status(404)
        throw new Error('Users Not Found')
    }
});

//@desc  get a single user by id
//@route GET/api/users/:id
//@access private/admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('user not found')
    }
})

// @desc   Get user by ID
// @route  GET /api/users/:id
// @access Private/Admin
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('Users Not Found')
    }
});


// @desc   Update user
// @route  PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updateduser = await user.save()

        res.json({
            _id: updateduser._id,
            name: updateduser.name,
            email: updateduser.email,
            isAdmin: updateduser.isAdmin
        })

    } else {
        res.status(404)
        throw new Error('Users Not Found')
    }
});


export { authUser, registerUser, getUserProfile, getUsers, deleteUser, getUserById, updateUser, blockUser }