const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const PostData = await Post.findAll({
            where:{"user_id": req.session.user_id},
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize data so the template can read it
        const posts = PostData.map((project) => project.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('post', {
            layout: 'dashboard',
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/editPost/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        const posts = postData.get({ plain: true });

        res.render('edit-post', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/newPost', (req, res) => {
    res.render('newPost', {
        layout: 'dashboard'
    });
});
module.exports = router;