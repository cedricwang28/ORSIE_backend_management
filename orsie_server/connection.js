const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const URI ="mongodb+srv://durhamcollege:durhamcollege@durhamcollege-ak9uh.mongodb.net/DC?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('db connected..!');
};

module.exports = connectDB;
