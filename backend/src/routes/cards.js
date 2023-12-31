"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validatons_1 = require("../middlewares/validatons");
var router = (0, express_1.Router)();
var _a = require('../controllers/cards'), createCard = _a.createCard, getCards = _a.getCards, deleteCard = _a.deleteCard, likeCard = _a.likeCard, dislikeCard = _a.dislikeCard;
router.get('/', getCards);
router.post('/', validatons_1.validateCardBody, createCard);
router.delete('/:id', validatons_1.validateObjId, deleteCard);
router.put('/:id/likes', validatons_1.validateObjId, likeCard);
router.delete('/:id/likes', validatons_1.validateObjId, dislikeCard);
exports.default = router;
