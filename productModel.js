const mongoose=require("mongoose");

mongoose.pluralize(null);

const productSchema=mongoose.Schema({
    prodid:String,
    title:String,
    price:String,
    category:Array,
    compid:String,
    sid:Array
});

const productModel=mongoose.model("product",productSchema,"product");
module.exports=productModel;