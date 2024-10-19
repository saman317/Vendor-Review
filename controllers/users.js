const express = require("express");
const router = express.Router();

const User= require("../models/user.js")

//Index
router.get("/", async (req,res)=> {
    try{
    const allUsers= await User.find();
    let vendors = []

    allUsers.forEach((user)=>{
        console.log(user.vendors)
        vendors = [...vendors,...user.vendors]
        //copy all the old vendors and the users vendors in

        console.log(vendors)


    })
    
     res.render("user/index.ejs", {vendors})
    }catch(error){
        console.log(error)
        res.redirect("/")

    }

})

//Show
router.get("/vendors/:vendorId", async (req, res) => {
    const pageOwner = await User.findById(req.params.userId);
    // .id is a mongoose method to find a subdocument by its id

    
    res.render("user/show.ejs", {pageOwner});
  });














module.exports= router;