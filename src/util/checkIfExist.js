const checkIfExist = async (model, value, field) => {
    const document = await model.findOne({ [field]: value });
    if (!document) {
        return Promise.reject(`User does not exists`);
    }
};

module.exports = checkIfExist;