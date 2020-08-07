const {
    User,
    validate
} = require('../models/user');
const {
    Category
} = require('../../hire/models/category')
const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({
        email: req.body.email
    });
    if (user) return res.status(400).send('user already exist');
    const category = await Category.findById(req.body.categoryId)
    user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        category: {
            _id: category._id,
            name: category.name
        },
        password: req.body.password

    })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.save();
    const token = user.genSeekToken();
    res.header('x-auth-token', token).header('access-control-expose-headers', 'x-auth-token').send(user);
})

module.exports = router;