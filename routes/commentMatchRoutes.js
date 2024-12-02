const express = require('express');
const router = express.Router();
const CommentMatchController = require('../controllers/commentMatchController');

router.get('/', CommentMatchController.getAllCommentMatches);
router.get('/:id', CommentMatchController.getCommentMatchById);
router.post('/', CommentMatchController.createCommentMatch);
router.put('/:id', CommentMatchController.updateCommentMatch);
router.delete('/:id', CommentMatchController.deleteCommentMatch);

module.exports = router;