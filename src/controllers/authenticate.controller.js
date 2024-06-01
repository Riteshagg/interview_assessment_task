const {Users,Session} = require("../services");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth.middleware")
const jwt = require("jsonwebtoken");
const error = require("../common/errors");
const { USER_ROLE, APPROVE_STATUS}=require("../common/enum")

exports.login= async (req,res,next)=>{
    const {email,password}=req.body;

    try {
        var data = await Users.userFind({
            $and:[
                {email: email},
                {role:USER_ROLE.USER}
            ]});
        var user = data[0];
        if(user){
            // if user is blocked then can't able to the login
            if(user.is_blocked){
                return res.status(error.status.UnprocessableEntity).json({
                    message:req.msg.UserBlockedByAdmin
                });
            }

            if (bcrypt.compareSync(password, user.password)) {
                const token = auth.generateAccessToken({id:user._id,role:user.role});
                await Session.create({access_token:token,user_id:user._id})
                return res.status(error.status.OK).send({
                    message: req.msg.Success,
                    data: user,
                    access_token:token,
                })
            }else {
                return res.status(error.status.UnprocessableEntity).json({
                    message:req.msg.InvalidCredentials
                });
            }
        }else{
            return res.status(error.status.UnprocessableEntity).json({
                message:req.msg.InvalidCredentials
            });
        }
    }catch (e){
        return res.status(error.status.InternalServerError).json({
            message:e.message
        })
    }
}

exports.signup=async (req,res,next)=>{
    try {
        const  user =await Users.create(req.body);
        return res.status(error.status.OK).send({
            message: req.msg.Success,
            data: user,
        })
    }catch (e){
        return res.status(error.status.InternalServerError).json({
            message:req.msg.SomethingWentWrong
        })
    }
}

exports.logout=async (req,res,next)=>{
    var user_id = req.user.id;
    var access_token = req.user.access_token;
    await Session.sessionDeleteOne({user_id:user_id,access_token:access_token});
    return res.status(error.status.OK).json({
        message:req.msg.Logout,

    })
}