class MatchDTO {
    constructor(matchId, matchDate, judge, homeTeamName, opponentTeamName, winnerTeamName) {
        this.matchId = matchId;
        this.matchDate = matchDate;
        this.judge = judge;
        this.homeTeamName = homeTeamName; // Zaktualizowano
        this.opponentTeamName = opponentTeamName; // Zaktualizowano
        this.winnerTeamName = winnerTeamName; // Zaktualizowano
    }
}

module.exports = MatchDTO;
