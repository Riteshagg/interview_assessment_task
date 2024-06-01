const {check} = require('express-validator');
const Users = require("../services/users");


const LoginValidate = [
    check('email').notEmpty().withMessage((value, { req, location, path }) => {
        return req.msg.EmailRequired;
    }),
    check('password').notEmpty().withMessage((value, { req, location, path }) => {
        return req.msg.PasswordRequired;
    }),

];

const SignupValidation = [
    check('first_name').notEmpty().withMessage((value, { req, location, path }) => {
        return req.msg.FirstNameRequired;
    }),
    check('last_name').notEmpty().withMessage((value, { req, location, path }) => {
        return req.msg.LastNameRequired;
    }),
    check('country_code').notEmpty().withMessage((value, { req, location, path }) => {
        return req.msg.CountryCodeRequired;
    }),
    check('phone_number').notEmpty().withMessage((value, { req, location, path }) => {
        return req.msg.PhoneNumRequired;
    }),
    check('phone_number').custom((value,{req}) => {
        return Users.userFindOne({phone_number:value,country_code:req.body.country_code}).then(user => {
            if (user) {
                return Promise.reject(req.msg.PhoneNumExist);
            }
        });
    }),
    check('email').notEmpty().withMessage((value, { req, location, path }) => {
        return req.msg.EmailRequired;
    }),
    check('email').isEmail().withMessage((value, { req, location, path }) => {
        return req.msg.EmailFormatNotValid;
    }),
    check('email').custom((value,{req}) => {
        return Users.userFindOne({email:value}).then(user => {
            if (user) {
                return Promise.reject(req.msg.EmailAlreadyUsed);
            }
        });
    }),

    check('password').notEmpty().withMessage((value, { req, location, path }) => {
        return req.msg.PasswordRequired;
    }).isLength({min:8}).withMessage((value, { req, location, path }) => {
        return req.msg.PasswordLength;
    }).trim(),

];

module.exports = {
    LoginValidate,
    SignupValidation
}