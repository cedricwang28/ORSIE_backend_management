let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let orsieSchema = new Schema({
    name:{
        type:String,
        required:[true,'name is required']
    }
});

let Orsie = mongoose.model('orsie',orsieSchema);

module.exports = Orsie;