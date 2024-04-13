// Class to handle errors
class AppError extends Error {
    constructor(status, message) {
        // Call the Error constructor with the error message
        super(message);
        this.status = status;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;