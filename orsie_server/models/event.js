let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let eventSchema = new Schema({
    zone:{
        type:String,
        required:true
    },
    mapId:{
        type:String
    },
    name:{
        type:String,
        required:true
    },
    location:{
        type:String
    },
    time:{
        type:String
    },
    year:{
        type:String,
        required:true
    },
    discription:{
        type:String
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