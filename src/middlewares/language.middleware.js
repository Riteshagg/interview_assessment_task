const L = require("../language/");
const error = require("../common/errors");
const { LANGUAGE }=require("../common/enum")
async function languageMiddleware(req, res, next){
    const lang = req.headers['accept-language'];
      if( lang && lang ==LANGUAGE.EN){
           req.msg = L.en

        } else{
            req.msg = L.en
        }
        next()
}

module.exports = {languageMiddleware}
