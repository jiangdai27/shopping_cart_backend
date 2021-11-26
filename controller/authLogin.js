const { HttpErrorException } = require("../common/error");
const UserProfile = require("../model").UserProfile;
const PurchaseInfo = require("../model").purchaseInfo;
const RefreshToken = require("../model").refreshToken;
const auth = require("../common/auth");
const uuid = require("uuid");
async function authLogin(req, res) {
    try {
        const { email, password } = req.body;
        let result = await UserProfile.userinfo(email, password);
        if (!result) {
            return res.send(new HttpErrorException("NOT_FOUND"));
        }
        let purchaseinfo = await PurchaseInfo.getCart(result.id);
        if (!purchaseinfo) {
            let pid = uuid.v4();
            await PurchaseInfo.update(result.id, pid, {});
        }
        let data = {
            name: result.name,
            id: result.id,
            pid: purchaseinfo ? purchaseinfo.purchase_id : pid,
        };
        if (result && purchaseinfo) {
            let token = await auth.tokenGenerate(data,12800);
            let refreshToken = await auth.tokenGenerate(data,44800);
            await RefreshToken.add(result.id,refreshToken);
            let response = {
                token,
                expires_in: 12800,
                refreshToken
            };
            console.log(response);
            return res.send(response);
        }
    } catch (err) {
        console.log(err);
        return res.send(err);
    }
};
module.exports = authLogin;
