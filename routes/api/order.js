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
          res.status(200).send({"message":`success`,"data":order});
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

  router.get(
    '/ordersofadmin',
    
    async (req, res) => {
      try {
       let order=await Order.find()
       
       if(order){
          res.status(200).send({"message":`success`,"data":order});
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
    
    const { name,price,productId,quantity,orderBy,createdBy} = req.body;
    try {
     let order=new Order({
        name,price,productId,quantity,orderBy,createdBy
     })
     let saveOrder=await order.save()
     if(saveOrder){
        res.status(200).send({"message":`your order is placed ${order.name} is successfully created`});
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