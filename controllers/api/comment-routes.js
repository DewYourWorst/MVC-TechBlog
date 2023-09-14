const router = require('express').Router();
const { Comment } = require('../../models/')
const authorize = require('../../utils/auth')

router.post('/', authorize, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            userId: req.session.userId,
        });
        res.json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;