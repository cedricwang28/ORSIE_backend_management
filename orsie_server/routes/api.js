let express = require('express');
let router = express.Router();
let SignUp = require('../models/signup.js');
let Admin = require('../models/admin.js');
let Event = require('../models/event.js');

let fs = require('fs')



// fs.writeFile('logs/hello.txt','fkccp', (error)=>{
//     if(error){
//         console.log(error);
//     }else{
//         console.log("success");
        
//     }
// })



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


router.get('/users', (req, res, next) => {
    SignUp.find().then((data)=>{
        res.send(data);

        fs.writeFile('logs/hello.txt',data, (error)=>{
            if(error){
                console.log(error);
            }else{
                console.log("success");
                
            }
        })
    })
    
});

router.delete('/users/:id', (req, res, next) => {
    SignUp.findByIdAndRemove({_id:req.params.id}).then((data)=>{
        res.send(data);
    });
});


router.get('/download', function (req, res, next) {

    res.download('./logs/hello.txt', 'hello1.log');
    
});

router.post('/event', (req, res, next) => {
    Event.create(req.body).then((data)=>{
        res.json({
            code: "success"
        });
    })
    
});

router.get('/events', (req, res, next) => {
    Event.find().then((data)=>{
        res.send(data);
    })
    
});

router.get('/events/:id', (req, res, next) => {
    Event.find({_id:req.params.id}).then((data)=>{
        res.send(data);
    })
    
});

router.put('/events/:id', (req,res,next)=>{
    Event.findByIdAndUpdate({_id:req.params.id},req.body).then(()=>{
        Event.find({_id:req.params.id}).then((data)=>{
            res.json({
                code: "success"
            });
        });
    });
});

router.delete('/events/:id', (req, res, next) => {
    Event.findByIdAndRemove({_id:req.params.id}).then((data)=>{
        res.send(data);
    });
});







module.exports = router;