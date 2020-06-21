const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('index.html', function(error, data){
        if(error){
            res.writeHead(404);
            res.write('Error: file not found');
        }
        else{
            res.write(data);
        }
        res.end();
    });
});

server.listen(port, function(err){
    if(err){
        console.log('something went wrong', err);
    }
    else{
        console.log('server listening at port: '+ port);
    }
});