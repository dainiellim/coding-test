'use strict';

const commentModel = require('../models/comment.model');
const commentLikeModel = require('../models/commentLike.model');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const { commentResource } = require('../resources/comment.resource');

const index = async (req, res, next) => {
    try {
        const { mbti, enneagram, zodiac } = req.query;
        const userId = req.params.userId ?? '';

        const query = {
            user_id: parseInt(userId),
        };
        (mbti) ? (query.mbti = mbti) : '';
        (enneagram) ? (query.enneagram = enneagram) : '';
        (zodiac) ? (query.zodiac = zodiac) : '';

        const sort = req.query.sort || 'createdAt';
        let order = req.query.order || 'asc';
        order = (order == 'desc') ? -1 : 1;
        const sortOption = {};
        sortOption[sort] = order;

        const comments = await commentModel.aggregate([
            {
                $match: query,
            },
            {
                $lookup: {
                    from: 'comments_likes',
                    localField: 'id',
                    foreignField: 'comment_id',
                    as: 'comment_like',
                },
            },
            {
                $addFields: {
                    likes: { $size: '$comment_like' },
                },
            },
            {
                $sort: sortOption,
            },
        ]);

        res.status(200).json({ "data": comments.map(commentResource) });
    } catch (error) {
        next(error);
        res.status(400).json({ "error": "Something Went Wrong!" });
    }
}

const store = async (req, res, next) => {
    try {
        const data = req.body;
        const userId = req.params.userId ?? '';

        const comment = await commentModel.create({
            "user_id": userId,
            "comment_by": data.comment_by,
            "title": data.title,
            "comment": data.comment,
            "mbti": data.mbti,
            "enneagram": data.enneagram,
            "zodiac": data.zodiac,
        });

        res.status(201).json({ "data": commentResource(comment) });
    } catch (error) {
        next(error);
        res.status(400).json({ "error": "Something Went Wrong!" });
    }
}

const show = async (req, res, next) => {
    try {
        const { userId, id } = req.params;

        const comment = await commentModel.aggregate([
            {
                $match: { id: parseInt(id), user_id: parseInt(userId) },
            },
            {
                $lookup: {
                    from: 'comments_likes',
                    localField: 'id',
                    foreignField: 'comment_id',
                    as: 'comment_like',
                },
            },
            {
                $addFields: {
                    likes: { $size: '$comment_like' },
                },
            },
            {
                $limit: 1
            }
        ])

        if (!comment.length) {
            return res.status(404).json({ error: "Comment not found!" });
        }
        res.status(200).json({ "data": commentResource(comment[0]) });
    } catch (error) {
        next(error);

        res.status(400).json({ "error": "Something Went Wrong!" });
    }
}

const toggleLike = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;

        const commentLike = await commentLikeModel.findOne({ comment_id: id, user_id: user_id });
        if (commentLike) {
            await commentLike.deleteOne();
            res.status(200).json({ "data": "Comment Unliked!" });
            return;
        }
        await commentLikeModel.create({ comment_id: id, user_id: user_id });
        res.status(201).json({ "data": "Comment Liked!" });
    } catch (error) {
        next(error);
        res.status(400).json({ "error": "Something Went Wrong!" });
    }
}

module.exports = {
    index,
    store,
    show,
    toggleLike
};
