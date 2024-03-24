const express = require('express')
const router = express.Router();
const UserSchema = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

//ROUTE:1 create a user POST "/api/auth/createUser". No login required

router.post('/createUser',
    body('name', "name must be greater 4 checator").isLength({ min: 3 }),
    body('email', "please enter a valid email").isEmail(),
    body('password', "password must be 5 characters").isLength({ min: 5 }),
    async (req, res) => {
        let success = false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        try {
            const data0 = await UserSchema.findOne({ email: req.body.email })
            if (data0) {
                res.status(409).json({ success: false, errors: "sorry a user with this email already exist" })
            }
            else {
                const salt = await bcrypt.genSalt(10)
                const securedPassword = await bcrypt.hash(req.body.password, salt)
                const data = await UserSchema({
                    name: req.body.name,
                    password: securedPassword,
                    email: req.body.email
                })
                const user = await data.save()
                const UserID = { id: user.id }
                const authToken = jwt.sign(UserID, "process.env.JWT_SECRET")
                res.send({ success: true, authToken,"user":user })
            }
            
        } catch (error) {
            res.send({ success: false, error })
        }
    })
    
    //ROUTE:2 login user POST "/api/auth/login". No login required
    router.post('/login',
    body('email', "Enter a valid email").isEmail(),
    body('password', "password can't be blank ").exists(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        const { email, password } = req.body
        try {
            let userExist = await UserSchema.findOne({ email })
            console.log("ssss",userExist)
            if (!userExist) {
                return res.status(401).json({ success: false, error: "Please try login correct credentials" })
            }
            const passwordCompare = await bcrypt.compare(password, userExist.password)
            if (!passwordCompare) {
                return res.status(401).json({ success: false, error: "Please enter a valid password" })
            }
            else {
                const UserID = { id: userExist.id }
                const authToken = jwt.sign(UserID, "Welcome To RBR Group")
                res.send({ success: true, authToken,"user":userExist })
            }
        } catch (error) {
            res.send(error)
        }
    })

//ROUTE:3 get loggedin user detail POST "/api/auth/getUser". login required

router.post('/getUser', fetchuser, async (req, res) => {
    try {
        const UserID = req.userId
        const user = await UserSchema.findById(UserID).select("-password")
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})
module.exports = router