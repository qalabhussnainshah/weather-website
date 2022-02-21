const path = require("path");
const express = require("express");
const exp = require("constants");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setuo static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Qalab Hussnain Shah",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Qalab Hussnain Shah",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Qalab Hussnain Shah",
  });
});

// app.get("", (req, res) => {
//   res.send("hello express");
// });

// app.get("/help", (req, res) => {
//   res.send("<h1>help page</h1>");
// });

// app.get("/about", (req, res) => {
//   res.send({
//     name: "Qalab",
//     age: 24,
//     data: ["Zeeshan", "Sardar", "Hammad"],
//   });
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must provide an address",
    });
  } else {
    geoCode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }
        // console.log("Error", error);
        // console.log("Data", data);
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address,
          });
          // console.log(location);
          // console.log(forecastData);
          // console.log("Error", error);
          // console.log("Data", data);
        });
      }
    );
  }

  // console.log(req.query);
  // console.log(req.query.address);
  // res.send({
  //   address: req.query.address,
  // });
});

app.get("/getweather", (req, res) => {
  res.send({
    forecast: "It is Cold",
    location: "Lahore",
  });
});

app.get("/getweather/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Qalab Hussnain Shah",
    errorMessage: "get weather article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Qalab Hussnain Shah",
    errorMessage: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
