const UserDAO = require('../daos/UserDAO');

// Pobierz wszystkich użytkowników
const getAllUsers = async (req, res) => {
    try {
        const users = await UserDAO.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
};

// Pobierz użytkownika po ID
const getUserById = async (req, res) => {
    try {
        const user = await UserDAO.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Error fetching user" });
    }
};

// Utwórz nowego użytkownika
const createUser = async (req, res) => {
    try {
        const newUser = await UserDAO.createUser(req.body.username, req.body.password);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Error creating user" });
    }
};

// Zaktualizuj użytkownika
const updateUser = async (req, res) => {
    try {
        const updatedUser = await UserDAO.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Error updating user" });
    }
};

// Usuń użytkownika
const deleteUser = async (req, res) => {
    try {
        const deleted = await UserDAO.deleteUser(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Error deleting user" });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
