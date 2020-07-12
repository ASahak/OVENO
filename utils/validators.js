const {
    EMAIL_PATTERN,
    FULL_NAME_PATTERN,
    DIGIT_PATTERN,
    UPPERCASE_LOWERCASE_PATTERN,
    ONLY_ENGLISH_LETTERS,
    ONLY_ENGLISH_LETTERS_WTH_DIGIT
} = require('./constants');

module.exports = {
    EMAIL_VALIDATOR : {
        required: 'Please complete this mandatory field',
        pattern: {
            value: EMAIL_PATTERN,
            message: 'Please write your email address in format: yourname@example.com',
        }
    },
    ONLY_ENGLISH_LETTERS_PATTERN : {
        required: 'Please complete this mandatory field',
        pattern: {
            value: ONLY_ENGLISH_LETTERS,
            message: 'Please input only english letters',
        }
    },
    ONLY_ENGLISH_LETTERS_WITH_DIGIT_PATTERN : {
        required: 'Please complete this mandatory field',
        pattern: {
            value: ONLY_ENGLISH_LETTERS_WTH_DIGIT,
            message: 'Please input only english letters',
        }
    },
    FULL_NAME_VALIDATOR : {
        required: 'Please complete this mandatory field',
        minLength: {
            value: 2,
            message: 'The minLength must be more then 2'
        },
        maxLength: {
            value: 255,
            message: 'The maxLength must be les then 255'
        },
        pattern: {
            value: FULL_NAME_PATTERN,
            message: 'Please write your name in format: John Doe',
        }
    },

    PASSWORD_VALIDATOR : {
        required: 'Please complete this mandatory field',
        minLength: {
            value: 8,
            message: 'Use at least 8 characters'
        },
        validate: {
            containsDigit: value => DIGIT_PATTERN.test(value),
            containsUppercase: value => UPPERCASE_LOWERCASE_PATTERN.test(value)
        }
    }

};
