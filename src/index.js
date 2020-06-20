require('dotenv').config()
const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');

const { CLIENT_ORIGIN } = require('./config/config')
const routes = require('./routes')


const app = express()
app.use(bodyParser.json())
app.use(cors({ 
  origin: CLIENT_ORIGIN 
})) 

app.use('/', routes)



mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true},
    (err)=>{
        if(err) throw err
        console.log("Connect to Db")
    })
app.listen(process.env.PORT || 8081, () => console.log('server is running on port' , process.env.PORT))