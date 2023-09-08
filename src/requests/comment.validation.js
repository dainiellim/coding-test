const { check } = require('express-validator');
const checkIfExist = require('../util/checkIfExist');
const userProfileModel = require('../models/userProfile.model')
const mbtiEnum = require('../enums/mbti.enum');
const enneagramEnum = require('../enums/enneagram.enum');
const zodiacEnum = require('../enums/zodiac.enum');


const createCommentValidation = [
    check('userId')
        .isNumeric().withMessage('user id must be a number')
        .custom((value) => checkIfExist(userProfileModel, value, 'id')),
    check('comment_by')
        .isNumeric().withMessage('user id must be a number')
        .custom((value) => checkIfExist(userProfileModel, value, 'id')),
    check('title').optional(),
    check('comment').optional(),
    check('mbti').optional()
        .custom((value) => mbtiEnum.includes(value))
        .withMessage("value is not a valid mbti"),
    check('enneagram').optional()
        .custom((value) => enneagramEnum.includes(value))
        .withMessage("value is not a valid enneagram"),
    check('zodiac').optional()
        .custom((value) => zodiacEnum.includes(value))
        .withMessage("value is not a valid zodiac"),
];

const indexCommentValidation = [
    check('userId').isNumeric().withMessage('user id must be a number'),
    check('sort').optional()
        .custom((value) => ['createdAt', 'likes'].includes(value))
        .withMessage("value is not a sort"),
    check('order').optional()
        .custom((value) => ['asc', 'desc'].includes(value))
        .withMessage("value is not a order"),
];

const showCommentValidation = [
    check('userId').isNumeric().withMessage('user id must be a number'),
    check('id').isNumeric().withMessage('ID must be a number'),
];

const toggleCommentLikeValidation = [
    check('user_id').isNumeric().withMessage('user id must be a number'),
    check('id').isNumeric().withMessage('ID must be a number'),
];

module.exports = {
    createCommentValidation,
    indexCommentValidation,
    showCommentValidation,
};