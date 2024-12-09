const db = require('../database');
const TeamDTO = require('../dtos/TeamDTO');
const { v4: uuidv4 } = require('uuid');

class TeamDAO {
    async createTeam(teamName, foundedYear, stadium, city, country, coach, stadiumCapacity) {
        const teamId = uuidv4();
        const currentDate = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

        const query = `
            INSERT INTO Team (teamId, teamName, foundedYear, stadium, city, country, coach, stadiumCapacity, createdAt, updatedAt)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;
        await db.query(query, [teamId, teamName, foundedYear, stadium, city, country, coach, stadiumCapacity, currentDate, currentDate]);

        return new TeamDTO(teamId, teamName, foundedYear, stadium, city, country, coach, stadiumCapacity, currentDate, currentDate);
    }

    async getTeamById(teamId) {
        const query = 'SELECT * FROM Team WHERE teamId = $1';
        const result = await db.query(query, [teamId]);

        if (result.rows.length === 0) return null;

        const row = result.rows[0];
        return new TeamDTO(row.teamid, row.teamname, row.foundedyear, row.stadium, row.city, row.country, row.coach, row.stadiumcapacity);
    }

    async getAllTeams() {
        const query = 'SELECT * FROM Team';
        const result = await db.query(query);
        console.log(result.rows);

        return result.rows.map(row =>
            new TeamDTO(row.teamid, row.teamname, row.foundedyear, row.stadium, row.city, row.country, row.coach, row.stadiumcapacity)
        );
    }

    async updateTeam(teamId, teamName, foundedYear, stadium, city, country, coach, stadiumCapacity) {
        const query = `
            UPDATE Team SET teamName = $1, foundedYear = $2, stadium = $3, city = $4, country = $5, coach = $6, stadiumCapacity = $7
            WHERE teamId = $8
        `;
        await db.query(query, [teamName, foundedYear, stadium, city, country, coach, stadiumCapacity, teamId]);
    }

    async deleteTeam(teamId) {
        const query = 'DELETE FROM Team WHERE teamId = $1';
        await db.query(query, [teamId]);
    }
}

module.exports = new TeamDAO();
