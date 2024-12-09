const db = require('../database');
const LineupDTO = require('../dtos/LineupDTO');
const { v4: uuidv4 } = require('uuid');

class LineupDAO {
    async createLineup(matchId, playerId) {
        const lineupId = uuidv4();
        const query = `
            INSERT INTO lineup (lineupid, matchid, playerid)
            VALUES ($1, $2, $3)
        `;
        await db.query(query, [lineupId, matchId, playerId]);
        return new LineupDTO(lineupId, matchId, playerId);
    }

    async getLineupById(matchId) {
        const query = 'SELECT * FROM lineup WHERE matchid = $1';
        const result = await db.query(query, [matchId]);
        if (result.rows.length === 0) return null;
        return result.rows.map(row =>
            new LineupDTO(row.lineupid, row.matchid, row.playerid)
        );
    }

    async getAllLineups() {
        const query = 'SELECT * FROM lineups';
        const result = await db.query(query);
        return result.rows.map(row =>
            new LineupDTO(row.lineupid, row.matchid, row.playerid)
        );
    }

    async updateLineup(lineupId, updates) {
        const fields = Object.keys(updates).map((field, i) => `${field} = $${i + 1}`).join(", ");
        const values = Object.values(updates);
        const query = `UPDATE lineups SET ${fields} WHERE lineupId = $${values.length + 1}`;
        await db.query(query, [...values, lineupId]);
    }

    async deleteLineup(lineupId) {
        const query = 'DELETE FROM lineups WHERE lineupId = $1';
        await db.query(query, [lineupId]);
    }
}

module.exports = new LineupDAO();