//Require internal modules
exports.LOCATIONS = {
    "EUROPE":require("./europe.json"),
    "MIDDLEEAST":require("./middleeast.json"),
    "US":require("./usa.json")
}

//Return all locations
exports.GetAll = function() {
    let locationOutput = [];
    for (let locationKey in this.LOCATIONS) {
        locationOutput = locationOutput.concat(this.LOCATIONS[locationKey]);
    };
    return locationOutput;
};