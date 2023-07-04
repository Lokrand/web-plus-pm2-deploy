"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.getUser = exports.createUser = exports.updateUserAvatar = exports.updateUserInfo = exports.login = void 0;
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var user_1 = require("../models/user");
var config_1 = require("../config");
var bad_request_error_1 = require("../errors/bad-request-error");
var not_found_error_1 = require("../errors/not-found-error");
var conflict_error_1 = require("../errors/conflict-error");
var login = function (req, res, next) {
    var _a = req.body, email = _a.email, password = _a.password;
    return user_1.default.findUserByCredentials(email, password)
        .then(function (user) {
        var token = jsonwebtoken_1.default.sign({ _id: user._id }, config_1.JWT_SECRET);
        return res
            .cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
            sameSite: true,
        })
            .send({ token: token });
    })
        .catch(next);
};
exports.login = login;
var createUser = function (req, res, next) {
    var _a = req.body, name = _a.name, about = _a.about, avatar = _a.avatar, password = _a.password, email = _a.email;
    bcryptjs_1.default.hash(password, 10)
        .then(function (hash) { return user_1.default.create({
        name: name,
        about: about,
        avatar: avatar,
        email: email,
        password: hash,
    }); })
        .then(function (data) { return res.status(201).send(data); })
        .catch(function (err) {
        if (err.name === 'ValidationError') {
            next(new bad_request_error_1.default(err.message));
        }
        else if (err.code === 11000) {
            next(new conflict_error_1.default('Пользователь с данным email уже существует'));
        }
        else {
            next(err);
        }
    });
};
exports.createUser = createUser;
var getUserData = function (id, res, next) {
    user_1.default.findById(id)
        .orFail(function () { return new not_found_error_1.default('Пользователь по заданному id отсутствует в базе'); })
        .then(function (users) { return res.send(users); })
        .catch(next);
};
var getUser = function (req, res, next) {
    getUserData(req.params.id, res, next);
};
exports.getUser = getUser;
var getCurrentUser = function (req, res, next) {
    getUserData(req.user._id, res, next);
};
exports.getCurrentUser = getCurrentUser;
var updateUserData = function (req, res, next) {
    var _id = req.user._id, body = req.body;
    user_1.default.findByIdAndUpdate(_id, body, { new: true, runValidators: true })
        .orFail(function () { return new not_found_error_1.default('Пользователь по заданному id отсутствует в базе'); })
        .then(function (user) { return res.send(user); })
        .catch(next);
};
var updateUserInfo = function (req, res, next) { return updateUserData(req, res, next); };
exports.updateUserInfo = updateUserInfo;
var updateUserAvatar = function (req, res, next) { return updateUserData(req, res, next); };
exports.updateUserAvatar = updateUserAvatar;
