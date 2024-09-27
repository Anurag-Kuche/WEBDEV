const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const{saveRedirectUrl}=require("../middleware.js");
const userController=require("../controllers/users.js")

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));



router
    .route("/login")
    .get(userController.renderloginForm)
    .post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.login);


router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
    });
    req.flash("you are logged out!!");
    res.redirect("/listings");
});    
module.exports=router;