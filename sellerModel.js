const mongoose=require("mongoose");

mongoose.pluralize(null);

const sellerSchema=mongoose.Schema({
    sellerId: String,
    name: String,
    pid:Array
});

const sellerModel=mongoose.model("seller",sellerSchema,"seller");
module.exports=sellerModel;