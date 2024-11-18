const db = require('../database');
const LeagueTableDTO = require('../dtos/LeagueTableDTO');
const { v4: uuidv4 } = require('uuid');

class LeagueTableDAO {
    async createLeagueTable(gameCategory, year, trophy, seasonGamesCount, queueNumber) {
        const leagueTableId = uuidv4();
        const query = `
            INSERT INTO league_tables (leagueTableId, gameCategory, year, trophy, seasonGamesCount, queueNumber)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await db.query(query, [leagueTableId, gameCategory, year, trophy, seasonGamesCount, queueNumber]);
        return new LeagueTableDTO(leagueTableId, gameCategory, year, trophy, seasonGamesCount, queueNumber);
    }

    async getLeagueTableById(leagueTableId) {
        const query = 'SELECT * FROM league_tables WHERE leagueTableId = $1';
        const result = await db.query(query, [leagueTableId]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new LeagueTableDTO(row.leaguetableid, row.gamecategory, row.year, row.trophy, row.seasongamescount, row.queuenumber);
    }

    async getAllLeagueTables() {
        const query = 'SELECT * FROM league_tables';
        const result = await db.query(query);
        return result.rows.map(row =>
            new LeagueTableDTO(row.leaguetableid, row.gamecategory, row.year, row.trophy, row.seasongamescount, row.queuenumber)
        );
    }

    async updateLeagueTable(leagueTableId, updates) {
        const fields = Object.keys(updates).map((field, i) => `${field} = $${i + 1}`).join(", ");
        const values = Object.values(updates);
        const query = `UPDATE league_tables SET ${fields} WHERE leagueTableId = $${values.length + 1}`;
        await db.query(query, [...values, leagueTableId]);
    }

    async deleteLeagueTable(leagueTableId) {
        const query = 'DELETE FROM league_tables WHERE leagueTableId = $1';
        await db.query(query, [leagueTableId]);
    }
}

module.exports = new LeagueTableDAO();