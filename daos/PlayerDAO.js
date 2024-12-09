const db = require('../database');
const PlayerDTO = require('../dtos/PlayerDTO');
const { v4: uuidv4 } = require('uuid');

class PlayerDAO {
    async getAllPlayers() {
        const query = `
            SELECT 
                p.playerid,
                p.firstname,
                p.lastname,
                p.position,
                p.dateofbirth,
                p.nationality,
                p.goalcount,
                p.assistcount,
                p.yellowcardcount,
                p.redcardcount,
                p.jerseynumber,
                p.playedminutes,
                t.teamname AS teamname
            FROM player p
            LEFT JOIN team t ON p.teamid = t.teamid
        `;
        const result = await db.query(query);
        return result.rows;
    }

    async getPlayerById(playerId) {
        const query = `
            SELECT 
                p.playerid,
                p.firstname,
                p.lastname,
                p.position,
                p.dateofbirth,
                p.nationality,
                p.goalcount,
                p.assistcount,
                p.yellowcardcount,
                p.redcardcount,
                p.jerseynumber,
                p.playedminutes,
                t.teamname AS teamname
            FROM player p
            LEFT JOIN team t ON p.teamid = t.teamid
            WHERE p.playerid = $1
        `;
        const result = await db.query(query, [playerId]);
        return result.rows[0];
    }

    async getPlayersByTeamId(teamId) {
        const query = `
            SELECT 
                p.playerid,
                p.firstname,
                p.lastname,
                p.position,
                p.dateofbirth,
                p.nationality,
                p.goalcount,
                p.assistcount,
                p.yellowcardcount,
                p.redcardcount,
                p.jerseynumber,
                p.playedminutes,
                t.teamname AS teamname
            FROM player p
            LEFT JOIN team t ON p.teamid = t.teamid
            WHERE p.teamid = $1
        `;
        const result = await db.query(query, [teamId]);
        return result.rows;
    }

    async createPlayer(firstName, lastName, position, dateOfBirth, nationality, teamId, goalCount, assistCount, yellowCardCount, redCardCount, jerseyNumber, playedMinutes) {
        const playerId = uuidv4();
        const currentDate = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

        const query = `
            INSERT INTO Player (playerId, firstName, lastName, position, dateOfBirth, nationality, teamId, goalCount, assistCount, yellowCardCount, redCardCount, jerseyNumber, playedMinutes, createdAt, updatedAt)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        `;
        await db.query(query, [playerId, firstName, lastName, position, dateOfBirth, nationality, teamId, goalCount, assistCount, yellowCardCount, redCardCount, jerseyNumber, playedMinutes, currentDate, currentDate]);

        return new PlayerDTO(playerId, firstName, lastName, position, dateOfBirth, nationality, teamId, goalCount, assistCount, yellowCardCount, redCardCount, jerseyNumber, playedMinutes, currentDate, currentDate);
    }

    async updatePlayer(playerId, updates) {
        const fields = Object.keys(updates).map((field, i) => `${field} = $${i + 1}`).join(", ");
        const values = Object.values(updates);
        const query = `UPDATE Player SET ${fields} WHERE playerId = $${values.length + 1}`;
        await db.query(query, [...values, playerId]);
    }

    async deletePlayer(playerId) {
        const query = 'DELETE FROM Player WHERE playerId = $1';
        await db.query(query, [playerId]);
    }
}

module.exports = new PlayerDAO();