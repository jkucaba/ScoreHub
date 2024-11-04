const LeagueTableDTO = require('../dtos/LeagueTableDTO');

class LeagueTableDAO {
    async createLeagueTable(gameCategory, year, trophy, seasonGamesCount, queueNumber) {}
    async getLeagueTableById(leagueTableId) {}
    async getAllLeagueTables() {}
    async updateLeagueTable(leagueTableId, updates) {}
    async deleteLeagueTable(leagueTableId) {}
}

module.exports = new LeagueTableDAO();
