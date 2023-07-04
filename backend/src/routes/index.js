"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_1 = require("./users");
var cards_1 = require("./cards");
var auth_1 = require("../middlewares/auth");
var not_found_error_1 = require("../errors/not-found-error");
var users_2 = require("../controllers/users");
var validatons_1 = require("../middlewares/validatons");
var router = (0, express_1.Router)();
router.post('/signup', validatons_1.validateUserBody, users_2.createUser);
router.post('/signin', validatons_1.validateAuthentication, users_2.login);
// все роуты, кроме /signin и /signup, защищены авторизацией;
router.use(auth_1.default);
router.use('/users', users_1.default);
router.use('/cards', cards_1.default);
router.use(function (req, res, next) {
    next(new not_found_error_1.default('Маршрут не найден'));
});
exports.default = router;
