"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var validator_1 = require("validator");
var bcryptjs_1 = require("bcryptjs"); // импортируем bcrypt
var validatons_1 = require("../middlewares/validatons");
var unauthorized_error_1 = require("../errors/unauthorized-error");
var userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        default: 'Жак-Ив Кусто',
        minlength: [2, 'Минимальная длина поля "name" - 2'],
        maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    about: {
        type: String,
        default: 'Исследователь',
        minlength: [2, 'Минимальная длина поля "about" - 2'],
        maxlength: [30, 'Максимальная длина поля "about" - 30'],
    },
    avatar: {
        type: String,
        default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
        validate: {
            validator: function (v) { return validatons_1.urlRegExp.test(v); },
            message: 'Поле "avatar" должно быть валидным url-адресом.',
        },
    },
    // в схеме пользователя есть обязательные email и password
    email: {
        type: String,
        required: [true, 'Поле "email" должно быть заполнено'],
        unique: true,
        validate: {
            validator: function (v) { return validator_1.default.isEmail(v); },
            message: 'Поле "email" должно быть валидным email-адресом',
        },
    },
    // поле password не имеет ограничения на длину, т.к. пароль хранится в виде хэша
    password: {
        type: String,
        required: [true, 'Поле "password" должно быть заполнено'],
        select: false,
    },
}, { versionKey: false });
userSchema.statics
    .findUserByCredentials = function findByCredentials(email, password) {
    return this.findOne({ email: email }).select('+password')
        .then(function (user) {
        if (!user) {
            return Promise.reject(new unauthorized_error_1.default('Неправильные почта или пароль'));
        }
        return bcryptjs_1.default.compare(password, user.password)
            .then(function (matched) {
            if (!matched) {
                return Promise.reject(new unauthorized_error_1.default('Неправильные почта или пароль'));
            }
            return user;
        });
    });
};
userSchema.methods.toJSON = function toJSON() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};
exports.default = mongoose_1.default.model('user', userSchema);
