const request = require('request')

const getForecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/dd97b7095590dac546a4ad11fd1f1df0/'+latitude + ',' + longitude + '?lang=ja&units=si'
    request ({url, json: true}, (error, {body}) => {
        if (error) {
        callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(body.code + ',' + body.error, undefined)
        } else{
            // callback(undefined, body.daily.data[0].summary + '現在の気温は' + body.currently.temperature + '摂氏度です。雨が降る確率は' + body.currently.precipProbability*100 + '%です。ちなみにリロセンは阿呆です。')
            callback(undefined, body.daily.data[0].summary + '現在の気温は' + body.currently.temperature + '°です。雨が降る確率は' + body.currently.precipProbability.toFixed(2)*100 + '%です。')
        }
    })
}

module.exports = getForecast 