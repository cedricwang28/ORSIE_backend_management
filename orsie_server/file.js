let fs = require('fs')
var request = require("request");

fs.writeFile('logs/hello.txt','fkccp',null, (error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("success");
        
    }
})





// request({uri: 'logs/hello.pdf', headers: { 'Content-type' : 'applcation/pdf' }} , function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     fs.writeFileSync("logs/hello.pdf", "body",
//       {
//         encoding :'base64',
//       }
//     );
//   }
// })