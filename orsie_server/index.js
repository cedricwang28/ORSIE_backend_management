let express = require('express');
var cors = require('cors')
let router = require('./routes/api.js');
let bodyParser = require('body-parser');
const connectDB = require('./connection');

let app = express();

var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
  }

app.use(cors(corsOptions));

connectDB();

app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/api',router);

app.use((err,req,res,next)=>{
    res.status(422).send({error:err.message});
});

app.listen(process.env.PORT || 5000, ()=>{
    console.log('listening for request...');
});