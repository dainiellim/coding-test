const { check } = require('express-validator');

const createUserProfileValidation = [
    check('name').notEmpty(),
    check('description').notEmpty(),
    check('mbti').notEmpty(),
    check('enneagram').notEmpty(),
    check('variant').notEmpty(),
    check('tritype').notEmpty(),
    check('socionics').notEmpty(),
    check('sloan').notEmpty(),
    check('psyche').notEmpty(),
    check('image').notEmpty().isURL(),
];

const updateUserProfileValidation = [
    check('id').isNumeric().withMessage('ID must be a number'),
    check('name').notEmpty(),
    check('description').notEmpty(),
    check('mbti').notEmpty(),
    check('enneagram').notEmpty(),
    check('variant').notEmpty(),
    check('tritype').notEmpty(),
    check('socionics').notEmpty(),
    check('sloan').notEmpty(),
    check('psyche').notEmpty(),
    check('image').notEmpty().isURL(),
];

const showUserProfileValidation = [
    check('id').isNumeric().withMessage('ID must be a number'),
];

module.exports = {
    createUserProfileValidation,
    updateUserProfileValidation,
    showUserProfileValidation,
};