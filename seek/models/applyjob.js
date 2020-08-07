const mongoose = require('mongoose');
const Joi = require('joi');

const applyJobSchema = new mongoose.Schema({
    candidate: new mongoose.Schema({
        lastname: String,
        firstname: String,
        email: String
    }),
    job: new mongoose.Schema({
        title: String,
        user: String
    }),
    date: {
        type: Date,
        default: Date.now
    }
})
const Apply = mongoose.model('apply', applyJobSchema);

function validate(apply) {
    const schema = {
        candidateId: Joi.string().required(),
        jobId: Joi.string().required()
    }
    return Joi.validate(apply, schema)
}
module.exports.Apply = Apply;
module.exports.validate = validate;