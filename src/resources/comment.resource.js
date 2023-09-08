const commentResource = (comment) => {


    return {
        "id": comment.id,
        "user_id": comment.user_id,
        "title": comment.title,
        "comment": comment.comment,
        "mbti": comment.mbti,
        "enneagram": comment.enneagram,
        "zodiac": comment.zodiac,
        "likes": comment.likes,
        "created_at": comment.createdAt,
    };
}

module.exports = { commentResource };