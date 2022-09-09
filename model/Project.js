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
        annotationVocal: String,
        validationVocal: String
    }],
    collabs: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        role: String
    }]


})

projectSchema.pre('deleteOne', function (next) {
    const projecID = this.getQuery()["_id"];
    mongoose.model("User").updateMany(
        { 'projects.project': projecID },
        { $pull: { projects: { project: { _id: projecID } } } },
        function (err, result) {
            if (err) {
                console.log(`[error] ${err}`);
                next(err);
            } else {
                console.log('success');
                next();
            }
        });
});
module.exports = mongoose.model('Project', projectSchema)