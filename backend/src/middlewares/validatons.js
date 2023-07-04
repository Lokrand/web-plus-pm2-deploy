"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProfile = exports.validateAvatar = exports.validateAuthentication = exports.validateUserBody = exports.validateCardBody = exports.validateObjId = exports.urlRegExp = void 0;
var celebrate_1 = require("celebrate");
var mongoose_1 = require("mongoose");
// eslint-disable-next-line no-useless-escape
var urlRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:\/?#[\]@!$&'()*+,;=.]+$/;
exports.urlRegExp = urlRegExp;
var validateObjId = (0, celebrate_1.celebrate)({
    params: celebrate_1.Joi.object().keys({
        id: celebrate_1.Joi.string().required().custom(function (value, helpers) {
            if (mongoose_1.Types.ObjectId.isValid(value)) {
                return value;
            }
            return helpers.message({ any: 'Невалидный id' });
        }),
    }),
});
exports.validateObjId = validateObjId;
var validateCardBody = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required().min(2).max(30)
            .messages({
            'string.min': 'Минимальная длина поля "name" - 2',
            'string.max': 'Максимальная длина поля "name" - 30',
            'string.empty': 'Поле "name" должно быть заполнено',
        }),
        link: celebrate_1.Joi.string().required().pattern(urlRegExp)
            .message('Поле "avatar" должно быть валидным url-адресом')
            .messages({
            'string.empty': 'Поле "link" должно быть заполнено',
        }),
    }),
});
exports.validateCardBody = validateCardBody;
var validateUserBody = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().min(2).max(30)
            .messages({
            'string.min': 'Минимальная длина поля "name" - 2',
            'string.max': 'Максимальная длина поля "name" - 30',
        }),
        about: celebrate_1.Joi.string().min(2).max(30)
            .messages({
            'string.min': 'Минимальная длина поля "about" - 2',
            'string.max': 'Максимальная длина поля "about" - 30',
        }),
        password: celebrate_1.Joi.string().required()
            .messages({
            'string.empty': 'Поле "password" должно быть заполнено',
        }),
        email: celebrate_1.Joi.string().required().email()
            .message('Поле "email" должно быть валидным email-адресом')
            .messages({
            'string.empty': 'Поле "email" должно быть заполнено',
        }),
        avatar: celebrate_1.Joi.string()
            .pattern(urlRegExp)
            .message('Поле "avatar" должно быть валидным url-адресом'),
    }),
});
exports.validateUserBody = validateUserBody;
var validateAuthentication = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        email: celebrate_1.Joi.string().required().email()
            .message('Поле "email" должно быть валидным email-адресом')
            .messages({
            'string.required': 'Поле "email" должно быть заполнено',
        }),
        password: celebrate_1.Joi.string().required()
            .messages({
            'string.empty': 'Поле "password" должно быть заполнено',
        }),
    }),
});
exports.validateAuthentication = validateAuthentication;
var validateAvatar = (0, celebrate_1.celebrate)({
    body: {
        avatar: celebrate_1.Joi.string().required().pattern(urlRegExp)
            .message('Поле "avatar" должно быть валидным url-адресом')
            .messages({
            'string.empty': 'Поле "avatar" должно быть заполнено',
        }),
    },
});
exports.validateAvatar = validateAvatar;
var validateProfile = (0, celebrate_1.celebrate)({
    body: {
        name: celebrate_1.Joi.string().required().min(2).max(30)
            .messages({
            'string.min': 'Минимальная длина поля "name" - 2',
            'string.max': 'Максимальная длина поля "name" - 30',
            'string.empty': 'Поле "name" должно быть заполнено',
        }),
        about: celebrate_1.Joi.string().required().min(2).max(30)
            .messages({
            'string.min': 'Минимальная длина поля "about" - 2',
            'string.max': 'Максимальная длина поля "about" - 30',
            'string.empty': 'Поле "about" должно быть заполнено',
        }),
    },
});
exports.validateProfile = validateProfile;
