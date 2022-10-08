module.exports = (err, req, res, next) => {
	const errorResponse = {}
	const status = err.isJoi ? 400 : err.httpStatus || 500

	if (errorResponse.message === undefined) {
		if (err.message) {
			errorResponse.message = err.message
		} else {
			errorResponse.message = 'server error'
		}
	}

	errorResponse.code = status
	res.status(status).json(errorResponse)
}
