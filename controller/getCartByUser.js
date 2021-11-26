const purchaseInfo = require("../model").purchaseInfo;
async function getCartByUser(req, res) {
  try {
    let result = await purchaseInfo.getCart(`${res.locals.userid}`);
    res.send(result);
  }
  catch (err) {
    return res.send(err);
  }
};
module.exports = getCartByUser;