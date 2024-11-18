const db = require('../database');
const RatingPlayerDTO = require('../dtos/RatingPlayerDTO');
const { v4: uuidv4 } = require('uuid');

class RatingPlayerDAO {
    async createRatingPlayer(ratingId, playerId) {
        const query = `
            INSERT INTO rating_players (ratingId, playerId)
            VALUES ($1, $2)
        `;
        await db.query(query, [ratingId, playerId]);
        return new RatingPlayerDTO(ratingId, playerId);
    }

    async getRatingPlayer(ratingId, playerId) {
        const query = 'SELECT * FROM rating_players WHERE ratingId = $1 AND playerId = $2';
        const result = await db.query(query, [ratingId, playerId]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new RatingPlayerDTO(row.ratingid, row.playerid);
    }

    async getAllRatingPlayers() {
        const query = 'SELECT * FROM rating_players';
        const result = await db.query(query);
        return result.rows.map(row =>
            new RatingPlayerDTO(row.ratingid, row.playerid)
        );
    }

    async deleteRatingPlayer(ratingId, playerId) {
        const query = 'DELETE FROM rating_players WHERE ratingId = $1 AND playerId = $2';
        await db.query(query, [ratingId, playerId]);
    }
}

module.exports = new RatingPlayerDAO();