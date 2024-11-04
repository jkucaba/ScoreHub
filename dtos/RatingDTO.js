class RatingDTO {
    constructor(ratingId, userId, entityId, entityType, ratingValue, comment, createdAt, updatedAt) {
        this.ratingId = ratingId;
        this.userId = userId;
        this.entityId = entityId;
        this.entityType = entityType;
        this.ratingValue = ratingValue;
        this.comment = comment;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = RatingDTO;
