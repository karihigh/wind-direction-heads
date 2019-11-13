const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '16e0d56dd6237ab50c4259216d9c0022';

let dir = ["north", "east", "south", "west"];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, weatherImg: "", error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, weatherImg: "", error: 'That city is not in the OpenWeather API :('});
    } else {
      let weather = JSON.parse(body)
      if(weather.wind === undefined){
        res.render('index', {weather: null, weatherImg: "", error: 'That city is not in the OpenWeather API :('});
      } else {
        let degrees = weather.wind.deg
        console.log(degrees)
        let weatherText;
        let windirect;
        if(degrees > 337.5 || degrees <= 22.5){
          windirect = 'North';

        } else if(degrees > 22.5 && degrees <= 67.5) {
          console.log("NE")
          windirect = 'Northeast';

        } else if(degrees > 67.5 && degrees <= 112.5) {
          console.log("E")
          windirect = 'East';

        } else if(degrees > 112.5 && degrees <= 157.5) {
          console.log("SE")
          windirect = 'Southeast';
           
        } else if(degrees > 157.5 && degrees <= 202.5) {
          console.log("S")
          windirect = 'South';

        } else if(degrees > 202.5 && degrees <= 247.5) {
          console.log("SW")
          windirect = 'Southwest';

        } else if(degrees > 247.5 && degrees <= 292.5) {
          console.log("W")
          windirect = 'West';

        } else if(degrees > 292.5 && degrees <= 337.5) {
          console.log("NW")
          windirect = 'Northwest';
        }
        weatherText = `In ${weather.name} the wind blows from the ` + windirect;
        weatherImg = 'assets/' + windirect.toLowerCase() + '.png';
        res.render('index', {weather: weatherText, weatherImg, error: null});
      }
    }
  });
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})