let fs = require('fs')

fs.writeFile('logs/hello.log','klklkl', (error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("success");
        
    }
})