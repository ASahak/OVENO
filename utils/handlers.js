const {
    NOT_FOUND_CODE
} = require('./constants');

module.exports = class NotFound extends Error{
    constructor(message, errors = null) {
        super();
        this.status = NOT_FOUND_CODE;
        this.message = message;
        this.errors = errors;
    }
};
