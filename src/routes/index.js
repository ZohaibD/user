const express =require('express')
const routes  = express.Router()

const userRoutes = require('./user')

routes.use('/api/user', userRoutes)


module.exports = routes