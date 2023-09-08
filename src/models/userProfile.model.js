const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
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

schema.index({ id: 1, name: 1 });

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

const userProfileModel = mongoose.model('user_profiles', schema);

module.exports = userProfileModel;