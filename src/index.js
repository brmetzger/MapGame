//Require external modules
const FS = require("fs");
const HTTP = require("http");
    const PORT = 80;
const IP = require("ip");

//Require internal modules
const LOCATIONS = require("./data/locations.json");

FS.readFile('./web/index.html', (err, html) => {
    if (err) {
        //Failed to load file
        throw err; 
    };
    //Create the server
    let server = HTTP.createServer((request,response) => {
        if (request.url == "/locations.json") {
            //Get the list of locations
            response.writeHeader(200);
            response.end(JSON.stringify(LOCATIONS));
        } else {
            //Loaded the web page normally
            response.writeHeader(200, {"Content-Type":"text/html"});
            response.end(html.toString().replace("${IPADDRESS}",IP.address()));
        };
    });
    
    //Listen to the server
    server.listen(PORT);
    console.log(`Map game running on port ${PORT}`);
});