 const bcrypt = require('bcrypt')
 const saltRound = 10

let hashPassword = (password) => {
    return new Promise(function (resolve, reject) {
        setTimeout(function(){
            bcrypt.genSalt(saltRound, (err,salt)=>{
                if(err) reject(err);
                bcrypt.hash(password,salt,(err,enPass)=>{
                    if(err) reject(err)
                    console.log('generated: ' + enPass);
                    resolve(enPass)
                })
            })
        },1000) 
    })
 }


 let verify = (entrPswd, enPswd) => {
     return new Promise (function(resolve,reject) {
        bcrypt.compare(entrPswd,enPswd, (err,result) =>  {
            if (err) reject(err)
            else resolve(result)
        })
     }) 
    }

 let test = (value) => {
    return new Promise(function (resolve, reject) {
        setTimeout(function(){
            if(Number.value)
                resolve('number')
            else
                reject('not number')
        },1000)
    })
    }

 exports.hashPassword = hashPassword
 exports.test = test
 exports.verify = verify