const express = require('express');
const router = express.Router();
let ObjectId =require("mongodb").ObjectId

const Product = require('../../model/Product.js');
const User = require('../../model/User');

router.post(
  '/',
  
  async (req, res) => {
    
    const {contentValue} = req.body;
    try {
    //  let response=[];
    // console.log("ContentValue",contentValue)
    let regex=regexFromString("/^"+contentValue+"/")
    var query = { name: regex };
    // console.log("query",query)
     let result=[]
     
        let  response=await Product.find(query)
          // console.log(result);
    
    
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

module.exports = router;

function regexFromString (string) {
  var match = /^\/(.*)\/([a-z]*)$/.exec(string)
  return new RegExp(match[1], match[2])
}