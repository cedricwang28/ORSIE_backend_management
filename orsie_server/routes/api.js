let express = require('express');
let router = express.Router();
let SignUp = require('../models/signup.js');
let Admin = require('../models/admin.js');

router.post('/signup', (req,res,next)=>{
    const { email } = req.body;
    SignUp.find({email:email}).then((item)=>{
        if(item.length>=1){
            res.json({
                code:"taken"
            });
        }else{
            SignUp.create(req.body).then((data)=>{
                res.json({
                    code:"success"
                });
            }); 
        }
        
    }).catch(()=>{
        res.json({
            code:"error"
        });
    })

    
});


router.get('/login', (req,res)=>{
    
    SignUp.find({first_name:req.query.first_name}).then((data)=>{
        res.send(data);
    })
    
});

router.post('/login', (req,res)=>{
    const { _id } = req.body;
    
    SignUp.find({_id:_id}).then((data)=>{
        res.json({
            code:"success"
        });
    })
    
});

router.get('/admin_login', (req,res)=>{
    
    Admin.find({ username:userName }).then((data)=>{
        console.log(data);
        
            
    });
    
});

router.post("/admin_login", (req, res, next) => {

    //   Admin.create(req.body).then((data)=>{
    //     res.send(data); 
    //   });
    const { userName, password } = req.body;
    Admin.find({ username:userName }).then((data)=>{
        if(userName==data[0].username && password == data[0].password){
            res.json({
                code: "success"
              });
        }else{
            res.json({
                code: "fail",
                message:"Wrong password !"
              });
        }
            
    }).catch(()=>{
        res.json({
            code: "fail",
            message:"Username not exist !"
          });
    });

      
    
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