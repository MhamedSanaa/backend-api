const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title:{
        type : String,
        required : true,
    },
    type:{
        type : String,
        required : true,
    },
    files:{
        type : String,
        required : true,
    },
    collabs:[{
        username : String
    }]

})
module.exports = mongoose.model('Project',projectSchema)