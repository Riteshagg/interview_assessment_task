const authenticateController = require("../controllers/authenticate.controller");
const taskController = require("../controllers/task.controller");
const express = require("express");
const router = express.Router();
const AUTH_MIDDLEWARE = require('../middlewares/auth.middleware')
const validation = require('../validations')
const Message = require("../middlewares/validation.error.middleware")

router.post("/auth/login", validation.UserValidation.LoginValidate, Message.errorResponse, authenticateController.login)
router.post("/auth/signup",validation.UserValidation.SignupValidation, Message.errorResponse, authenticateController.signup)

router.post('/tasks',AUTH_MIDDLEWARE.verifyAuth,validation.TaskValidation.AddOrUpdateTaskValidation, Message.errorResponse,taskController.AddOrUpdateTask);
router.get('/tasks',AUTH_MIDDLEWARE.verifyAuth, taskController.getTask);
router.get('/tasks/:id',AUTH_MIDDLEWARE.verifyAuth,taskController.getTaskOne);
router.put('/tasks/:id',AUTH_MIDDLEWARE.verifyAuth,validation.TaskValidation.AddOrUpdateTaskValidation, Message.errorResponse,taskController.AddOrUpdateTask);
router.delete('/tasks/:id',AUTH_MIDDLEWARE.verifyAuth,taskController.DeleteTask);

module.exports = router