const userProfileResource = (userProfile) => {
    return {
        "id": userProfile.id,
        "name": userProfile.name,
        "description": userProfile.description,
        "mbti": userProfile.mbti,
        "enneagram": userProfile.enneagram,
        "variant": userProfile.variant,
        "tritype": userProfile.tritype,
        "socionics": userProfile.socionics,
        "sloan": userProfile.sloan,
        "psyche": userProfile.psyche,
        "image": userProfile.image,
        "createdAt": userProfile.createdAt,
        "updatedAt": userProfile.updatedAt,
    };
}

module.exports = { userProfileResource };