let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let signup = new Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    full_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    organization:{
        type:String
    },
    city:{
        type:String
    },
    province:{
        type:String
    },
    role:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    attend:{
        type:Array
    }

});

let SignUp = mongoose.model('signup',signup);

module.exports = SignUp;