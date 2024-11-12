
const RatingDAO = require('../daos/RatingDAO');

class RatingController {
    async createRating(req, res) {
        const { ratingValue, comment, userId, teamId } = req.body;
        try {
            const rating = await RatingDAO.createRating(ratingValue, comment, userId, teamId);
            res.status(201).json(rating);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRatingById(req, res) {
        const { ratingId } = req.params;
        try {
            const rating = await RatingDAO.getRatingById(ratingId);
            if (!rating) {
                return res.status(404).json({ error: 'Rating not found' });
            }
            res.status(200).json(rating);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllRatings(req, res) {
        try {
            const ratings = await RatingDAO.getAllRatings();
            res.status(200).json(ratings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateRating(req, res) {
        const { ratingId } = req.params;
        const { ratingValue, comment } = req.body;
        try {
            await RatingDAO.updateRating(ratingId, ratingValue, comment);
            res.status(200).json({ message: 'Rating updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteRating(req, res) {
        const { ratingId } = req.params;
        try {
            await RatingDAO.deleteRating(ratingId);
            res.status(200).json({ message: 'Rating deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new RatingController();