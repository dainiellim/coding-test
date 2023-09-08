'use strict';

const userProfile = require('../models/userProfile.model');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const { userProfileResource } = require('../resources/userProfile.resource');

const index = async (req, res, next) => {
    try {
        const q = req.query.q ?? '';
        const query = {
            name: new RegExp(`${q}`, 'i')
        };

        const users = await userProfile.find(query);

        res.status(200).json({ "data": users.map(userProfileResource) });
    } catch (error) {
        next(error);
        res.status(400).json({ "error": "Something Went Wrong!" });
    }
}

const store = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        const data = req.body;

        const user = await userProfile.create({
            "name": data.name,
            "description": data.description,
            "mbti": data.mbti,
            "enneagram": data.enneagram,
            "variant": data.variant,
            "tritype": data.tritype,
            "socionics": data.socionics,
            "sloan": data.sloan,
            "psyche": data.psyche,
            "image": data.image,
        });

        res.status(201).json({ "data": userProfileResource(user) });
    } catch (error) {
        next(error);
        res.status(400).json({ "error": "Something Went Wrong!" });
    }
}

const show = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await userProfile.findOne({ id: id }).orFail();

        res.status(200).json({ "data": userProfileResource(user) });
    } catch (error) {
        next(error);
        if (error instanceof mongoose.Error.DocumentNotFoundError) {
            return res.status(404).json({ error: 'User not found!' });
        }
        res.status(400).json({ "error": "Something Went Wrong!" });
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id;

        const data = req.body;

        const user = await userProfile.findOneAndUpdate(
            { id: id },
            {
                "name": data.name,
                "description": data.description,
                "mbti": data.mbti,
                "enneagram": data.enneagram,
                "variant": data.variant,
                "tritype": data.tritype,
                "socionics": data.socionics,
                "sloan": data.sloan,
                "psyche": data.psyche,
                "image": data.image,
            }, { new: true }).orFail();



        res.status(200).json({ "data": userProfileResource(user) });
    } catch (error) {
        next(error);
        if (error instanceof mongoose.Error.DocumentNotFoundError) {
            return res.status(404).json({ error: 'User not found!' });
        }
        res.status(400).json({ "error": "Something Went Wrong!" });
    }
}

module.exports = {
    index,
    store,
    show,
    update,
};
