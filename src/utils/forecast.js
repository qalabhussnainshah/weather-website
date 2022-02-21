const request = require("request");
const { json } = require("stream/consumers");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d05a93aa083b2061c5df7f38c5b10157&query=" +
    latitude +
    "," +
    longitude;
  // +"&units=f";

  request({ url: url, json: true }, (error, { body }) => {
    // console.log(response.body.current);
    if (error) {
      callback("unable to connect weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        "There is " +
          body.current.temperature +
          " degrees out. There is " +
          body.current.precip +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
