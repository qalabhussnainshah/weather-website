const request = require("request");
const { json } = require("stream/consumers");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?types=place%2Cpostcode%2Caddress%2Clocality&access_token=pk.eyJ1IjoicWFsYWJodXNzbmFpbiIsImEiOiJja3ppY3dueG4zbHluMnZuOXN2Z3R5ZWxkIn0.pLwrWX-NgepiW2ixmS4i2g";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
