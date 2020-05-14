let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let yearSchema = new Schema({
    year:{
        type:String,
        required:true
    },
    active:{
        type:Boolean
    }
});

let Year = mongoose.model('year',yearSchema);

module.exports = Year;