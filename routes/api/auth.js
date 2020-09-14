const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
// const config = require('config');
// const { check, validationResult } = require('express-validator');

const User = require('../../model/User');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', async (req, res) => {
  try {
    const user = await User.find().select();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const { email, password } = req.body;
     
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.json({ "message":"!Invalid Email Address or Password","status":400 });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.json({ "message":"!Invalid Email Address or Password","status":400 });
      }

      const payload = {
       user
      };

      jwt.sign(
        payload,
        'secret',
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ "message":"Successfully logged in","token":token,"userInfo":payload,"status":200 });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;