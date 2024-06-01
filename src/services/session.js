require('dotenv').config();
const SessionModel = require("../models/session.model");
const UsersModel = require("../models/user.model");

class Session {

    sessionFindOne = async (query) => {
        try {
            return await SessionModel.findOne(query)
        } catch (error) {
            throw error
        }
    }

    sessionFindAndCount = async (query)=>{
        try {
            return SessionModel.find(query).count();
        } catch (error) {
            throw error
        }
    }

    sessionDeleteOne = async (query) => {
        try {
            return await SessionModel.deleteOne(query)
        } catch (error) {
            throw error
        }
    }



    create = async (payload) => {
        try {
            const sessionLimit = await this.sessionFindAndCount({user_id:payload.user_id});
            if(sessionLimit>=process.env.TOTAL_DEVICE_SUPPORT){
                await this.sessionDeleteOne({user_id:payload.user_id})
            }
            return await SessionModel.create(payload);

        } catch (error) {
            throw error
        }
    }


}
module.exports = new Session()