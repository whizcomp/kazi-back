const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const Joi = require('joi')
const {
    User
} = require('../models/user');


router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send('! invalid user or password');
    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if (!validatePassword) return res.status(400).send('! invalid user or password');
    const token = user.genSeekToken();
    res.send(token);
})


function validate(user) {
    const schema = {
        email: Joi.string().min(3).email().max(255).trim().required(),
        password: Joi.string().min(6).max(255).required()
    }
    return Joi.validate(user, schema)
}
module.exports = router;