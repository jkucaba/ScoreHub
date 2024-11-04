class UserDTO {
    constructor(userId, username, email, role, createdAt, updatedAt) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = UserDTO;
