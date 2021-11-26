//const redis = require("../common/redis");
const AuthToken = require("../model").AuthToken;
const jwt = require("jsonwebtoken");
const jwtconfig = require("../config.json").jwt;
const SECRET = jwtconfig.secret;

const tokenGenerate = async function (data,token_expire_time) {
  console.log("bbbb",data);
  const token = jwt.sign({ username: data.name, userid: data.id, purchaseId:data.pid }, SECRET, {
    expiresIn: token_expire_time,
  });
  return token;
};
module.exports = { tokenGenerate };
