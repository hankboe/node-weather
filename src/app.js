const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const getForecast = require('./utils/getForecast')

const app = express()

// Define paths for Express
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // set the view engine
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static dir to serve
app.use(express.static(publicDir))

// 1st property: url , 2nd: function with req and res)
app.get('', (req, res) => {
    // send back msg to the requestor (browser or any other clients)
    // first for template, 2nd is data
    res.render('index', {
        title: 'Weather App',
        name: 'Hank'
    })
} )

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hank Bao'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'This is a help message.',
        title: 'help',
        name: 'Hank'
    })
})

app.get('/weather', (req, res) => {
    if (req.query.address) {

        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({error})
            }
            else {
                    getForecast(latitude, longitude, (error, forecastData) => {
                        if (error){
                            return res.send({error: error})
                        }
                        res.send({
                            address: req.query.address,
                            location: location,
                            forecast: forecastData 
                        })
                    })
            }
        })        
    } else {
        return res.send({
            error: 'You must provide an address.'
        })
    }


} )

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
       console.log(req.query.search)
        res.send({
            products: [req.query.search]
        })  
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Hank',
        error: 'Help Article Not Found'
    })
})

// the 404 match should be at the bottom because the express is doing the matching from up to down
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Hank',
        error: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


// way to send back json
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Hank',
//         age: 22
//     },{
//         name: 'Jully',
//         age: 21
//     }])
// } )
