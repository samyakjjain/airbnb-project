const express=require("express");
const router = express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");

const userController=require("../controllers/users.js");

router.route("/signup")
.post(wrapAsync(userController.signup))
.get((req,res)=>{
    res.render("users/signup.ejs");
});

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{

    failureRedirect:'/login',
    failureFlash:true,

}),userController.login);

router.get("/logout",userController.logout);

module.exports=router;
