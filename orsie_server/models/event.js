let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let eventSchema = new Schema({
    name:{
        type:String,
        required:true
    }
});

let Event = mongoose.model('event',eventSchema);

module.exports = Event;