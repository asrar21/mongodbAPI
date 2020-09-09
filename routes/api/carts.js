const express = require('express');
const router = express.Router();

let ObjectId =require("mongodb").ObjectId
const Cart = require('../../model/Cart.js');
router.get(
    '/',
    
    async (req, res) => {
      
      
      try {
        let id=ObjectId(req.query.user)
        
       let cart=await Cart.find({user:id})
       
       if(cart){
          res.status(200).send({"message":`success`,"data":cart});
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
    
    const { name,price,quantity,user,createdBy} = req.body;
    try {
     let cart=new Cart({
        name,price,quantity,user,createdBy
     })
     let saveCart=await cart.save()
     if(saveCart){
        res.status(200).send({"message":`${cart.name} is successfully saved on your cart`});
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