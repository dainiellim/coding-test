'use strict';

const commentModel = require('../models/comment.model');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const { commentResource } = require('../resources/comment.resource');

const index = async (req, res, next) => {
    try {
        const { q, mbti, enneagram, zodiac } = req.query;
        const userId = req.params.userId ?? '';

        const query = {
            user_id: userId,
        };
        (mbti) ? (query.mbti = mbti) : '';
        (enneagram) ? (query.enneagram = enneagram) : '';
        (zodiac) ? (query.zodiac = zodiac) : '';

        const sort = req.query.sort || 'createdAt';
        let order = req.query.order || 'asc';
        order = (order == 'desc') ? 1 : -1;
        const sortOption = {};
        sortOption[sort] = order;

        const comments = await commentModel.find(query).sort(sortOption).exec();

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

        const comment = await commentModel.findOne({ id: id, user_id: userId }).orFail();

        res.status(200).json({ "data": commentResource(comment) });
    } catch (error) {
        next(error);
        if (error instanceof mongoose.Error.DocumentNotFoundError) {
            return res.status(404).json({ error: "Comment not found!" });
        }
        res.status(400).json({ "error": "Something Went Wrong!" });
    }
}

const toggleLike = async (req, res, next) => {
}

module.exports = {
    index,
    store,
    show,
    toggleLike
};
