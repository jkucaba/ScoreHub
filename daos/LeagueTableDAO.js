// daos/LeagueTableDAO.js
const db = require('../database');
const LeagueTableDTO = require('../dtos/LeagueTableDTO');
const TeamLeagueTableDTO = require('../dtos/TeamLeagueTableDTO');
const { v4: uuidv4 } = require('uuid');

class LeagueTableDAO {
    async createLeagueTable(gameCategory, year, trophy, seasonGamesCount, queueNumber) {
        const leagueTableId = uuidv4();
        const query = `
            INSERT INTO leaguetable (leagueTableId, gameCategory, year, trophy, seasonGamesCount, queueNumber)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await db.query(query, [leagueTableId, gameCategory, year, trophy, seasonGamesCount, queueNumber]);
        return new LeagueTableDTO(leagueTableId, gameCategory, year, trophy, seasonGamesCount, queueNumber);
    }

    async getLeagueTableById(leagueTableId) {
        const query = `
            SELECT lt.*, tlt.teamId, tlt.points, t.teamName
            FROM leaguetable lt
                     LEFT JOIN team_leaguetable tlt ON lt.leagueTableId = tlt.leagueTableId
                     LEFT JOIN team t ON tlt.teamId = t.teamId
            WHERE lt.leagueTableId = $1
        `;
        const result = await db.query(query, [leagueTableId]);
        if (result.rows.length === 0) return null;

        const leagueTable = new LeagueTableDTO(
            result.rows[0].leaguetableid,
            result.rows[0].gamecategory,
            result.rows[0].year,
            result.rows[0].trophy,
            result.rows[0].seasongamescount,
            result.rows[0].queuenumber
        );

        leagueTable.teams = result.rows.map(row => new TeamLeagueTableDTO(row.leaguetableid, row.teamid, row.points, row.teamname));
        return leagueTable;
    }

    async getAllLeagueTables() {
        const query = `
            SELECT lt.*, tlt.teamId, tlt.points, t.teamName
            FROM leaguetable lt
                     LEFT JOIN team_leaguetable tlt ON lt.leagueTableId = tlt.leagueTableId
                     LEFT JOIN team t ON tlt.teamId = t.teamId
        `;
        const result = await db.query(query);

        const leagueTables = {};
        result.rows.forEach(row => {
            if (!leagueTables[row.leaguetableid]) {
                leagueTables[row.leaguetableid] = new LeagueTableDTO(
                    row.leaguetableid,
                    row.gamecategory,
                    row.year,
                    row.trophy,
                    row.seasongamescount,
                    row.queuenumber
                );
                leagueTables[row.leaguetableid].teams = [];
            }
            leagueTables[row.leaguetableid].teams.push(new TeamLeagueTableDTO(row.leaguetableid, row.teamid, row.points, row.teamname));
        });

        return Object.values(leagueTables);
    }

    async updateLeagueTable(leagueTableId, updates) {
        const fields = Object.keys(updates).map((field, i) => `${field} = $${i + 1}`).join(", ");
        const values = Object.values(updates);
        const query = `UPDATE leaguetable SET ${fields} WHERE leagueTableId = $${values.length + 1}`;
        try {
            await db.query(query, [...values, leagueTableId]);
            return this.getLeagueTableById(leagueTableId);
        } catch (error) {
            console.error('Error updating league table:', error);
            throw error;
        }
    }

    async deleteLeagueTable(leagueTableId) {
        const query = 'DELETE FROM leaguetable WHERE leagueTableId = $1';
        await db.query(query, [leagueTableId]);
    }
}

module.exports = new LeagueTableDAO();