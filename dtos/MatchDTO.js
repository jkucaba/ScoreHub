class MatchDTO {
    constructor(matchId, matchDate, judge, homeTeamName, opponentTeamName, winnerTeamName) {
        this.matchId = matchId;
        this.matchDate = matchDate;
        this.judge = judge;
        this.homeTeamName = homeTeamName;
        this.opponentTeamName = opponentTeamName;
        this.winnerTeamName = winnerTeamName;
    }
}

module.exports = MatchDTO;
