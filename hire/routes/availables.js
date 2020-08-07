const {
    Available,
    validate
} = require('../models/available');
const auth = require('../../middleware/auth')
const express = require('express');
const router = express.Router();

router.post('/', auth, async (req, res) => {
    const {
        error
    } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const available = new Available({
        name: req.body.name
    })
    await available.save();
    res.send(available)
})
router.get('/', async (req, res) => {
    const availables = await Available.find({});
    res.send(availables)
})
router.put('/:id', [auth], async (req, res) => {
    const {
        error
    } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    const available = await Available.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {
        new: true
    })
    res.send(available)
})
router.delete('/:id', auth, async (req, res) => {
    const available = await Available.findByIdAndRemove(req.params.id);
    if (!available) return res.status(404).send('type not found');
    res.send(available)
})
module.exports = router;