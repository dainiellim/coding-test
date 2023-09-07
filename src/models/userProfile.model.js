const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false
        },
        description: {
            type: String,
            required: false,
            unique: false
        },
        mbti: {
            type: String,
            required: false,
            unique: false
        },
        enneagram: {
            type: String,
            required: false,
            unique: false
        },
        variant: {
            type: String,
            required: false,
            unique: false
        },
        tritype: {
            type: String,
            required: false,
            unique: false
        },
        socionics: {
            type: String,
            required: false,
            unique: false
        },
        sloan: {
            type: String,
            required: false,
            unique: false
        },
        psyche: {
            type: String,
            required: false,
            unique: false
        },
        image: {
            type: String,
            required: false,
            unique: false
        }
    },
    {
        timestamps: true
    }
);

const userProfileModel = mongoose.model('user_profiles', schema);

module.exports = userProfileModel;