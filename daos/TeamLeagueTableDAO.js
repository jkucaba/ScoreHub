// daos/TeamLeagueTableDAO.js
const db = require('../database');
const TeamLeagueTableDTO = require('../dtos/TeamLeagueTableDTO');

class TeamLeagueTableDAO {
    async createTeamLeagueTableEntry(leagueTableId, teamId, points) {
        const query = `
            INSERT INTO team_leaguetable (leagueTableId, teamId, points)
            VALUES ($1, $2, $3)
        `;
        await db.query(query, [leagueTableId, teamId, points]);
        return new TeamLeagueTableDTO(leagueTableId, teamId, points);
    }

    async getTeamLeagueTableEntry(leagueTableId, teamId) {
        const query = 'SELECT * FROM team_leaguetable WHERE leagueTableId = $1 AND teamId = $2';
        const result = await db.query(query, [leagueTableId, teamId]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new TeamLeagueTableDTO(row.leaguetableid, row.teamid, row.points);
    }

    async getTeamsInLeagueTable(leagueTableId) {
        const query = 'SELECT * FROM team_leaguetable WHERE leagueTableId = $1';
        const result = await db.query(query, [leagueTableId]);
        return result.rows.map(row =>
            new TeamLeagueTableDTO(row.leaguetableid, row.teamid, row.points)
        );
    }

    async updateTeamLeagueTableEntry(leagueTableId, teamId, updates) {
        const fields = Object.keys(updates).map((field, i) => `${field} = $${i + 1}`).join(", ");
        const values = Object.values(updates);
        const query = `UPDATE team_leaguetable SET ${fields} WHERE leagueTableId = $${values.length + 1} AND teamId = $${values.length + 2}`;
        await db.query(query, [...values, leagueTableId, teamId]);
    }

    async deleteTeamLeagueTableEntry(leagueTableId, teamId) {
        const query = 'DELETE FROM team_leaguetable WHERE leagueTableId = $1 AND teamId = $2';
        await db.query(query, [leagueTableId, teamId]);
    }
}

module.exports = new TeamLeagueTableDAO();