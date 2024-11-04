class MatchDTO {
    constructor(matchId, matchDate, judge, homeTeamId, opponentTeamId, matchWinnerId) {
        this.matchId = matchId;
        this.matchDate = matchDate;
        this.judge = judge;
        this.homeTeamId = homeTeamId;
        this.opponentTeamId = opponentTeamId;
        this.matchWinnerId = matchWinnerId;
    }
}

module.exports = MatchDTO;
