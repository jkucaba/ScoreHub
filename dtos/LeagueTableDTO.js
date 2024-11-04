class LeagueTableDTO {
    constructor(leagueTableId, gameCategory, year, trophy, seasonGamesCount, queueNumber) {
        this.leagueTableId = leagueTableId;
        this.gameCategory = gameCategory;
        this.year = year;
        this.trophy = trophy;
        this.seasonGamesCount = seasonGamesCount;
        this.queueNumber = queueNumber;
    }
}

module.exports = LeagueTableDTO;
