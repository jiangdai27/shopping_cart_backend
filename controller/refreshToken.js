const RefreshToken = require("../model").refreshToken;
const { HttpErrorException } = require("../common/error");
const auth = require("../common/auth");
const jwt = require("jsonwebtoken");
const jwtconfig = require("../config.json").jwt;
const SECRET = jwtconfig.secret;
async function refreshToken(req, res) {
    const { refreshToken } = req.body;
    if (refreshToken == null) {
        return res.send(new HttpErrorException("INVALID_TOKEN"));
    }
    try {
        let data = await RefreshToken.search(refreshToken);
        if (!data) {
            return res.send(new HttpErrorException("INVALID_TOKEN"));
        }
        const { username, userid, purchaseId } = jwt.verify(refreshToken, SECRET);
        console.log("aaaa",username,userid);
        let token = await auth.tokenGenerate({ name:username, id:userid, pid:purchaseId }, 12800);
        let response = {
            token,
            expires_in: 12800,
        };
        console.log("cc",response);
        return res.send(response);
    } catch (err) {
        return res.send(err);
    }
};
module.exports = refreshToken;