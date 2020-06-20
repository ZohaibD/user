const express =require('express')
const routes  = express.Router()
const user = require('./../controller/user')

routes.route('/users')
.get(user.List)
routes.route('/signup')
.post(user.Create)
routes.route('/login')
.post(user.Login)


module.exports = routes