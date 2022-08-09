const User = require("../models/User")
const bcrypt = require("bcrypt")
const { UnauthorizedError } = require("../utils/errors")
const config = require("../../config.json")
const sendMail = require("../utils/sendmail")
const shortUniqueId = require("short-unique-id")
const uid = new shortUniqueId({length: config.verification_code_length})

exports.login = async (body) => {

    let { username, password } = body

    let user = await User.findOne({
        username: username
    })

    if (!user) throw new UnauthorizedError("User not found")
    if (!await bcrypt.compare(password, user.password)) throw new UnauthorizedError("Wrong password.")

    return user

}

exports.register = async (body) => {

    let {username, password, email} = body
    if (await User.exists({username: username, email: email})) throw new UnauthorizedError(`User already exist.`)
    let hashedPass = await bcrypt.hash(password, 10)
    const emailVerificationCode = uid()

    let user = new User({username: username, password: hashedPass, email: email, emailVerificationCode: emailVerificationCode})
    sendMail({
        to: email, 
        subject: 'Email verifaction', 
        text: `click to verify email => http://localhost:${process.env.PORT}/verify?id=${user.id}&code=${emailVerificationCode}`, 
        html: `<a href='http://localhost:${process.env.PORT}/verify?id=${user.id}&code=${emailVerificationCode}'>click here to verify email</a>`
    })


    await user.save()
    return user

}

exports.verify = async (query) => {

    let {id, code} = query
    let user = await User.findById(id)

    if (user.emailVerified) throw new UnauthorizedError('Email already verified.')
    else if (user.emailVerificationCode != code) throw new UnauthorizedError('Verification code is wrong.')
    else {
        user.emailVerified = true
        user.emailVerificationCode = undefined
        await user.save()
        return user
    }

}

exports.resend = async (user) => {

    sendMail({
        to: user.email, 
        subject: 'Email verifaction', 
        text: `click to verify email => http://localhost:${process.env.PORT}/verify?id=${user.id}&code=${user.emailVerificationCode}`, 
        html: `<a href='http://localhost:${process.env.PORT}/verify?id=${user.id}&code=${user.emailVerificationCode}'>click here to verify email</a>`
    })

    return true

}