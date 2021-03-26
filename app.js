
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
  const query = req.body.cityName
  url ="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=70b41008b2fde9797b2a181101feb386&units=metric"
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon
      const imageurl =   "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.write("<h1>The temparature is " + temp + " degrees Centigrade.</h1>")
      res.write("<p>The weather description is " + description + "<p>")
      res.write("<img src="+ imageurl +">");
      res.send();
    })
  })
})


app.listen(8888, function(){
  console.log("Server started on server 8888");
})
