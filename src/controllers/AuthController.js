const AuthServices = require("../services/AuthServices")

exports.login = async (req, res) => {
    const respond = await AuthServices.login(req.body)
    res.status(200).json(respond)
}

exports.register = async (req, res) => {
    const respond = await AuthServices.register(req.body)
    res.status(200).json(respond)
}

exports.verify = async (req, res) => {
    const respond = await AuthServices.verify(req.query)
    res.status(200).json(respond)
}

exports.resend_verification_code = async (req, res) => {
    const respond = await AuthServices.resend_verification_code(req.user)
    res.status(200).json(respond)
}