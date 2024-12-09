const UserDAO = require('../daos/UserDAO');
const jwt = require('jsonwebtoken');

class AuthController {

    async register(req, res) {
        const { username, password, email, role } = req.body;
        const user = await UserDAO.createUser(username, email, password, role);
        res.status(201).json(user);
    }

    async login(req, res) {
        const { username, password } = req.body;
        const user = await UserDAO.validateUser(username, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }

    authenticate(req, res, next) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Failed to authenticate token' });
            }
            req.userId = decoded.userId;
            req.user = decoded; // Add decoded user information to the request object
            next();
        });
    }

    admin(req, res, next) {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Access denied.' });
        }
    }
}

module.exports = new AuthController();