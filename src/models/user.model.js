const mongoose = require("mongoose");
const {Schema} = mongoose
const {USER_ROLE} = require("../common/enum")
const userSchema = new Schema({
    first_name:{
        type:String,
    },
    last_name:{
        type:String,
    },
    country_code:{
        type:String,
    },
    phone_number:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String,
    },
    is_blocked:{
        type:Boolean,
        default:false
    },
    status:{
        type:Boolean,
        default:false,
    },
    role:{
        type:String,
        enum:[
            USER_ROLE.SUB_ADMIN,
            USER_ROLE.ADMIN,
            USER_ROLE.USER,
        ],
        default: USER_ROLE.USER
    },

},{timestamps:true})

userSchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
        delete  returnObject.password
    }
})

const User = mongoose.model("user",userSchema)
module.exports = User