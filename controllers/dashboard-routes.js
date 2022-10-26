const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const PostData = await Post.findAll({
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
        res.render('homepage', {
            layout: 'dashboard',
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/newPost', (req,res) => {
    res.render('newPost', {
        layout: 'dashboard'
    });
});
module.exports = router;