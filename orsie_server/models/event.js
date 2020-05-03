let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let eventSchema = new Schema({
    zone:{
        type:String,
        required:true
    },
    mapId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    schedule:{
        type:Array
    },
    popup:{
        type:Array
    }
});

let Event = mongoose.model('event',eventSchema);

module.exports = Event;