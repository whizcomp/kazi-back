const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    lastname: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
        unique: true
    },
    category: new mongoose.Schema({
        type: String
    }),
    password: {
        type: String,
        minlength: 6,
        maxlength: 1024,
        required: true,
    },
    isHirer: {
        type: Boolean,
        default: false
    }
})
userSchema.methods.genSeekToken = function () {
    return jwt.sign({
        id: this._id,
        firstname: this.firstname,
        isHirer: this.isHirer
    }, 'whiz')
}
const User = mongoose.model('user', userSchema);

function validate(user) {
    const schema = {
        firstname: Joi.string().min(3).max(25).required(),
        lastname: Joi.string().min(3).max(25).required(),
        email: Joi.string().email().min(3).max(255).required(),
        categoryId: Joi.string().required(),
        password: Joi.string().min(6).max(255).required()
    }
    return Joi.validate(user,schema)
}
module.exports.User = User;
module.exports.validate = validate;