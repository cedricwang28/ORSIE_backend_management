let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let adminSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

let Admin = mongoose.model('administrator',adminSchema);

module.exports = Admin;