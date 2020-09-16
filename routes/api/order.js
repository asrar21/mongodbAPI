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
        let response=await Order.find( { "orders.createdBy": id})
       
        // console.log("response",response)
       let result=[];
  for(let i=0;i<response.length;i++){
      let id=ObjectId(response[i].orderBy)
      let userInfo=await User.find({_id:id})
      let orders=response[i].orders
      for(let j=0;j<orders.length;j++){
      // console.log(userInfo)
      result.push({"productid":orders[j].productid ,"name":orders[j].name,"price":orders[j].price,"contact":userInfo[0].cellnumber,"buyerName":userInfo[0].name,"qty":orders[j].qty})
      // console.log("result",result)
      }
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
   
    if(orders===[] || typeof orders===undefined || orders===null){
      return  res.json({"message":'Please Provide Order List',"status":400});
    }
      
     let order=new Order({orderBy:orderBy,orders:orders})
    let orderPlaced=await order.save()
     
     
     if(orderPlaced){
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