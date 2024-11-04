class MatchEventDTO {
    constructor(matchEventId, matchId, playerId, eventType, context) {
        this.matchEventId = matchEventId;
        this.matchId = matchId;
        this.playerId = playerId;
        this.eventType = eventType;
        this.context = context;
    }
}

module.exports = MatchEventDTO;
