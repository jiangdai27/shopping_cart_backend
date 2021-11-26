const jwt = require("jsonwebtoken");
const jwtconfig = require("../config.json").jwt;
const SECRET = jwtconfig.secret;
const { HttpErrorException } = require("../common/error");
async function verify(req, res,next) {
  try{
    const token = req.headers["authorization"].replace("Bearer ", "");
    let decoded = jwt.verify(token, SECRET);
    res.locals.userid = decoded.userid;
    res.locals.purchaseId = decoded.purchaseId;
    next();
  }
  catch(err){
    console.log(err);
    return res.send(new HttpErrorException("INVAILD_TOKEN"));
  }
}
module.exports=verify;