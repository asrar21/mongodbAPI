const express = require('express');
const router = express.Router();
let ObjectId =require("mongodb").ObjectId

const Order = require('../../model/Order.js');
const User = require('../../model/User');
router.get(
    '/',
    
    async (req, res) => {
      
     
      try {
        let id=ObjectId(req.query.createdBy)
        let response=await Order.find({createdBy:id})
       
        
       let result=[];
  for(let i=0;i<response.length;i++){
      let id=ObjectId(response[i].orderBy)
      let userInfo=await User.find({_id:id})
      // console.log(userInfo)
      result.push({"productid":response[i].productId ,"name":response[i].name,"price":response[i].price,"contact":userInfo[0].cellnumber,"buyerName":userInfo[0].name,"quantity":response[i].quantity})
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
    
    const { orderBy,orders} = req.body;
    try {
    let result=[];
     for(let i=0;i<orders.length;i++){
      
     let order=new Order({name:orders[i].name,price:orders[i].price,productId:orders[i].productid,quantity:orders[i].qty,orderBy:orderBy,createdBy:orders[i].createdBy})
    let placedorder=await order.save()
     if( placedorder){
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