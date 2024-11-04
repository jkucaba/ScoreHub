class CommentDTO {
    constructor(commentId, userId, entityId, entityType, content, createdAt, updatedAt) {
        this.commentId = commentId;
        this.userId = userId;
        this.entityId = entityId;
        this.entityType = entityType;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = CommentDTO;
