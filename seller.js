const express = require('express');
const router = express.Router();
router.use(express.json());


const sellerModel = require("../models/sellerModel");

router.get('/', (req, res) => res.send('Welcome to seller!!'))

router.get('/sellerlist', async (req,res)=>{
    const selList = await sellerModel.find();

    if(selList.length === 0){
        return res.json({ data: "seller data no found"});
    }

    return res.json({ data: selList});
});

router.post('/sellerlistBaseOnprodname/:pname', async (req,res)=>{
    
    const productModel = require("../models/productModel");
    const pidList = await productModel.find({title: req.params.pname});

    if(pidList.length === 0){
        return res.json({ data: "product data no found"});
    }else{
        const selList = await sellerModel.find({pid: pidList[0].prodid});

        if(selList.length === 0){
            return res.json({ data: "seller data no found"});
        }
    }
   return res.json({ data: selList});
});

router.post('/addSeller', async(req,res)=>{
    const { newseller } = req.body;
    sellerModel.create(newseller);
    return res.json({ data: "Data Added Sucefully" });
});

router.delete("/deleteSeller/:sid", async(req,res)=>{
    const deleteSeller = await sellerModel.findOneAndDelete({ 
        sellerId: req.params.sid, 
    });
    return res.json({ data: "data deleted Sucefully" });
});

router.put("/update/:sid", async (req,res)=>{
    const sid = req.params.sid;
    const name = req.body.name;
    const pid = req.body.pid;

    const updateSeller = await sellerModel.findOneAndUpdate(
        { prodid: pid },
        { sid: sid , name: name , pid: pid },
        {new: true}
    );
    return res.json({data: "Data Updated"});
});

module.exports=router;
