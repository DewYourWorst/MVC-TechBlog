const router = require('express').Router();
const { Post } = require('../models/');
const authorize = require('../utils/auth');

router.get('/', authorize, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                userId: req.session.userId,
            },
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts-admin', {
            layout: 'dashboard',
            posts,
        });
    } catch (err) {
        res.redirect('login');
    }
});

router.get('/edit/:id', authorize, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if(postData) {
            const post = postData.get({ plain: true });

            res.render('edit-post', {
                layout: 'dashboard',
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

router.get('/new', authorize, (req, res) => {
    res.render('new-post', {
        layout:'dashboard',
    });
});

module.exports = router;