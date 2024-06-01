require('dotenv').config();
const TaskModel = require("../models/task.model");
class Task {

    getAll = async (query={}) => {
        try {
            return await TaskModel.find(query)
        } catch (error) {
            throw error
        }
    }
    FindOne = async (query={}) => {
        try {
            return await TaskModel.findOne(query)
        } catch (error) {
            throw error
        }
    }

    DeleteOne = async (query) => {
        try {
            return await TaskModel.deleteOne(query)
        } catch (error) {
            throw error
        }
    }

    createOrUpdate = async (payload) => {
        try {
            if(payload.id){
                return await TaskModel.updateOne({_id:payload.id,user_id:payload.user_id},payload,{new:true})
            }else {
                return await TaskModel.create(payload);
            }

        } catch (error) {
            throw error
        }
    }
}

module.exports = new Task()