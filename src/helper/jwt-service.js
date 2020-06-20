const jwt = require('jsonwebtoken')

const genToken = (email , firstName,lastName, secret_key , expire_time)=>{
    const token = jwt.sign(
        {
            email:email,
            firstName:firstName,
            lastName:lastName
        },
        secret_key,
        {
            expiresIn:expire_time
        }
        )
        return token
}
const verifyToken = (req ,res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        jwt.verify(token,process.env.JWT_KEY)
        next();

    }catch(error){
        res.status(401).json({
            message:"Auth failed"
        })
    }
} 

exports.genToken = genToken
exports.verifyToken = verifyToken