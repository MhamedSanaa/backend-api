const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    owner:{
        type:String
    },
    title:{
        type : String,
        required : true,
    },
    type:{
        type : String,
        required : true,
    },
    files:[{
        name : String,
        path : String,
        contentType : String,
    }],
    collabs:[{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }]
   

})
module.exports = mongoose.model('Project',projectSchema)