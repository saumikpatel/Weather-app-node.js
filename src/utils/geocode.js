const request = require('request');

const geocode=(address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2F1bWlrMzMiLCJhIjoiY2tiZHR1MnU5MGY2ZTJ5bXVtajJ1eDV3ayJ9.WvBWXZmndJERYZod4FY6ig&limit=1';

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location service',undefined)

        }else if(body.features.length === 0){
            callback('unable to find location. please try another search', undefined)
           

        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name

            })
            

    }





    });



}


module.exports=geocode