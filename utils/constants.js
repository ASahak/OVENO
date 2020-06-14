module.exports = {
    EMAIL_PATTERN                  : /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/i,
    FULL_NAME_PATTERN              :/^[\p{L}\s]*$/iu,
    UPPERCASE_LOWERCASE_PATTERN    :/(?=.*[\p{Lu}])(?=.*[\p{Ll}])[\p{L}\s]+/u,
    DIGIT_PATTERN                  :/\d+/i,
    AT_LEAST_ONE_DIGIT_AND_UPPER   : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/u,
    NOT_FOUND_CODE                 : 404,
    NOT_EXISTS                     : resource => `${resource} doesn't exist!`
};
