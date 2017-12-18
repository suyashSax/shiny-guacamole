const mongoose = require('mongoose')
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const schedule = require('node-schedule')

const keys = require('./config/keys')
require('./model')
const Price = mongoose.model('Prices')

mongoose.connect(keys.mongoURI)
const app = express()

/*
GET: BTC PRICE
INPUT: YYYY-MM-DD
*/

app.use(bodyParser.json())
app.use(express.static(__dirname));

app.get('/btc/:date', (req, res) => {
    var date = req.params.date
    Price.findOne({date: date}).then((obj) => {
        res.send(obj)
    }, (err) => {
        res.status(400).send(err)
    })
})

/*
GET: ALL BTC HISTORY
This should be refactored to return an object of records key'd by date...
*/

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/btc/', (req, res) => {
    Price.find({}).then((objects) => {
        res.send(objects)
    }, (err) => {
        res.status(400).send(err)
    })
})

/*
UPDATE DATA STORE EVERY MIDNIGHT
*/
var today = moment().subtract(1, "days").format('YYYY-MM-DD')

schedule.scheduleJob('0 0 * * *', () => {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=' + '2017-12-16' + '&end=' + today)
        .then((result) => {
            var obj = result.data.bpi
            Object.entries(obj).forEach(([key, val]) => {
                Price.findOne({date: key}).then((existingKey) => {
                    if (existingKey){
                        // Do nothing, key exists
                    }
                    else {
                        new Price({
                            date: key,
                            btc: val
                        }).save()
                    }
                })
            })
        })
        .catch((err) => {
            console.log("Error")
    })
})

/* POPULATE DATABASE

axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=' + '2010-07-17' + '&end=' + '2017-12-16')
    .then((result) => {
        var obj = result.data.bpi
        Object.entries(obj).forEach(([key, val]) => {
            Price.findOne({date: key}).then((existingKey) => {
                if (existingKey){
                    // Do nothing, key exists
                }
                else {
                    new Price({
                        date: key,
                        btc: val
                    }).save()
                }
            })
        })
    })
    .catch((err) => {
        console.log("Error")
})

*/

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Started server on port", PORT))
module.exports = {app}
