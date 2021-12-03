const express = require('express');
const router = express.Router();
router.use(express.json());


const productModel = require("../models/productModel");

router.get('/', (req, res) => res.send('Welcom to Product!!'))

router.get('/productlist', async (req,res)=>{
    const prodList = await productModel.find();

    if(prodList.length === 0){
        return res.json({ data: "product data no found"});
    }

    return res.json({ data: prodList});
}); 

router.post('/productlistBaseOnCompany/:cname', async (req,res)=>{
    
    const compModel = require("../models/companyModel");
    const cidList = await compModel.find({ compname: req.params.cname });

    if(cidList.length===0){
        return res.json({ data: "company data no found"});
    }else{
        const prodList = await productModel.find({ compid: cidList[0].compid });

        if(prodList.length === 0){
            return res.json({ data: "product data no found"});
        }
    }
    return res.json({ data: prodList});   
}); 

router.post('/productlistBaseOnSeller/:sname', async (req,res)=>{
    
    const sellModel = require("../models/sellerModel");
    const sidList = await sellModel.find({ name: req.params.sname });

    if(sidList.length === 0 ){
        return res.json({ data: "seller data no found"});
    }else{
        const prodList = await productModel.find({ sid: sidList[0].sellerId });

        if(prodList.length === 0){
            return res.json({ data: "product data no found"});
        }
    }
    return res.json({ data: prodList});   
});

router.post('/addProduct', async(req,res)=>{
    const { newproduct } = req.body;
    productModel.create(newproduct);
    return res.json({ data: "Data Added Sucefully" });
});

router.delete("/deleteProduct/:pid", async(req,res)=>{
    const deleteProd = await productModel.findOneAndDelete({ 
        prodid: req.params.pid, 
    });
    return res.json({ data: "data deleted Sucefully" });
});

router.put("/update/:pid", async (req,res)=>{
    const pid = req.params.pid;
    const title = req.body.title;
    const price = req.body.price;
    const cat = req.body.category;
    const comp = req.body.compid;
    const sid = req.body.sid;    

    const updateProduct = await productModel.findOneAndUpdate(
        { prodid: pid },
        { title: title , price: price , category: cat , compid: comp , sid: sid},
        {new: true}
    );
    return res.json({data: "Data Updated"});
});

module.exports=router;
