const db = require('../database');
const MatchDTO = require('../dtos/MatchDTO');
const { v4: uuidv4 } = require('uuid');

class MatchDAO {
    async createMatch(matchDate, judge, homeTeamId, opponentTeamId, matchWinnerId) {
        const matchId = uuidv4();
        const query = `
            INSERT INTO Match (matchId, matchDate, judge, homeTeamId, opponentTeamId, matchWinnerId)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await db.query(query, [matchId, matchDate, judge, homeTeamId, opponentTeamId, matchWinnerId]);
        return new MatchDTO(matchId, matchDate, judge, homeTeamId, opponentTeamId, matchWinnerId);
    }

    async getMatchById(matchId) {
        const query = 'SELECT * FROM Match WHERE matchId = $1';
        const result = await db.query(query, [matchId]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new MatchDTO(row.matchid, row.matchdate, row.judge, row.hometeamid, row.opponentteamid, row.matchwinnerid);
    }

    async getAllMatches() {
        const query = 'SELECT * FROM Match';
        const result = await db.query(query);
        return result.rows.map(row =>
            new MatchDTO(row.matchid, row.matchdate, row.judge, row.hometeamid, row.opponentteamid, row.matchwinnerid)
        );
    }

    async updateMatch(matchId, updates) {
        const fields = Object.keys(updates).map((field, i) => `${field} = $${i + 1}`).join(", ");
        const values = Object.values(updates);
        const query = `UPDATE Match SET ${fields} WHERE matchId = $${values.length + 1}`;
        await db.query(query, [...values, matchId]);
    }

    async deleteMatch(matchId) {
        const query = 'DELETE FROM Match WHERE matchId = $1';
        await db.query(query, [matchId]);
    }
}

module.exports = new MatchDAO();