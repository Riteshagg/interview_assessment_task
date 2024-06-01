const {check} = require("express-validator");
const {TASK_STATUS} = require("../common/enum");

const AddOrUpdateTaskValidation=[
    check('title').notEmpty().withMessage((value, { req, location, path }) => {
        return req.msg.TitleRequired;
    }),
    check('status').isIn([TASK_STATUS.DONE,TASK_STATUS.PENDING]).withMessage((value, { req, location, path }) => {
        return req.msg.StatusInvalid;
    }),
    check('status').notEmpty().withMessage((value, { req, location, path }) => {
        return req.msg.StatusRequired;
    }),
];

module.exports = {
    AddOrUpdateTaskValidation
}