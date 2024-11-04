const MatchDTO = require('../dtos/MatchDTO');

class MatchDAO {
    async createMatch(matchDate, judge, homeTeamId, opponentTeamId, matchWinnerId) {}
    async getMatchById(matchId) {}
    async getAllMatches() {}
    async updateMatch(matchId, updates) {}
    async deleteMatch(matchId) {}
}

module.exports = new MatchDAO();
