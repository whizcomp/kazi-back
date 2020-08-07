const {
    Apply
} = require('../models/applyjob');
const {
    User
} = require('../models/user');
const {
    Post
} = require('../../hire/models/postjob');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authSeek')

router.post('/', auth, async (req, res) => {

    const candidate = await User.findById(req.user.id);
    if (!candidate) return res.status(404).send('candidate\'s details not available');
    const post = await Post.findById(req.body.postId);
    if (!post) return res.status(404).send('post details not available');
    const apply = new Apply({
        candidate: {
            _id: candidate._id,
            email: candidate.email,
            lastname: candidate.lastname
        },
        job: {
            _id: post._id,
            title: post.title,
            user: post.user
        }
    })
    await apply.save();
    res.send(apply);
});
router.get('/', auth, async (req, res) => {
    const application = await Apply.find({
        'candidate._id': req.user.id
    }).sort('date');
    res.send(application);
})
router.delete('/:id', auth, async (req, res) => {
    const application = await Apply.findById(req.params.id);
    if (!application) return res.status(404).send('application does not exist');
    res.send(application)
})
module.exports = router;