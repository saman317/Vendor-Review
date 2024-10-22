const mongoose= require("mongoose");

//subschemas


const vendorSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        
    },

    recommend: {
        type:Boolean, default: false,
        required: true,
    },

    priceRange: {
        type: String,
    },

    onTime: {
        type:Boolean, default:false,
        required:true
    },

    serviceInfo:{
        type: String,
        
    },


    

})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },

      vendors: [vendorSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User