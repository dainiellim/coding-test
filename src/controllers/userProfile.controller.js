const userProfile = require('../models/userProfile.model');

function index(req, res, next) {
    try {
        const data = userProfile.find();

        res.status(200).json({ "data": data });
    } catch (error) {
        next();
        res.status(400).json({ "error": "Something Went Wrong!" });
    }
}

async function store(req, res, next) {
    try {
        const user = await userProfile.create({
            "name": "Elon Musk",
            "description": "CEO ELON MUSK",
            "mbti": "ISFJ",
            "enneagram": "9w3",
            "variant": "sp/so",
            "tritype": 725,
            "socionics": "SEE",
            "sloan": "RCOEN",
            "psyche": "FEVL",
            "image": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Elon_Musk_%283017880307%29.jpg",
        }).pretty();

        res.status(200).json({ "data": user });
    } catch (error) {
        next(error);
        res.status(400).json({ "error": "Something Went Wrong!" });
    }
}

function show(req, res, next) {
    try {
        const data = userProfile.find(req.params.id);

        res.status(200).json({ "data": data });
    } catch (error) {
        next();
        res.status(400).json({ "error": "Something Went Wrong!" });
    }
}

module.exports = {
    index,
    store,
    show
};
