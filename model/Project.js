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
    files: [{
        name: String,
        path: String,
        contentType: String,
        annotation: String,
        annotatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        annotatedOn: Date,
        validation: Boolean,
        validatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        validatedOn: Date,
    }],
    collabs: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        role: String
    }]


})
module.exports = mongoose.model('Project', projectSchema)