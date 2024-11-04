class PlayerDTO {
    constructor(playerId, firstName, lastName, position, dateOfBirth, nationality, teamId, goalCount, assistCount, yellowCardCount, redCardCount, jerseyNumber, playedMinutes) {
        this.playerId = playerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.dateOfBirth = dateOfBirth;
        this.nationality = nationality;
        this.teamId = teamId;
        this.goalCount = goalCount;
        this.assistCount = assistCount;
        this.yellowCardCount = yellowCardCount;
        this.redCardCount = redCardCount;
        this.jerseyNumber = jerseyNumber;
        this.playedMinutes = playedMinutes;
    }
}

module.exports = PlayerDTO;
