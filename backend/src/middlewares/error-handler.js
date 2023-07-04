"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler = function (err, req, res, next) {
    var _a = err.statusCode, statusCode = _a === void 0 ? 500 : _a;
    var isErrorInternal = statusCode === 500;
    var message = isErrorInternal ? 'На сервере произошла ошибка' : err.message;
    res.status(statusCode).send({ message: message });
    next();
};
exports.default = errorHandler;
