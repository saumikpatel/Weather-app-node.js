const request = require('request');


const forecast =(latitude, longitude, callback)=>{
     const url='https://api.openweathermap.org//data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=YOURAPIKEY&units=metric';
     console.log(url);

 request({url, json:true},(error, {body})=>{

    
    if (error) {
        callback('unable to connect to weather service', undefined)
    }else if(body.error) {
        callback('unable to find location', undefined)
    }else {
        callback(undefined,'It is currently '+ body.weather[0].description+' And, current temperature is '+body.main.temp+ ' degrees')

    }

 });

}

module.exports=forecast;