const express = require('express');
const connectDB = require('./config/db');
// const path = require('path');
const cors =require('cors');
const bodyParser = require("body-parser");
const app = express();

// Connect Database
connectDB();

// Init Middleware
// app.use(express.json());
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
// app.use(function (req, res, next) {
//     //Enabling CORS 
//     res.header("Access-Control-Allow-Origin", "*");  
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization, api-token, x-channel");
//     next();
//   });
// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/carts', require('./routes/api/carts'));
app.use('/api/orders', require('./routes/api/order'));
app.use('/api/search', require('./routes/api/search'));

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   // app.get('*', (req, res) => {
//   //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   // });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));