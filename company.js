const express = require('express');
const router = express.Router();
router.use(express.json());


const companyModel = require("../models/companyModel");

router.get('/', (req, res) => res.send('Welcom to Company!!'))

router.get('/companylist', async (req,res)=>{
    const userList = await companyModel.find();

    if(userList.length === 0){
        return res.json({ data: "no company data found"});
    }

    return res.json({ data: userList});
}); 

router.post('/companylistBaseOnprodname/:pname', async (req,res)=>{
    
    const productModel = require("../models/productModel");
    const pidList = await productModel.find({title: req.params.pname});
    
    if(pidList.length===0){
        return res.json({ data: "product data no found"});
    }else{
        const userList = await companyModel.find({prodid: pidList[0].prodid });
        if(userList.length===0){
            return res.json({ data: "company data no found"});
        }
    }
    return res.json({data: userList});
}); 


router.post('/addCompany', async(req,res)=>{
    const { newcompany } = req.body;
    companyModel.create(newcompany);
    return res.json({ data: "Data Added Sucefully" });
});

router.delete("/deleteCompany/:uname", async(req,res)=>{
    const deleteComp = await companyModel.findOneAndDelete({ 
        compname: req.params.uname, 
    });
    return res.json({ data: "data deleted Sucefully" });
});

router.put("/update/:compid", async (req,res)=>{
    const cid = req.params.compid;
    const cname = req.body.compname;
    const pid = req.body.prodid;

    const updateCompany = await companyModel.findOneAndUpdate(
        { compid: cid },
        { compname: cname , prodid: pid },
        {new: true}
    );

    return res.json({data: "Data Updated"});
});

module.exports=router;
