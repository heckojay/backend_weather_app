const express = require("express");
const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

const axios = require("axios");
app.get("/weather", (req, res) => {
    const city = req.query.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b660f3402c54cb9a9c48f89c35249e5c&units=metric`;
    axios
    .get(url)
    .then((response) => {
    const weatherData = {
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
    };
    res.json(weatherData);
    })
    .catch((error) => {
    res.status(500).json({ error: "An error occurred" });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});