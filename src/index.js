//Require external modules
const FS = require("fs");
const HTTP = require("http");
    const PORT = 80;
const IP = require("ip");

//Require internal modules
const LOCATIONS_EUROPE = require("./locations/europe.json");
const LOCATIONS_US = require("./locations/usa.json");
function getWorldLocations() {
    return LOCATIONS_EUROPE.concat(LOCATIONS_US);
};

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
            response.end(JSON.stringify(getWorldLocations()));
        } else if (request.url == "/europe.json") {
            //Get the list of locations in Europe
            response.writeHeader(200);
            response.end(JSON.stringify(LOCATIONS_EUROPE));
        } else if (request.url == "/usa.json") {
            //Get the list of locations in Europe
            response.writeHeader(200);
            response.end(JSON.stringify(LOCATIONS_US));
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