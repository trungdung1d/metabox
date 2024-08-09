const express = require("express")
const userController = require("../controllers/userController")

let router = express.Router()

let initWebRoutes = (app) => {
    router.post('/api/v1/register', userController.handleRegister)
    router.post('/api/v1/login', userController.handleLogin)
    router.post('/api/v1/active', userController.activateAccount)

    return app.use("/", router);
}

module.exports = initWebRoutes