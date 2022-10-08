const util = require('util')

function _createError(name, statusCode) {
	function ErrorConstructor(message) {
		Error.call(this)
		Error.captureStackTrace(this)
		this.message = message || name
		this.httpStatus = statusCode
	}

	util.inherits(ErrorConstructor, Error)
	ErrorConstructor.prototype.name = name

	return ErrorConstructor
}

module.exports = {
	ValidationError: _createError('ValidationError', 400),
	BadRequestError: _createError('BadRequestError', 400),
	NotFoundError: _createError('NotFoundError', 404),
	ForbiddenError: _createError('ForbiddenError', 403),
	UnauthorizedError: _createError('UnauthorizedError', 401),
	ConflictError: _createError('ConflictError', 409),
	UnprocessableEntityError: _createError('UnprocessableEntityError', 422),
	InternalServerError: _createError('InternalServerError', 500),
	NotImplementedError: _createError('NotImplemented', 501),
}
