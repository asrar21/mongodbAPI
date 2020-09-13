const express = require('express');
const router = express.Router();
// const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const config = require('config');
// const { check, validationResult } = require('express-validator');
// const normalize = require('normalize-url');

const User = require('../../model/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const { name, email, password,type,cellnumber } = req.body;

    try {

      if(typeof email===undefined || !validateEmail(email) ||email===""){
        return  res.json({"message":'Please Provide Valid Email Address',"status":400});
      }
      if(typeof name===undefined || name===""){
        return  res.json({"message":'Please Provide Your name',"status":400});
      }
      if(typeof password===undefined || password===""){
        return  res.json({"message":'Please Provide Your password',"status":400});
      }
      if(typeof cellnumber===undefined || cellnumber==="" || !Number.isInteger(JSON.parse(cellnumber))){
        return  res.json({"message":'Please Provide Your cellnumber',"status":400});
      }
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({"message":'User already exists',"status":400});
      }

      
      user = new User({
        name,
        email,
        password,
        type,
        cellnumber 
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        'secret',
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ "message":"User created","token":token,"status":200 });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}