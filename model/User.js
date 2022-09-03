const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
        default: true
    },
    supervisor: {
        type: Boolean,
        default: false,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    projects: [{
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        },
        role: String,

    }],
    refreshToken: String
});
module.exports = mongoose.model('User', userSchema)