module.exports = {
    EMAIL_PATTERN                   : /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/i,
    FULL_NAME_PATTERN               : /^[\p{L}\s]*$/iu,
    UPPERCASE_LOWERCASE_PATTERN     : /(?=.*[\p{Lu}])(?=.*[\p{Ll}])[\p{L}\s]+/u,
    DIGIT_PATTERN                   : /\d+/i,
    AT_LEAST_ONE_DIGIT_AND_UPPER    : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/u,
    NOT_FOUND_CODE                  : 404,
    NOT_EXISTS                      : resource => `${resource} doesn't exist!`,
    ROLE_TYPES                      : {
        ADMIN: 'admin',
        USER: 'user',
    },
    ONLY_ENGLISH_LETTERS            : /^[a-zA-Z]+$/i,
    ONLY_ENGLISH_LETTERS_WITH_DIGIT : /^(?=.*[A-Za-z])[A-Za-z0-9 _]*$/i,
    SPACE_PATTER                    : (str) => !!str.replace(/\s/g, '').length,
    EMAIL_VALIDATION                : email => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email),
    RANGE_SLIDER                    : [0, 10000],
    EMAIL_SUBJECT                   : 'Message from OVENO!',
};
