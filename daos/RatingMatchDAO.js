const db = require('../database');
const RatingMatchDTO = require('../dtos/RatingMatchDTO');
const { v4: uuidv4 } = require('uuid');

class RatingMatchDAO {
    async createRatingMatch(matchId) {
        const ratingId = uuidv4();
        const query = `
            INSERT INTO rating_matches (ratingId, matchId)
            VALUES ($1, $2)
        `;
        await db.query(query, [ratingId, matchId]);
        return new RatingMatchDTO(ratingId, matchId);
    }

    async getRatingMatchById(ratingId) {
        const query = 'SELECT * FROM rating_matches WHERE ratingId = $1';
        const result = await db.query(query, [ratingId]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new RatingMatchDTO(row.ratingid, row.matchid);
    }

    async getAllRatingMatches() {
        const query = 'SELECT * FROM rating_matches';
        const result = await db.query(query);
        return result.rows.map(row =>
            new RatingMatchDTO(row.ratingid, row.matchid)
        );
    }

    async updateRatingMatch(ratingId, updates) {
        const fields = Object.keys(updates).map((field, i) => `${field} = $${i + 1}`).join(", ");
        const values = Object.values(updates);
        const query = `UPDATE rating_matches SET ${fields} WHERE ratingId = $${values.length + 1}`;
        await db.query(query, [...values, ratingId]);
    }

    async deleteRatingMatch(ratingId) {
        const query = 'DELETE FROM rating_matches WHERE ratingId = $1';
        await db.query(query, [ratingId]);
    }
}

module.exports = new RatingMatchDAO();