const RatingDTO = require('../dtos/RatingDTO');

class RatingDAO {
    async createRating(userId, entityId, entityType, ratingValue, comment) {}
    async getRatingById(ratingId) {}
    async getRatingsByEntity(entityId) {}
    async updateRating(ratingId, ratingValue, comment) {}
    async deleteRating(ratingId) {}
}

module.exports = new RatingDAO();
