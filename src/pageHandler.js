//Require external modules
const IP = require("ip");

//Require internal modules
const LOCATION_HANDLER = require("./locations/handler.js");

exports.GetLocations = function(location) {
    return function(html) {
        //Load the web page
        let locationData = {
            "Status":200,
        };

        let outputPage;
        if (location == "ALL") {
            outputPage = LOCATION_HANDLER.GetAll();
        } else {
            outputPage = LOCATION_HANDLER.LOCATIONS[location];
        };

        //Complete the response
        locationData["Body"] = JSON.stringify(outputPage);
        return locationData;
    };
};

exports.PlayGame = function(location) {
    return function(html) {
        //Load the web page
        let gameData = {
            "Status":200,
            "Head-Data":{"Content-Type":"text/html"}
        };

        let outputPage = html.toString();
        if (location != "ALL") {
            outputPage = outputPage.replace("locations.json",`${location.toLowerCase()}.json`)
        };
        
        //Complete the response
        gameData["Body"] = outputPage.toString().replace("${IPADDRESS}",IP.address());
        return gameData;
    };
};

//Setup functions for all different links
const PAGE_FUNCTIONS = {
    "/locations.json":this.GetLocations("ALL"),
    "/europe.json":this.GetLocations("EUROPE"),
    "/usa.json":this.GetLocations("US"),
    "/middleeast.json":this.GetLocations("MIDDLEEAST"),
    "/europe":this.PlayGame("EUROPE"),
    "/middleeast":this.PlayGame("MIDDLEEAST"),
    "/usa":this.PlayGame("US")
};

//Handle the webpage
exports.Handle = function(request,html) {
    if (request.url in PAGE_FUNCTIONS) {
        return PAGE_FUNCTIONS[request.url](html);
    } else {
        //Send default page
        return this.PlayGame("ALL")(html);
    };
}; 