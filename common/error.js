const ErrCode = {
    DB_ERROR : "E00001",
    NOT_FOUND : "E00002",
    INVALID_TOKEN: "E00003",
}
const ErrMessage = {
    "E00001" : "DB error",
    "E00002" : "Not found",
    "E00003" : "Invalid access token"
}


class HttpErrorException{
    constructor(err){
        this.statusCode = 400;
        this.errCode = ErrCode[err];
        this.message = ErrMessage[this.errCode];
    }
}
module.exports ={HttpErrorException}