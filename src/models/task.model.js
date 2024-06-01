const mongoose = require("mongoose");
const {TASK_STATUS} = require("../common/enum");
const {Schema} = mongoose
const ObjectId = Schema.Types.ObjectId
const TaskSchema = new Schema({
    title:{
        type:String
    },
    description:{
        type:String,
        default:null
    },
    status:{
        type:String,
        enum:[
            TASK_STATUS.PENDING,
            TASK_STATUS.DONE,
        ],
        default: TASK_STATUS.PENDING
    },
    dueDate:{
        type:Date,
        default:null
    },
    user_id:{
        type:ObjectId,
        ref:"user",
        index: true
    }

},{ timestamps: true})

TaskSchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
    }
})

const TaskModel = mongoose.model("task",TaskSchema)
module.exports = TaskModel