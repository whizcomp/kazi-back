const {
    Post,
    validate
} = require('../models/postjob')
const auth = require('../../middleware/auth')
const {
    Available
} = require('../models/available')
const {
    Signup
} = require('../models/signup')
const {
    Category
} = require('../models/category')
const express = require('express');
const router = express.Router();

router.post('/', [auth], async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await Signup.findById(req.user._id)
    if (!user) return res.status(404).send('user doesnt exist')
    const available = await Available.findById(req.body.availableId);
    if (!available) return res.status(404).send('type not found');
    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(404).send('type not found');
    const post = new Post({
        title: req.body.title,
        user: {
            name: user.username,
            _id: user._id
        },
        available: {
            _id: available._id,
            name: available.name
        },
        category: {
            _id: category._id,
            name: category.name
        },
        place: req.body.place,
        requirements: req.body.requirements,
        responsibilities: req.body.responsibilities,
        qualification: req.body.qualification,
        experience: req.body.experience,
        numberOfemployees: req.body.numberOfemployees,
        company: req.body.company
    })
    await post.save();
    res.send(post)
})
router.get('/', async (req, res) => {
    const posts = await Post.find({}).sort('-date')
    res.send(posts)
})
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).send('post not found')
    res.send(post)
})
router.delete('/:id', [auth], async (req, res) => {
    const posts = await Post.findByIdAndRemove(req.params.id)
    if (!posts) return res.status(400).send('post not found')
    res.send(posts)
})
router.put('/:id', [auth], async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const available = await Available.findById(req.body.availableId);
    if (!available) return res.status(404).send('type not found');
    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(404).send('type not found');
    const post = await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        available: {
            name: available.name
        },
        category: {
            _id: category._id,
            name: category.name
        },
        place: req.body.place,
        requirements: req.body.requirements,
        responsibilities: req.body.responsibilities,
        qualification: req.body.qualification,
        experience: req.body.experience,
        numberOfemployees: req.body.numberOfemployees,
        // company:user.username
    }, {
        new: true
    });
    res.send(post)
})
module.exports = router;