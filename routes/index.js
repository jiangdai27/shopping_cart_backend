var express = require('express');
var router = express.Router();
const signup = require("../controller/signup");
const getProductData = require("../controller/getProductData");
const getProductById = require("../controller/getProductById");
const getCartByUser = require("../controller/getCartByUser");
const authLogin = require("../controller/authLogin");
const addProduct = require("../controller/addProduct");
const addcart = require("../controller/addcart");
const refreshToken = require("../controller/refreshToken");
const verify = require("../controller/verify");
router.post('/signup', signup);
router.post('/authLogin',authLogin);
router.post("/refreshtoken", refreshToken);
router.get('/getProductData',getProductData);
router.post('/getProductById',getProductById);
router.post('/addProduct',addProduct);
router.get('/getCartByUser',verify,getCartByUser);
router.post('/addcart',verify,addcart);

module.exports = router;