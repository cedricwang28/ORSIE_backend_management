let express = require('express');
let router = express.Router();
let Orsie = require('../models/model.js');

router.get('/os', (req,res)=>{
    Orsie.find().then((data)=>{
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