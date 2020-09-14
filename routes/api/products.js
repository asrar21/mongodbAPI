const express = require('express');
const router = express.Router();
let ObjectId =require("mongodb").ObjectId

const Product = require('../../model/Product.js');
const User = require('../../model/User');
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
       
      
       
       let  response=await Product.find()
       // console.log(result);
 
  let result=[]
     // console.log("response",response)
 for(let i=0;i<response.length;i++){
     let id=ObjectId(response[i].createdBy)
     let userInfo=await User.find({_id:id})
     // console.log(userInfo)
     result.push({"productid":response[i]._id  ,"name":response[i].name,"price":response[i].price,"location":response[i].location,"contact":userInfo[0].cellnumber,"sellerName":userInfo[0].name,"image":response[i].image})
     // console.log("result",result)
}
if(result!==[]){
     res.json({"message":`success`,"data":result,"status":200});
  }
  else{
     res.status(500).send({"message":"query not Running","data":[],"status":400});
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
     
      if(typeof name===undefined || name===""){
        return  res.json({"message":'Please Provide Your Food name',"status":400});
      }
      if(typeof location===undefined || location===""){
        return  res.json({"message":'Please Provide Your location',"status":400});
      }
      if(typeof image===undefined || image===""){
        return  res.json({"message":'Please Provide Your Food image',"status":400});
      }
      if(typeof price===undefined || price==="" || price===null){
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
     
      if(typeof name===undefined || name===""){
        return  res.json({"message":'Please Provide Your Food name',"status":400});
      }
      if(typeof location===undefined || location===""){
        return  res.json({"message":'Please Provide Your location',"status":400});
      }
      if(typeof image===undefined || image===""){
        return  res.json({"message":'Please Provide Your Food image',"status":400});
      }
      if(typeof price===undefined || price==="" || price===null){
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