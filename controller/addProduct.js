const Product = require("../model").Product;
async function addProduct(req, res) {
    try {
        const data = req.body;
        let results = await Promise.all(data.map(async (obj) => {
            let res = await Product.add(obj);
            return res;
        }));
        return res.send(results);
    }
    catch (err) {
        console.log(err);
        return res.send(err);
    }
}
module.exports = addProduct;