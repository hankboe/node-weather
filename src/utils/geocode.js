const request = require('request')

//use address to get geocode and then pass to get forecast
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFuazc3IiwiYSI6ImNqdGdzNzZyMTI3NHE0NG9iY3FxeHB2OGYifQ.D0L9uywrQUrTu2753D1ChQ&cachebuster=1553061496595&autocomplete=true&limit=1'
    request ({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to services!', undefined)
        } else if (!body) {
            callback('Not able to find the information. Pls change a search term.', undefined)
        } else if (body.features.length === 0) {
            callback('Not able to find the information. Pls change a search term.', undefined)
            
        }
        else{
            console.log('Successfully get Geo Info of ' + address + '. Now processing for weather forecast.')
            console.log(body.features[0].center)
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode