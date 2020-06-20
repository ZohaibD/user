const UserSchema = require('./../model/user')
const HashPassword = require('./../helper/hashpassword')
const jwtService = require('./../helper/jwt-service')
exports.List = async function (req, res) {
      console.log('List all users API called ', req.body)
      try {
            const users = await UserSchema.find();
            return res.stauts(200).send({ message: "found successfull", result: user })

      } catch (err) {
            return res.stauts(400).send({ message: "error finding user in db", error: err })
      }

}
exports.Create = async function (req, res) {
      console.log('Signup called ', req.body)
      pwd = await HashPassword.hashPassword(req.body.password);
      try {
            const user = new UserSchema({
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  email: req.body.email,
                  password: pwd
            })
            const result = await user.save();
            console.log('Result after db call is ', result)
            return res.stauts(201).send({ message: "Added successfull", result: result })
      } catch (err) {
            console.log("Error is ", err)
            return res.stauts(400).send({ message: "error adding user in db", error: err })

      }
}
exports.Login = async function (req, res) {
      console.log('Login called ', req.body)

      try {
            UserSchema.findOne({ email: req.body.email }, async (err, user) => {
                  if (err) throw err
                  match = await HashPassword.verify(req.body.password, user.password)
                  console.log('Match after comparing verify ', match)
                  if (match) {
                        console.log('Successfully login. ' + match);
                        const token = jwtService.genToken(user.email, user.firstName, user.lastName, process.env.JWT_KEY, process.env.JWT_EXPIRE_TIME)
                        return res.stauts(200).send({ message: "user found", token })

                  } else {
                        console.log('not valid user: ' + match);
                        return res.stauts(400).send({ message: "error email/password incorrect"})
                  }
            });

      } catch (err) {
            return res.stauts(400).send({ message: "error in pwd/email", error: err })

      }
}

