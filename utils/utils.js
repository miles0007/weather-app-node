
const request = require('request');


const geoCode = function(address, callback) {
    const forwardGeoUrl =
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWlsZXMtbW9yYWxlcyIsImEiOiJja2d6MHA2ejEwamo3MnNudnBqczEweG9kIn0.-JTqB-2ye0bqoEYUnLMt8g&limit=1`;

    request({ url: forwardGeoUrl, json: true }, function (err, response) {
      if (err) {
        callback(true, {msg: 'Unable to retive data check your connection.'})
      } else if (response.body.features.length <= 0) {

        callback(true, {msg: 'Unable to find Location. Try another one..'})
      } else {
        const { features } = response.body;
        const [foundPlace] = features;
        callback(false, foundPlace.center);
      }
    });
}


const foreCast = function(latitude, longitude, callback) {
    const WeatherStackurl = 
        `http://api.weatherstack.com/current?access_key=42c4541e4dceb408314677e73e6f18e1&query=${longitude},${latitude}`;

    request({ url: WeatherStackurl, json: true }, function (err, response) {
        if (err) {
            callback(true, {msg: "unable to find weather services"});
        } else if (response.body.error) {
            callback(true, {msg: "unable to find location"});
        } else {
        const current = response.body.current;
        const reportData = (
            `Your are in ${response.body.location.name}, ${response.body.location.region}. \n`
        );
        const detailedData = `Now here is ${current.weather_descriptions}. The tempreature is about ${current.temperature}C, and chances of raining is ${current.precip}% and it now its feels like ${current.feelslike}C`;
        callback(false, {reportData, detailedData})
        }
    });
}


module.exports = {
    geoCode: geoCode,
    foreCast: foreCast,
}