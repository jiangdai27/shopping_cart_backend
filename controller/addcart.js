const purchaseInfo = require("../model").purchaseInfo;
async function addcart(req, res) {
    try {
        const product = req.body;
        await purchaseInfo.postCart(res.locals.userid, res.locals.purchaseId, product);
        return res.send({ "body": "success" });
    }
    catch (err) {
        return res.send(err);
    }

};
module.exports = addcart;