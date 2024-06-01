const mongoose = require("mongoose");
const {Schema} = mongoose
const ObjectId = Schema.Types.ObjectId
const SessionSchema = new Schema({
    user_id:{
        type:ObjectId,
        ref:"user"
    },
    access_token:{
        type:String,
        required:true
    }

},{timestamps:true})


SessionSchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
    }
})

const Session = mongoose.model("session",SessionSchema)
module.exports = Session