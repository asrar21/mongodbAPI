const express = require('express');
const router = express.Router();
let ObjectId =require("mongodb").ObjectId

const Order = require('../../model/Order.js');
router.get(
    '/',
    
    async (req, res) => {
      
     
      try {
        let id=ObjectId(req.query.createdBy)
        let order=await Order.find({createdBy:id})
       
       if(order){
          res.json({"message":`success`,"data":order,"status":200});
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
    '/ordersofadmin',
    
    async (req, res) => {
      try {
       let order=await Order.find()
       
       if(order){
        res.json({"message":`success`,"data":order,"status":200});
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
    
    const { name,price,productId,quantity,orderBy,createdBy,orders} = req.body;
    try {
    let result=[];
     for(let i=0;i<orders.length;i++){
      
     let order=await Order.save({name:orders[i].name,price:orders[i].price,productId:orders[i].productId,quantity:orders[i].quantity,orderBy:orderBy,createdBy:orders[i].createdBy})
     if(order){
     result.push({"message":"created order"})
     }
  }
     
     if(result.length>0){
        res.json({"message":`your order is placed  successfully created`,"status":200});
     }
     else{
        res.json({"message":"unable to place an order","status":400});
     }
    } catch (err) {
      res.json({"message":`${err}`,"status":400});
    }
  }
);

module.exports = router;