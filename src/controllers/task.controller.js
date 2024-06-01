const error = require("../common/errors");
const {Task} = require("../services");

exports.AddOrUpdateTask= async (req,res,next)=> {
    try {
        req.body.user_id= req.user.id
        req.body.id = req.params.id
        var msg = req.msg.TaskCreated
        if(req.params.id){
             msg =req.msg.TaskUpdated
        }
        const data =  await Task.createOrUpdate(req.body)
        return res.status(error.status.OK).json({
            message:msg,
            data:data
        })
    }catch (e){
        return res.status(error.status.InternalServerError).json({
            message:e.message
        })
    }
}

exports.getTask= async (req,res,next)=> {
    try {
        const data = await Task.getAll({user_id:req.user.id});
        return res.status(error.status.OK).json({
            message:req.msg.Success,
            data:data
        })
    }catch (e){
        return res.status(error.status.InternalServerError).json({
            message:req.msg.SomethingWentWrong
        })
    }
}
exports.getTaskOne= async (req,res,next)=> {
    try {
        const data = await Task.FindOne({_id:req.params.id,user_id:req.user.id});
        return res.status(error.status.OK).json({
            message:req.msg.Success,
            data:data
        })
    }catch (e){
        return res.status(error.status.InternalServerError).json({
            message:req.msg.SomethingWentWrong
        })
    }
}
exports.DeleteTask= async (req,res,next)=> {
    try {
        await Task.DeleteOne({_id:req.params.id,user_id:req.user.id});
        return res.status(error.status.OK).json({
            message:req.msg.TaskDeleted,
        })
    }catch (e){
        return res.status(error.status.InternalServerError).json({
            message:req.msg.SomethingWentWrong
        })
    }
}