const db = require('../database');
const RatingPlayerDTO = require('../dtos/RatingPlayerDTO');
const { v4: uuidv4 } = require('uuid');

class RatingPlayerDAO {
    async createRatingPlayer(ratingId, playerId) {
        const query = `
            INSERT INTO rating_player (ratingId, playerId)
            VALUES ($1, $2)
        `;
        await db.query(query, [ratingId, playerId]);
        return new RatingPlayerDTO(ratingId, playerId);
    }

    async getRatingIdsByPlayerId(playerId) {
        const query = 'SELECT ratingId FROM rating_player WHERE playerId = $1';
        const result = await db.query(query, [playerId]);
        return result.rows.map(row => row.ratingid);
    }

    async getAllRatingPlayers() {
        const query = 'SELECT * FROM rating_player';
        const result = await db.query(query);
        return result.rows.map(row =>
            new RatingPlayerDTO(row.ratingid, row.playerid)
        );
    }

    async deleteRatingPlayer(ratingId, playerId) {
        const query = 'DELETE FROM rating_player WHERE ratingId = $1 AND playerId = $2';
        await db.query(query, [ratingId, playerId]);
    }
}

module.exports = new RatingPlayerDAO();