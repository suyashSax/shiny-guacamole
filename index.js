const mongoose = require('mongoose')
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const schedule = require('node-schedule')

const keys = require('./config/keys')
require('./models/BTC')
require('./models/ETH')

const BTC = mongoose.model('BTC')
const ETH = mongoose.model('ETH')

mongoose.connect(keys.mongoURI)
const app = express()

var today = moment().subtract(1, "days")
var date  = today.format('YYYY-MM-DD')
var epoch = today.unix()

app.use(bodyParser.json())
app.use(express.static(__dirname));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

/*
GET: PRICE
INPUT: YYYY-MM-DD
*/

app.get('/BTC/:date', (req, res) => {
    var date = req.params.date;
    BTC.findOne({date: date}).then((obj) => {
        res.send({date: obj.date, price: obj.price})
    }, (err) => {
        res.status(400).send(err)
    })
})

app.get('/ETH/:date', (req, res) => {
    var date = req.params.date;
    ETH.findOne({date: date}).then((obj) => {
        res.send({date: obj.date, price: obj.price})
    }, (err) => {
        res.status(400).send(err)
    })
})

// UPDATE DATA STORE EVERY MIDNIGHT

schedule.scheduleJob('0 0 * * *', () => {
    // BTC
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=' + '2017-12-18' + '&end=' + today)
        .then((result) => {
            var obj = result.data.bpi
            Object.entries(obj).forEach(([key, val]) => {
                BTC.findOne({date: key}).then((existingKey) => {
                    if (existingKey){
                        // Do nothing, key exists
                    }
                    else {
                        new BTC({
                            date: key,
                            price: val
                        }).save()
                    }
                })
            })
        })
        .catch((err) => console.log("Error"))
})

/*
GET: ALL HISTORY
This should be refactored to return an object of records key'd by date...
*/

app.get('/BTC/', (req, res) => {
    BTC.find({}).then((objects) => {
        res.send(objects)
    }, (err) => {
        res.status(400).send(err)
    })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Started server on port", PORT))
module.exports = {app}
