const MatchEventDTO = require('../dtos/MatchEventDTO');

class MatchEventDAO {
    async createMatchEvent(matchId, playerId, eventType, context) {}
    async getMatchEventsByMatchId(matchId) {}
    async deleteMatchEvent(matchEventId) {}
}

module.exports = new MatchEventDAO();
