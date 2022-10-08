const express = require('express')
const app = express()
const mongoose = require('mongoose')
const server = require('http').createServer(app)
const bodyParser = require('body-parser')
require('dotenv').config()
require('express-async-errors')

app.set('trust proxy', 1)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', require('./routers/Authentication'))

app.use(require('./middlewares/ErrorHandler'))
app.use((req, res, next) => {
	res.status(404).json({
		code: 404,
		message: 'Not found',
	})
})

server.listen(process.env.PORT, () => {
	console.log('Run!')
	mongoose.connect(process.env.MONGODB_URL)
})

mongoose.connection.on('connected', () => {
	console.log('Successfully connected to database')
})
mongoose.connection.on('error', (err) => {
	console.log('An error occured while connecting to database: ' + err)
})
