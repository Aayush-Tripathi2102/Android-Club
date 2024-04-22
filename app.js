const express = require("express")
const bodyParser = require("body-parser");
const https = require("https");
require("dotenv").config()

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Public"));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/Index.html");
});

app.post('/', function(req, res){

    // res.sendFile(__dirname + "/weather.html");
    const apiKey = process.env.secretkey;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Chennai,india&appid="+apiKey;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp

            const weatherDescription = weatherData.weather[0].description;
            const temperature = weatherData.main.temp-273;
            const feelsLike = weatherData.main.feels_like-273;
            const humidity = weatherData.main.humidity;
            
            const weatherHTML = `
            <html>
            <head>
                <link rel="stylesheet" href="/css/style.css">
                
            </head>
            <body>
                <nav class="navbar">
                    <div class="navbar-drawer">
                        <img src="/css/android_club_vitc_logo.jpeg" alt="kdf" class="drawer-photo">
                        <p class="drawer-name1">Android club</p>
                    </div>
                    <div class="navbar-drawer">
                        <img src="/css/myPhoto.png" alt="kdf" class="drawer-photo">
                        <p class="drawer-name">Aayush Tripathi</p>
                    </div>
                </nav>
                <main class="main-content">
                    <section class="weather-section">
                        <h1>Current Weather</h1>
                        <div id="weather-data">
                            <p>Location: Chennai</p>
                            <p>Weather: ${weatherDescription}</p>
                            <p>Temperature: ${temperature}°C</p>
                            <p>Feels Like: ${feelsLike}°C</p>
                            <p>Humidity: ${humidity}%</p>
                        </div>
                    </section>
                </main>
            </body>
            </html>
            `;
            res.send(weatherHTML);
            console.log(temp);
       })
    });
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});
