let express = require('express');
let router = express.Router();
let Orsie = require('../models/model.js');
let SignUp = require('../models/signup.js');

router.post('/signup', (req,res,next)=>{
    
    SignUp.create(req.body).then((data)=>{
        res.send(data);
    }).catch(next); 
});


router.get('/login', (req,res)=>{
    
    SignUp.find({first_name:req.query.first_name}).then((data)=>{
        res.send(data);
    })
    
});

router.get('/os/:id', (req,res,next)=>{
    Orsie.find({_id:req.params.id}).then((data)=>{
        res.send(data);
    });
});

router.post('/os', (req,res,next)=>{
    // let uber = new Uber();
    // uber.save();
    Orsie.create(req.body).then((data)=>{
        res.send(data);
    }).catch(next); 
});

router.delete('/os/:id', (req,res,next)=>{
    Orsie.findByIdAndRemove({_id:req.params.id}).then((data)=>{
        res.send(data);
    });
});

router.put('/os/:id', (req,res,next)=>{
    Orsie.findByIdAndUpdate({_id:req.params.id},req.body).then(()=>{
        Uber.findOne({_id:req.params.id}).then((data)=>{
            res.send(data);
        });
    });
});


module.exports = router;