"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_ADDRESS = exports.JWT_SECRET = void 0;
exports.JWT_SECRET = (_a = process.env.JWT_SECRET, _a === void 0 ? 'JWT_SECRET' : _a);
exports.DB_ADDRESS = (_b = process.env.DB_ADDRESS, _b === void 0 ? 'mongodb://localhost:27017/mestodb' : _b);
