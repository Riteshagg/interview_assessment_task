const jwt=require("jsonwebtoken");
require('dotenv').config();
const {Users,Session} = require("../services");
const error = require("../common/errors");
const {USER_ROLE}=require("../common/enum")
function generateAccessToken(user){
  return jwt.sign({data:user},process.env.SECRET_KEY,{
        expiresIn:'365d'
    })
}
async function verifyAuth (req, res, next) {
    const authHEader = req.headers["authorization"];
    const token = authHEader && authHEader.split(" ")[1];
    if (token == null) {
        return res.status(error.status.Unauthorized).json({
            message: req.msg.InvalidToken,
            status: error.status.Unauthorized
        })
    }
    if(authHEader.split(" ")[0]=="bearer") {
        var session= await Session.sessionFindOne({access_token:token})
        if(session) {
            jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
                if (err) return res.sendStatus(error.status.Unauthorized)
                const userData = await Users.userFindOne({_id:user.data.id})
                if(!userData){
                    return res.status(error.status.Unauthorized).json({
                        message: req.msg.Unauthorized,
                        status:error.status.Unauthorized
                    })
                }
                if(userData.is_blocked){
                    return res.status(error.status.Unauthorized).json({
                        message: req.msg.BlockedUser,
                        status:error.status.Unauthorized
                    })
                }
                req.user = user.data;
                req.user.access_token = token
                next()
            })
        }else {
            return res.status(error.status.Unauthorized).json({
                message: req.msg.Unauthorized,
                status:error.status.Unauthorized
            })
        }
    }else{
        return res.status(error.status.Unauthorized).json({
            message:req.msg.InvalidToken,
            status:error.status.Unauthorized
        })
    }
}


module.exports={
    generateAccessToken,
    verifyAuth,
}