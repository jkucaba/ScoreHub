const db = require('../database');
const MatchEventDTO = require('../dtos/MatchEventDTO');
const { v4: uuidv4 } = require('uuid');

class MatchEventDAO {
    async createMatchEvent(matchId, playerId, eventType, context) {
        const matchEventId = uuidv4();
        const query = `
            INSERT INTO match_events (matchEventId, matchId, playerId, eventType, context)
            VALUES ($1, $2, $3, $4, $5)
        `;
        await db.query(query, [matchEventId, matchId, playerId, eventType, context]);
        return new MatchEventDTO(matchEventId, matchId, playerId, eventType, context);
    }

    async getMatchEventById(matchEventId) {
        const query = 'SELECT * FROM match_events WHERE matchEventId = $1';
        const result = await db.query(query, [matchEventId]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new MatchEventDTO(row.matcheventid, row.matchid, row.playerid, row.eventtype, row.context);
    }

    async getAllMatchEvents() {
        const query = 'SELECT * FROM match_events';
        const result = await db.query(query);
        return result.rows.map(row =>
            new MatchEventDTO(row.matcheventid, row.matchid, row.playerid, row.eventtype, row.context)
        );
    }

    async updateMatchEvent(matchEventId, updates) {
        const fields = Object.keys(updates).map((field, i) => `${field} = $${i + 1}`).join(", ");
        const values = Object.values(updates);
        const query = `UPDATE match_events SET ${fields} WHERE matchEventId = $${values.length + 1}`;
        await db.query(query, [...values, matchEventId]);
    }

    async deleteMatchEvent(matchEventId) {
        const query = 'DELETE FROM match_events WHERE matchEventId = $1';
        await db.query(query, [matchEventId]);
    }
}

module.exports = new MatchEventDAO();