const mongoose = require('mongoose');
const Joi = require('joi');

const availableSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        max: 25,
        required: true
    }
})
const Available = mongoose.model('available', availableSchema);

function validate(user) {
    schema = {
        name: Joi.string().min(2).max(25).required()
    }
    return Joi.validate(user, schema);
}
module.exports.Available = Available;
module.exports.validate = validate;