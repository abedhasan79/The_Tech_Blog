const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');


//checks if the user is logged in or not
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await Post.findAll({
            include: [{ model: User, attributes: ['name'] }]
        });

        const users = userData.map((project) => project.get({ plain: true }));

        res.render('homepage', {
            users,

            // passing a boolean to handlebar
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {

    //if user is logged in then redirect to homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;



