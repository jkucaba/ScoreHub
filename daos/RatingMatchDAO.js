const db = require('../database');
const RatingMatchDTO = require('../dtos/RatingMatchDTO');
const { v4: uuidv4 } = require('uuid');

class RatingMatchDAO {
    async createRatingMatch(ratingId, matchId) {
        const query = `
            INSERT INTO rating_match (ratingId, matchId)
            VALUES ($1, $2)
        `;
        await db.query(query, [ratingId, matchId]);
        return new RatingMatchDTO(ratingId, matchId);
    }

    async getRatingIdsByMatchId(matchId) {
        const query = 'SELECT ratingId FROM rating_match WHERE matchId = $1';
        const result = await db.query(query, [matchId]);
        return result.rows.map(row => row.ratingid);
    }

    async getAllRatingMatches() {
        const query = 'SELECT * FROM rating_match';
        const result = await db.query(query);
        return result.rows.map(row =>
            new RatingMatchDTO(row.ratingid, row.matchid)
        );
    }

    async updateRatingMatch(ratingId, updates) {
        const fields = Object.keys(updates).map((field, i) => `${field} = $${i + 1}`).join(", ");
        const values = Object.values(updates);
        const query = `UPDATE rating_match SET ${fields} WHERE ratingId = $${values.length + 1}`;
        await db.query(query, [...values, ratingId]);
    }

    async deleteRatingMatch(ratingId) {
        const query = 'DELETE FROM rating_match WHERE ratingId = $1';
        await db.query(query, [ratingId]);
    }
}

module.exports = new RatingMatchDAO();