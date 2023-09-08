'use strict';

const express = require('express');
const router = express.Router();
const commentController = require('../src/controllers/comment.controller');
const { createCommentValidation, showCommentValidation, indexCommentValidation, toggleCommentLikeValidation } = require('../src/requests/comment.validation');
const handleValidationErrors = require('../src/middleware/validationHandler');


module.exports = () => {
    router.post('/api/users/:userId/comments',
        createCommentValidation,
        handleValidationErrors,
        commentController.store
    );
    router.get('/api/users/:userId/comments',
        indexCommentValidation,
        handleValidationErrors,
        commentController.index);
    router.get('/api/users/:userId/comments/:id',
        showCommentValidation,
        handleValidationErrors,
        commentController.show
    );
    router.post('/api/users/:userId/comments/:id/toggle_like',
        toggleCommentLikeValidation,
        handleValidationErrors,
        commentController.toggleLike
    );

    return router;
}