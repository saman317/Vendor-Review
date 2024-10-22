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
router.get("/all", async (req,res)=> {
    try{
    const allUsers= await User.find();
    let vendors = []

    allUsers.forEach((user)=>{
        console.log(user.vendors)
        vendors = [...vendors,...(user.vendors.map(v=>({...v._doc,userId:user._id})))]
        //copy all the old vendors and the users vendors in
        //update every vendor so it has a user

        console.log(vendors)


    })
    
     res.render("user/index.ejs", {vendors})
    }catch(error){
        console.log(error)
        res.redirect("/")

    }

})
//New /users/:userId/vendors/new GET
router.get("/new", (req,res)=>{
    res.render("vendors/new.ejs")
})
//Create /users/:userId/vendors POST
router.post("/", async(req,res)=>{
    try{
        if (req.body.recommend  === "on") {
            req.body.recommend = true;
          } else {
            req.body.recommend = false;
          };

          if (req.body.onTime  === "on") {
            req.body.onTime = true;
          } else {
            req.body.onTime = false;
          }
        const currentUser = await User.findById(req.session.user._id);
        currentUser.vendors.push(req.body);
        //updates to mongo db

        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/vendors`)

    }catch(error){
        console.log(error);
        res.redirect("/");

    }
})
//SHOW /users/:userId/vendors/:vendorId GET
router.get("/:vendorId", async(req,res)=>{
    const currentUser = await User.findById(req.userId);
    console.log(req.params)
    const vendor = currentUser.vendors.id(req.params.vendorId);
    res.render("vendors/show.ejs", {vendor})

})
//Edit / users/:userId/vendors/:vendorId/edit GET
router.get("/:vendorId/edit", async(req,res)=>{
    const currentUser = await User.findById(req.session.user._id);
    const vendor = currentUser.vendors.id(req.params.vendorId);
    res.render("vendors/edit.ejs", {vendor})
})
//Update /users/:userId/vendors/:vendorId PUT
router.put("/:vendorId", async(req,res)=>{
    console.log(req.body)
    try{
        if (req.body.recommend  === "on") {
            req.body.recommend = true;
          } else {
            req.body.recommend = false;
          };

          if (req.body.onTime  === "on") {
            req.body.onTime = true;
          } else {
            req.body.onTime = false;
          }
    const currentUser = await User.findById(req.session.user._id);
    const vendor = currentUser.vendors.id(req.params.vendorId);
    //call set on subdocument to update it
    vendor.set(req.body);

    await currentUser.save();
    res.redirect(
        `/users/${req.session.user._id}/vendors/${req.params.vendorId}`
    )

    }catch(error){
        console.log(error);
        res.redirect("/");
    }
})
//Delete /users/:userId/vendors/:vendorId Delete
router.delete("/:vendorId", async(req,res)=>{
    try{
        const currentUser = await User.findById(req.session.user._id);
        currentUser.vendors.id(req.params.vendorId).deleteOne();
        await currentUser.save();

        res.redirect(`/users/${req.session.user._id}/vendors`)

    }catch(error){
        console.log(error);
        res.redirect("/");
    }
})







module.exports = router;