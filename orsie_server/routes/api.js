let express = require('express');
let nodemailer = require('nodemailer');
let router = express.Router();
let SignUp = require('../models/signup.js');
let Admin = require('../models/admin.js');
let Event = require('../models/event.js');
let content = require('../email.js');
require('dotenv').config();





router.post('/signup', (req,res,next)=>{
    const { email,full_name} = req.body;

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

                var transporter = nodemailer.createTransport({
                    host: 'smtp.hostinger.com',
                    port:587,
                    secure:false,
                    auth: {
                      user: 'me@cedricwang.com',
                      pass: 'wtw651125'
                    },
                    tls:{
                        rejectUnauthorized:false
                    }
                  });
                  
                  var mailOptions = {
                    from: 'me@cedricwang.com',
                    to: email,
                    subject: 'Sending Email using Node.js',
                    html: content.template
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        res.send(error);
                    } else {
                      res.send('Email sent: ' + info.response);
                    }
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
    
    SignUp.find({first_name:req.query.first_name, last_name:req.query.last_name}).then((data)=>{
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
                message:"Wrong password!"
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

    })
    
});

router.delete('/users/:id', (req, res, next) => {
    SignUp.findByIdAndRemove({_id:req.params.id}).then((data)=>{
        res.send(data);
    });
});



router.post('/search', function (req, res, next) {

    const { searchTxt } = req.body;

    if(searchTxt==''){
        SignUp.find().then((data)=>{
            res.send(data);
        })
    }else{
        SignUp.find({$or:[
            {full_name:{$regex:searchTxt}},
            {email:{$regex:searchTxt}},
            {organization:{$regex:searchTxt}},
            {role:{$regex:searchTxt}},
            {year:{$regex:searchTxt}}
        ]
        })
        .then((data)=>{
            res.send(data);
        })
    }
    
});

router.post('/filter', function (req, res, next) {

    const {idFilter, yearFilter} = req.body;

    if(idFilter=='' && yearFilter==''){
        SignUp.find().then((data)=>{
            res.send(data);
        })
    }else if(idFilter==''){
        SignUp.find({year:yearFilter}).then((data)=>{
            res.send(data);
        })
    }else if(yearFilter==''){
        SignUp.find({role:idFilter}).then((data)=>{
            res.send(data);
        })
    }else{
        SignUp.find({role:idFilter,year:yearFilter}).then((data)=>{
            res.send(data);
        })
    }
    
    
});

router.post('/chooseEvent', function (req, res, next) {

    const {eventFilter} = req.body;
    SignUp.find({attend: { $eq: eventFilter }}).then((data)=>{
        res.send(data);
    })
    
    
    
});


router.post('/year', function (req, res, next) {

    const {selectYear } = req.body;

    if(selectYear==""){
        Event.find().then((data)=>{
            res.send(data);
        })
    }else{
        Event.find({year:selectYear}).then((data)=>{
            res.send(data);
        })
    }
    
});

router.post('/event', (req, res, next) => {
    Event.create(req.body).then((data)=>{
        res.json({
            code: "success"
        });
    })
    
});


router.post('/addSchedule', (req, res, next) => {
    let {zone, data} = req.body
    // Event.update({zone:zone},{$set:{
    //     schedule:data
    // }}).then((data)=>{
    //     res.send(data)
    // })

    Event.update({zone:zone},{$set:{
        popup:data
    }}).then((data)=>{
        res.send(data)
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
    // const  thePopup =  req.body.popup;
    // let cao = JSON.parse(thePopup)

    Event.findByIdAndUpdate({_id:req.params.id},req.body).then(()=>{

        Event.findByIdAndUpdate({_id:req.params.id}, {$addToSet:{popup:{}}}).then((data)=>{
            res.json({
                code: "success"
            });
        });
        // Event.find({_id:req.params.id}).then((data)=>{
        //     res.json({
        //         code: "success"
        //     });
        // });
    });
});

router.delete('/events/:id', (req, res, next) => {
    Event.findByIdAndRemove({_id:req.params.id}).then((data)=>{
        res.send(data);
    });
});


router.get('/attend/add', (req,res,next)=>{
    let {email,zone} = req.query
    SignUp.findOneAndUpdate({email:email}, {$addToSet:{attend:zone}}).then((data)=>{
        res.json({
            code: "success"
        });
    });

});

router.get('/attend/remove', (req,res,next)=>{
    let {email,zone} = req.query
    SignUp.findOneAndUpdate({email:email}, {$pull:{attend:zone}}).then((data)=>{
        res.json({
            code: "success"
        });
    });

});


router.get('/attend/preload', (req,res,next)=>{
    let {email} = req.query
    SignUp.find({email:email}).then((data)=>{
        res.send(data);
    });

});






module.exports = router;