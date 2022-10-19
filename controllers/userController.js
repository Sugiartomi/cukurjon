const { User, Queue } = require('../models')

// hasing password
const bcrypt = require('bcryptjs')
const verifyPassword = (pass, hashPass) => bcrypt.compareSync(pass, hashPass)

//create token
const jwt = require('jsonwebtoken')
const createToken = payload => jwt.sign(payload, "tomisugiarto")

class userController {
    static async loginHandler(req, res) {
        try {
            const { username, password } = req.body
            if(!username || !password) throw { name : "no_input"}
            let findUser = await User.findOne({where : {username}})
            if(!findUser) throw { name : "failedlogin"}
            let verify = verifyPassword(password, findUser.password)
            if(!verify) throw { name : "failedlogin"}
            else {
                const payload = {
                    id : findUser.id,
                    username : findUser.username,
                    role : findUser.role
                }
                console.log(payload);
                const access_token = createToken(payload)
                console.log(access_token);
                res.status(200).json({access_token})
            }
        } catch (error) {
            if( error.name == "failedlogin") {
                res.status(400).json({message : "username/ password not match!"})
            } else if ( error.name == "no_input") {
                res.status(400).json({ message : "please input username/password"})
            } else {
                res.status(500).json({message : "Internal Server Error!"})
            }
        }
    }

    static async registerHandler( req,res) {
        let validateEmpty = []
        try {
            const { email, username, password, role } = req.body
            if(!email) validateEmpty.push("email is required!")
            if(!username) validateEmpty.push("username is required!")
            if(!password) validateEmpty.push("password is required!")
            if(!role) validateEmpty.push("role is required!")
            if(validateEmpty.length != 0) throw { name : "detect_empty"}
            else {
                let createUser = await User.create({
                    email, username, password, role
                })
                res.status(201).json({ message : "success create user"})
            }
        } catch(error) {
            if( error.name == "detect_empty") {
                res.status(400).json(validateEmpty)
            } else {
                res.status(500).json({ message : "Internal Server Error" })
            }
        }

    }
}

module.exports = userController