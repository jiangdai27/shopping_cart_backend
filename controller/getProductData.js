const Product = require("../model").Product;
async function getProductData(req,res) {
   try{
    let productId = req.query.id;
    let result = await Product.list(productId ? productId : null);

    return res.send(result);
   }
   catch(err){
     return res.send(err);
   }
  };
  module.exports=getProductData;