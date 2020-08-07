const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        min: 5,
        max: 25,
        required: true
    }
})
const Category = mongoose.model('category', categorySchema)

function validate(category) {
    const schema = {
        name: Joi.string().min(5).max(25).required()
    }
    return Joi.validate(category, schema)
}
module.exports.Category = Category
module.exports.validate = validate;