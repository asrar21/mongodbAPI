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
          res.json({"message":`success`,"data":product,"status":200});
       }
       else{
          res.json({"message":"data not found","data":[],"status":400});
       }
      } catch (err) {
        res.json({"message":`${err}`,"status":400});
      }
    }
  );
  router.get(
    '/allproducts',
    
    async (req, res) => {
      
      
      try {
        // console.log("req.query.createdBy",req.query.createdBy)
       
        
       let product=await Product.find()
       
       if(product){
          res.json({"message":`success`,"data":product,"status":200});
       }
       else{
          res.json({"message":"data not found","data":[],"status":400});
       }
      } catch (err) {
        res.json({"message":`${err}`,"status":400});
      }
    }
  );


router.post(
  '/',
  
  async (req, res) => {
    
    const { name,price,location,image,createdBy} = req.body;
    try {
      console.log("name",name)
      console.log("price",price)
      console.log("location",location)
      console.log("price",image)
      if(typeof name===undefined || name===""){
        return  res.json({"message":'Please Provide Your Food name',"status":400});
      }
      if(typeof location===undefined || location===""){
        return  res.json({"message":'Please Provide Your location',"status":400});
      }
      if(typeof image===undefined || image===""){
        return  res.json({"message":'Please Provide Your Food image',"status":400});
      }
      if(typeof price===undefined || price==="" || !Number.isInteger(price)){
        return  res.json({"message":'Please Provide Your price',"status":400});
      }
     let product=new Product({
        name,price,location,image,createdBy
     })
     let saveProduct=await product.save()
     if(saveProduct){
        res.json({"message":`${product.name} is successfully created`,"status":200});
     }
     else{
        res.json({"message":"Error while creating inserting","status":400});
     }
    } catch (err) {
      res.json({"message":`${err}`,"status":400});
    }
  }
);
router.put(
  '/',
  
  async (req, res) => {
    
    const { name,price,location,image,productId} = req.body;
    try {
      console.log("name",name)
      console.log("price",price)
      console.log("location",location)
      console.log("price",image)
      if(typeof name===undefined || name===""){
        return  res.json({"message":'Please Provide Your Food name',"status":400});
      }
      if(typeof location===undefined || location===""){
        return  res.json({"message":'Please Provide Your location',"status":400});
      }
      if(typeof image===undefined || image===""){
        return  res.json({"message":'Please Provide Your Food image',"status":400});
      }
      if(typeof price===undefined || price==="" || !Number.isInteger(price)){
        return  res.json({"message":'Please Provide Your price',"status":400});
      }
     Product.findByIdAndUpdate(
       productId ,
       { name:name,price:price,location:location,image:image} , {new: true},
      function( err, result ) {
          if ( err ){
            res.json({"message":`${err}`,"status":400});
          }
          if(result){
            res.json({"message":'Updated successfully',"status":200});
          }
      }
  );
     
} catch (err) {
  res.json({"message":`${err}`,"status":400});
    }
  }
);
module.exports = router;