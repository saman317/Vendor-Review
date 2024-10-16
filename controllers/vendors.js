const express = require("express");
const router = express.Router();
//imports model
const User=require("../models/user.js");

//I.N.D.U.C.E.S
//Index /users/userId/vendors GET
//list the vendors
//req.session means we are signed in
router.get("/", async (req,res)=>{
    const user= await User.findById(req.session.user._id);
    const vendors= user.vendors;
    if(req.session.user){
        res.render("vendors/index.ejs", {vendors})
    }else{
        res.render("index.ejs")
    }
});
//New /users/:userId/vendors/new GET
router.get("/new", (req,res)=>{
    res.render("vendors/new.ejs")
})
//Create /users/:userId/vendors POST
router.post("/", async(req,res)=>{
    try{
        const currentUser = await User.findById(req.session.user._id);
        currentUser.vendors.push(req.body);

        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/vendors`)

    }catch(error){
        console.log(error);
        res.redirect("/");

    }
})
//SHOW /users/:userId/vendors/:vendorId GET
router.get("/:vendorId", async(req,res)=>{
    const currentUser = await User.findById(req.session.user._id);
    const vendor = currentUser.vendors.id(req.params.vendorId);
    res.render("vendors/show.ejs", {vendor})

})
//Edit / users/:userId/vendors/:vendorId/edit GET
router.get(":vendorId/")
//Update /users/:userId/vendors/:vendorId PUT
//Delete /users/:userId/vendors/:vendorId Delete

//Comments
//Create /users/:userId/vendors/comments POST
//Edit / users/:userId/vendors/:vendorId/comments/:commentId/edit GET
//Update /users/:userId/vendors/:vendorId/comments/:commentId PUT
//Delete /users/:userId/vendors/:vendorId/comments/:commentId Delete










module.exports = router;