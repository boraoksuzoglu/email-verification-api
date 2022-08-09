const User = require("../models/User")
const { UnauthorizedError } = require("../utils/errors")

module.exports = async (req, res, next) => {
    if (req.headers.authorization) {
        const match = req.headers.authorization.match(/^Bearer\s+(.+)$/i)
        if (match) {
            const token = match[1]
            try {
                req.user = await User.findById(token)
            } catch (e) {
                throw new UnauthorizedError(`Access token is wrong!`)
            }
        }
    }
    next()
}