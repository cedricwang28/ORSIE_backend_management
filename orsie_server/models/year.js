let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let yearSchema = new Schema({
    year:{
        type:String,
        required:true
    }
});

let Year = mongoose.model('year',yearSchema);

module.exports = Year;