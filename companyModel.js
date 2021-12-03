const mongoose=require("mongoose");

mongoose.pluralize(null);

const companySchema=mongoose.Schema({
    compid:String,
    compname:String,
    prodid:Array
});

const companyModel=mongoose.model("company",companySchema,"company");
module.exports=companyModel;