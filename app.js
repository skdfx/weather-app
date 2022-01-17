const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req,res){
  console.log("req.body.cityName");
  const query = "req.body.cityName";
  const apiKey = "e72ca729af228beabd5d20e3b7749713";
  const unit = "metric"
  const url = "https://api.openweathermap.org\data2.5/weather?q=London&appid=e72ca729af228bcabd5d20e3b7749713&units=metric"
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn" + icon +"@2x.png";
      res.write("<p>The weather is currently" + weatherDescription + "<P>");
      res.write("<h1> The temperature in london is" + temp +"degrees Celcius.</h1>");
      res.write("img src=" + imageURL + ">");
      res.send()
    })
  })

})








app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
