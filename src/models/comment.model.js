const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
        user_id: {
            type: Number,
            unique: false,
            required: true,
        },
        title: {
            type: String,
            unique: false,
            required: false,
        },
        comment: {
            type: String,
            unique: false,
            required: false,
        },
        mbti: {
            type: String,
            unique: false,
            required: false,
        },
        enneagram: {
            type: String,
            unique: false,
            required: false,
        },
        zodiac: {
            type: String,
            unique: false,
            required: false,
        },
    },
    {
        timestamps: true
    }
);

schema.index({ id: 1, user_id: 1, mbti: 1, enneagram: 1, zodiac: 1 });

schema.pre('save', async function (next) {
    if (!this.id) {
        const highestIdUser = await this.constructor.findOne({}, { id: 1 }, { sort: { id: -1 } });
        if (highestIdUser) {
            this.id = highestIdUser.id + 1;
        } else {
            this.id = 1;
        }
    }
    next();
});

const commentModel = mongoose.model('comments', schema);

module.exports = commentModel;