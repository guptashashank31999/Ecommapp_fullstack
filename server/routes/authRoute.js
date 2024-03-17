const express = require("express");
const { registerController, loginController, testController, forgotPassword } = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");


const router = express.Router();



router.post('/register' , registerController)
router.post('/login', loginController);

//Forgot password
router.post("/forgot-password" , forgotPassword)

// --test routes---
router.get('/test', requireSignIn, isAdmin, testController)

router.get('/user-auth' , requireSignIn , (req , res) => {
    res.status(200).send({
        ok : true
    })
})

//admin route

router.get('/admin-auth' , requireSignIn , isAdmin, (req , res) => {
    res.status(200).send({
        ok : true
    })
})



module.exports = router