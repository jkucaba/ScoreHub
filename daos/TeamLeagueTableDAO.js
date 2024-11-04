const TeamLeagueTableDTO = require('../dtos/TeamLeagueTableDTO');

class TeamLeagueTableDAO {
    async createTeamLeagueTableEntry(leagueTableId, teamId, points) {}
    async getTeamLeagueTableEntry(leagueTableId, teamId) {}
    async updateTeamLeagueTableEntry(leagueTableId, teamId, points) {}
    async deleteTeamLeagueTableEntry(leagueTableId, teamId) {}
}

module.exports = new TeamLeagueTableDAO();
