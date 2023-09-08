const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        user_id: {
            type: Number,
            required: true,
            unique: false
        },
        comment_id: {
            type: Number,
            required: true,
            unique: false

        }
    },
    {
        timestamps: true
    }
);

schema.index({ user_id: 1, comment_id: 1 });

const commentLikeModel = mongoose.model('comments_likes', schema);

module.exports = commentLikeModel;