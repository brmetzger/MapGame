//Require external modules
const fs = require("fs");
const http = require("http");
    const port = 80;
const ip = require("ip");

fs.readFile('./web/index.html', (err, html) => {
    if (err) {
        //Failed to load file
        throw err; 
    };
    //Create the server
    let server = http.createServer((request,response) => {
        response.writeHeader(200, {"Content-Type":"text/html"});
        response.end(html.toString().replace("${IPADDRESS}",ip.address()));
    });
    
    //Listen to the server
    server.listen(port);
    console.log(`Map game running on port ${port}`);
});