const express = require('express');
const _ = require('lodash')

const bcrypt = require('bcrypt')
const router = express.Router();
const {
    validate,
    Signup
} = require('../models/signup');

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await Signup.findOne({
        email: req.body.email
    });
    if (user) return res.status(400).send('user already registered');
    user = new Signup(_.pick(req.body, ['username', 'email', 'password']));
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.genAuthToken();
    res.header('x-auth-token', token).header('access-control-expose-headers', 'x-auth-token').send(_.pick(user, ['_id', 'username', 'email', 'isHirer']));

})

module.exports = router;