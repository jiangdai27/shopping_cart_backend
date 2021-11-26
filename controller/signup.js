const UserProfile = require("../model").UserProfile;
const purchaseInfo = require("../model").purchaseInfo;
const RefreshToken = require("../model").refreshToken;
const auth = require("../common/auth");
const uuid = require("uuid");
const { HttpErrorException } = require("../common/error");

async function signup(req, res) {
  try{
    const { username, email, password } = req.body;
    let result = await UserProfile.add(username, email, password);
    let pid = uuid.v4();
    await purchaseInfo.update(result.id, pid, {});
    let refreshToken = await auth.tokenGenerate({...result,pid},44800);
    await RefreshToken.add(result.id,refreshToken);
    let token = await auth.tokenGenerate({...result,pid},12800);
    
    let response = {
      token,
      expires_in: 12800,
      refreshToken
    };
    return res.send(response);
  }
  catch(err){
    console.log(err);
    return res.send(err);  
  }
}
module.exports=signup;