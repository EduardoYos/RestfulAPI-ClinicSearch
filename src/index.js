const app = require('./server.js');

let port=process.env.PORT || 3000;
//Start server
app.listen(port,function(req,res){
    console.log('Server is running!');
 });