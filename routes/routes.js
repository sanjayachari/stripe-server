const { Router } = require("express");
const { test , checkout} = require("../controller/authController");

const routes = Router();

routes.get('/api/v1/test', test)
routes.post('/api/v1/checkout', checkout)

module.exports  = routes;