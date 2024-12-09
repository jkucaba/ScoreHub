const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');

router.get('/', CommentController.getAllComments);
router.get('/:matchId', CommentController.getCommentsByMatchId);
router.post('/', CommentController.createComment);
router.delete('/:id', CommentController.deleteComment);

module.exports = router;
