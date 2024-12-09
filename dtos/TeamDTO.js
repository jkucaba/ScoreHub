class TeamDTO {
    constructor(teamId, teamName, foundedYear, stadium, city, country, coach, stadiumCapacity,  createdAt, updatedAt) {
        this.teamId = teamId;
        this.teamName = teamName;
        this.foundedYear = foundedYear;
        this.stadium = stadium;
        this.city = city;
        this.country = country;
        this.coach = coach;
        this.stadiumCapacity = stadiumCapacity;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = TeamDTO;
