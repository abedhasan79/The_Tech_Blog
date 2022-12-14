const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');


//Get comment
router.get('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.findAll({include: [User],});

        const comments = newComment.map((cmnt) => cmnt.get({ plain: true }));
        // res.status(200).json(comment);

        res.render('post-comment', {
            comments,
            loggedIn: req.session.loggedIn,
        });


    } catch (err) {
        res.status(400).json(err);
    }
});

//create a comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});



module.exports = router;