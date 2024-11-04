const LineupDTO = require('../dtos/LineupDTO');

class LineupDAO {
    async createLineup(matchId, playerId) {}
    async getLineupByMatchId(matchId) {}
    async deleteLineup(lineupId) {}
}

module.exports = new LineupDAO();
