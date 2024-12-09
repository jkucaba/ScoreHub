// daos/MatchDAO.js
const db = require('../database');
const MatchDTO = require('../dtos/MatchDTO');
const { v4: uuidv4 } = require('uuid');

class MatchDAO {
    async createMatch(matchDate, judge, homeTeamId, opponentTeamId, matchWinnerId) {
        const matchId = uuidv4();
        const date = new Date(matchDate);
        if (isNaN(date.getTime())) {
            throw new RangeError('Invalid date value');
        }

        const formattedDate = date.toISOString().split('T')[0];
        const query = `
            INSERT INTO Match (matchId, matchDate, judge, homeTeamId, opponentTeamId, matchWinnerId)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await db.query(query, [matchId, formattedDate, judge, homeTeamId, opponentTeamId, matchWinnerId]);
        return new MatchDTO(matchId, matchDate, judge, homeTeamId, opponentTeamId, matchWinnerId);
    }

    async getMatchById(matchId) {
        const query = `
            SELECT
                m.matchid,
                m.matchdate,
                m.judge,
                ht.teamName AS homeTeamName,
                ot.teamName AS opponentTeamName,
                wt.teamName AS winnerTeamName
            FROM Match m
                     LEFT JOIN team ht ON m.hometeamid = ht.teamid
                     LEFT JOIN team ot ON m.opponentteamid = ot.teamid
                     LEFT JOIN team wt ON m.matchwinnerid = wt.teamid
            WHERE m.matchid = $1
        `;
        console.log(`Executing query with matchId: ${matchId}`);
        const result = await db.query(query, [matchId]);
        if (result.rows.length === 0) {
            throw new Error('Match not found');
        }
        const match = result.rows[0];
        return new MatchDTO(
            match.matchid,
            match.matchdate,
            match.judge,
            match.hometeamname,
            match.opponentteamname,
            match.winnerteamname
        );
    }

    async getAllMatches() {
        const query =  `
            SELECT
                m.matchid,
                m.matchdate,
                m.judge,
                ht.teamName AS homeTeamName,
                ot.teamName AS opponentTeamName,
                wt.teamName AS winnerTeamName
            FROM Match m
                     LEFT JOIN team ht ON m.hometeamid = ht.teamid
                     LEFT JOIN team ot ON m.opponentteamid = ot.teamid
                     LEFT JOIN team wt ON m.matchwinnerid = wt.teamid
        `;
        const result = await db.query(query);
        console.log(result.rows)
        return result.rows.map(row =>
            new MatchDTO(
                row.matchid,
                row.matchdate,
                row.judge,
                row.hometeamname,
                row.opponentteamname,
                row.winnerteamname
            )
        );
    }

    async getTeamIdByName(teamName) {
        const query = 'SELECT teamid FROM team WHERE teamname = $1';
        const result = await db.query(query, [teamName]);
        if (result.rows.length === 0) {
            throw new Error(`Team not found: ${teamName}`);
        }
        return result.rows[0].teamid;
    }

    async updateMatch(matchId, updates) {
        if (updates.homeTeamName) {
            updates.homeTeamId = await this.getTeamIdByName(updates.homeTeamName);
            delete updates.homeTeamName;
        }
        if (updates.opponentTeamName) {
            updates.opponentTeamId = await this.getTeamIdByName(updates.opponentTeamName);
            delete updates.opponentTeamName;
        }
        if (updates.winnerTeamName) {
            updates.matchWinnerId = await this.getTeamIdByName(updates.winnerTeamName);
            delete updates.winnerTeamName;
        }

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