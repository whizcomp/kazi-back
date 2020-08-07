const mongoose = require('mongoose');
const Joi = require('joi');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 2,
        maxlength: 25,
        required: true
    },
    user: new mongoose.Schema({
        name: String
    }),
    available: new mongoose.Schema({
        name: String
    }),
    category: new mongoose.Schema({
        name: String
    }),
    place: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    requirements: {
        type: String,
        minlength: 10,
        maxlength: 1000,
        required: true
    },
    responsibilities: {
        type: String,
        minlength: 10,
        maxlength: 1000,
        required: true
    },
    qualification: {
        type: String,
        minlength: 10,
        maxlength: 1000,
        required: true
    },
    experience: {
        type: String,
        minlength: 1,
        maxlength: 25,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    numberOfemployees: {
        type: Number,
        min: 1,
        max: 10000,
        required: true
    },
    company: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    }
})
const Post = mongoose.model('post', postSchema);

function validatePost(post) {
    schema = {
        title: Joi.string().min(2).max(25).required(),

        availableId: Joi.string().min(10).max(255).required(),
        categoryId: Joi.string().min(10).max(255).required(),
        place: Joi.string().min(3).max(255).required(),
        requirements: Joi.string().min(10).max(1000).required(),
        responsibilities: Joi.string().min(10).max(1000).required(),
        qualification: Joi.string().min(10).max(1000).required(),
        experience: Joi.string().min(1).max(25).required(),
        numberOfemployees: Joi.number().min(1).max(10000).required(),
        company: Joi.string().min(3).max(255).required()
    }
    return Joi.validate(post, schema)
}
module.exports.Post = Post;
module.exports.validate = validatePost