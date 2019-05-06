//Require external modules
const FS = require("fs");
const HTTP = require("http");
    const PORT = 80;
const IP = require("ip");

//Require internal modules
const PAGE_HANDLER = require("./pageHandler.js");

FS.readFile('./web/index.html', (err, html) => {
    if (err) {
        //Failed to load file
        throw err; 
    };
    //Create the server
    let server = HTTP.createServer((request,response) => {
        //Log the request
        console.log(`Request for ${request.url} made from ${request.connection.remoteAddress}`);

        //Send back the response
        let responseData = PAGE_HANDLER.Handle(request,html);
        response.writeHeader(responseData["Status"],responseData["Head-Data"]);
        response.end(responseData["Body"]);
    });
    
    //Listen to the server
    server.listen(PORT);
    console.log(`Map game running on ${IP.address()}:${PORT}`);
});