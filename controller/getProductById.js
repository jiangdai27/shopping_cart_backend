const Product = require("../model").Product;
async function getProductById(req, res) {
    try {
        let result = [];
        let param = req.body;
        await Promise.all(
            param.map(async (obj) => {
                let res = await Product.list(obj);
                result.push(...res);
            })
        );
        return res.send(result);
    }
    catch (err) {
        return res.send(err);
    }
};
module.exports = getProductById;