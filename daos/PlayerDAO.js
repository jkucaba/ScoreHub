// daos/PlayerDAO.js
const db = require('../database');
const PlayerDTO = require('../dtos/PlayerDTO');
const { v4: uuidv4 } = require('uuid');

class PlayerDAO {
    async createPlayer(firstName, lastName, position, dateOfBirth, nationality, teamId, goalCount, assistCount, yellowCardCount, redCardCount, jerseyNumber, playedMinutes) {
        const playerId = uuidv4();

        const query = `
            INSERT INTO Player (playerId, firstName, lastName, position, dateOfBirth, nationality, teamId, goalCount, assistCount, yellowCardCount, redCardCount, jerseyNumber, playedMinutes)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        `;
        await db.query(query, [playerId, firstName, lastName, position, dateOfBirth, nationality, teamId, goalCount, assistCount, yellowCardCount, redCardCount, jerseyNumber, playedMinutes]);

        return new PlayerDTO(playerId, firstName, lastName, position, dateOfBirth, nationality, teamId, goalCount, assistCount, yellowCardCount, redCardCount, jerseyNumber, playedMinutes);
    }

    async getPlayerById(playerId) {
        const query = 'SELECT * FROM Player WHERE playerId = $1';
        const result = await db.query(query, [playerId]);

        if (result.rows.length === 0) return null;

        const row = result.rows[0];
        return new PlayerDTO(row.playerid, row.firstname, row.lastname, row.position, row.dateofbirth, row.nationality, row.teamid, row.goalcount, row.assistcount, row.yellowcardcount, row.redcardcount, row.jerseynumber, row.playedminutes);
    }

    async getAllPlayers() {
        const query = 'SELECT * FROM Player';
        const result = await db.query(query);

        return result.rows.map(row =>
            new PlayerDTO(row.playerid, row.firstname, row.lastname, row.position, row.dateofbirth, row.nationality, row.teamid, row.goalcount, row.assistcount, row.yellowcardcount, row.redcardcount, row.jerseynumber, row.playedminutes)
        );
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
