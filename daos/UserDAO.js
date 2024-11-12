// daos/UserDAO.js
const db = require('../database');
const UserDTO = require('../dtos/UserDTO');
const { v4: uuidv4 } = require('uuid');

class UserDAO {

    async createUser(username, email, password, role) {
        const userId = uuidv4();
        const createdAt = new Date();
        const updatedAt = new Date();

        const query = `
            INSERT INTO AppUser (userId, username, email, password, role, createdAt, updatedAt)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        await db.query(query, [userId, username, email, password, role, createdAt, updatedAt]);

        return new UserDTO(userId, username, email, role, createdAt, updatedAt);
    }

    async getUserById(userId) {
        const query = 'SELECT * FROM AppUser WHERE userId = $1';
        const result = await db.query(query, [userId]);

        if (result.rows.length === 0) return null;

        const row = result.rows[0];
        return new UserDTO(row.userid, row.username, row.email, row.role, row.createdat, row.updatedat);
    }

    async getUserByUsername(username) {
        const query = 'SELECT * FROM AppUser WHERE username = $1';
        const result = await db.query(query, [username]);

        if (result.rows.length === 0) return null;

        return result.rows[0];
    }

    async getAllUsers() {
        const query = 'SELECT * FROM AppUser';
        const result = await db.query(query);

        return result.rows.map(row =>
            new UserDTO(row.userid, row.username, row.email, row.role, row.createdat, row.updatedat)
        );
    }

    async updateUser(userId, username, email, role) {
        const updatedAt = new Date();
        const query = `
            UPDATE AppUser SET username = $1, email = $2, role = $3, updatedAt = $4 WHERE userId = $5
        `;
        await db.query(query, [username, email, role, updatedAt, userId]);
    }

    async deleteUser(userId) {
        const query = 'DELETE FROM AppUser WHERE userId = $1';
        await db.query(query, [userId]);
    }

    async validateUser(username, password) {
        const user = await this.getUserByUsername(username);
        if (!user) return null;
        if (password !== user.password) return null;
        return user;
    }

}

module.exports = new UserDAO();