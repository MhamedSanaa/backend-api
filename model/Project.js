const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    // verify if owner have a special role
    owner: {
        type: String
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    na: {
        type: Number,
        default: 0
    },
    nv: {
        type: Number,
        default: 0
    },
    files: [{
        name: String,
        path: String,
        contentType: String,
        annotation: String,
        annotatedBy: String,
        annotatedOn: String,
        validation: String,
        validatedBy: String,
        validatedOn: String,
    }],
    collabs: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        role: String
    }]


})
module.exports = mongoose.model('Project', projectSchema)