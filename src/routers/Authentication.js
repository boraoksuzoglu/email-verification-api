const router = require('express').Router()
const AuthController = require('../controllers/AuthController')
const AuthMiddleware = require('../middlewares/Authentication')

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.get('/verify', AuthController.verify)
router.get('/resend', AuthMiddleware, AuthController.resend)

module.exports = router
