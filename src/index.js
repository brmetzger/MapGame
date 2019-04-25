//Require external modules
const fs = require("fs");
const http = require("http");

fs.readFile('./web/index.html', (err, html) => {
    if (err) {
        //Failed to load file
        throw err; 
    };
    //Create the server
    http.createServer((request,response) => {
        response.writeHeader(200, {"Content-Type":"text/html"});  
        response.end(html);
    }).listen(80);
});