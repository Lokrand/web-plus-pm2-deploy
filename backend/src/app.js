"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cookie_parser_1 = require("cookie-parser");
var celebrate_1 = require("celebrate");
// import cors from 'cors';
var error_handler_1 = require("./middlewares/error-handler");
var config_1 = require("./config");
var routes_1 = require("./routes");
var _a = process.env.PORT, PORT = _a === void 0 ? 3000 : _a;
var app = (0, express_1.default)();
mongoose_1.default.connect(config_1.DB_ADDRESS);
// Только для локальных тестов. Не используйте это в продакшене
// app.use(cors())
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.get('/crash-test', function () {
    setTimeout(function () {
        throw new Error('Сервер сейчас упадёт');
    }, 0);
});
app.use(routes_1.default);
app.use((0, celebrate_1.errors)());
app.use(error_handler_1.default);
// eslint-disable-next-line no-console
app.listen(PORT, function () { return console.log('ok'); });
