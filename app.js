
const path = require('path');
const express = require('express');
const hbs = require('hbs')
const utils = require('./utils/utils')

// Express Path configuration
const publicDirectory = path.join(__dirname, './public')
const viewPath = path.join(__dirname, './public/templates/views')
const partialsPath = path.join(__dirname, './public/templates/partials')

const port = process.env.PORT || 8000;
const app = express()

// Setting Handler bar Engine and setting view path and partials path
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// General configuration of the public directory
app.use(express.static(publicDirectory))



app.get('/', (req, res) => {
    res.render('index', {
        title: "Home Page",
        author: "Daniel Richards"
    })
})


app.get('/about', (req, res) => {
    const founders = ["Bill Gates","Steve Jobs","Elon Musk"]
    res.render('about', {
        title: 'An About Page',
        author: 'Travesy Media',
        founders: founders,
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({ err: 'Address Must be Provided'})
    }
    utils.geoCode(req.query.address, function (err, response) {
      if (err) {
        return res.send({ err : response.msg });
      }
      const [latitude, longitude] = response;
      utils.foreCast(latitude, longitude, function (err, response) {
        if (err) {
          return res.send({ err: response.msg });
        }
        res.send({ response });
      });
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'The Help file doesn\'t exists.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'The Page Not Found. 404'
    })
})

app.listen(port, () => console.log("Listening on Port : 8000"))