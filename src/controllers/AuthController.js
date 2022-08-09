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

exports.resend = async (req, res) => {
    const respond = await AuthServices.resend(req.user)
    res.status(200).json(respond)
}