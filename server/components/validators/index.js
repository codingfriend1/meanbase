var validator = require('mongoose-validators/node_modules/validator/validator');

validator.extend('isWhitespace', function (str) {
    return /^\s+$/.test(str);
});