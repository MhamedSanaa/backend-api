const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type : String,
        required : true,
    },
    roles:{
        Annotator:{
            type : Number,
            default : 2001
        },
        Validator:{
            type : Number,
            default : 1984
        },
        Admin:{
            type : Number,
            default : 5150
        }
    },
    password:{
        type : String,
        required : true
    },
    refreshToken : String
});
module.exports = mongoose.model('User',userSchema)