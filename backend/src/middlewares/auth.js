"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var config_1 = require("../config");
var unauthorized_error_1 = require("../errors/unauthorized-error");
var auth = function (req, res, next) {
    try {
        var token = req.cookies.jwt || req.headers.authorization;
        if (!token) {
            throw new unauthorized_error_1.default('Токен не передан');
        }
        token = token.replace('Bearer ', '');
        var payload = null;
        payload = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (e) {
        next(new unauthorized_error_1.default('Необходима авторизация'));
    }
};
exports.default = auth;
