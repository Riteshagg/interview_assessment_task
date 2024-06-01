const UsersModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const {USER_ROLE, PROPERTY_STATUS} = require("../common/enum");
const mongoose = require("mongoose");
class User {

    userFindOne = async (query) => {
        try {
            return await UsersModel.findOne(query)
        } catch (error) {
            throw error
        }
    }
    userFind = async (query) => {
        try {
            return await UsersModel.aggregate([
                {
                    $match:query
                },
            ])
        } catch (error) {
            throw error
        }
    }
    create = async (payload) => {
        try {
            const salt = await bcryptjs.genSalt(10);
            if (payload['password']) {
                payload['password'] = await bcryptjs.hashSync(payload['password'], salt);
            }
            return await UsersModel.create(payload);

        } catch (error) {
            throw error
        }
    }





}
module.exports = new User()