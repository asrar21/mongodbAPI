const express = require('express');
const router = express.Router();
let ObjectId =require("mongodb").ObjectId

const Product = require('../../model/Product.js');
router.get(
    '/',
    
    async (req, res) => {
      
      
      try {
        // console.log("req.query.createdBy",req.query.createdBy)
        let id=ObjectId(req.query.createdBy)
        
       let product=await Product.find({createdBy:id})
       
       if(product){
          res.status(200).send({"message":`success`,"data":product});
       }
       else{
          res.status(500).send({"message":"Something went wrong"});
       }
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );

router.post(
  '/',
  
  async (req, res) => {
    
    const { name,price,location,image,createdBy} = req.body;
    try {
     let product=new Product({
        name,price,location,image,createdBy
     })
     let saveProduct=await product.save()
     if(saveProduct){
        res.status(200).send({"message":`${product.name} is successfully created`});
     }
     else{
        res.status(500).send({"message":"Something went wrong"});
     }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;