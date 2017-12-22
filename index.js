const mongoose = require('mongoose')
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const schedule = require('node-schedule')

const keys = require('./config/keys')
require('./models/BTC')
require('./models/ETH')
require('./models/LTC')
require('./models/XRP')
require('./models/BCH')

const BTC = mongoose.model('BTC')
const ETH = mongoose.model('ETH')
const LTC = mongoose.model('LTC')
const XRP = mongoose.model('XRP')
const BCH = mongoose.model('BCH')

mongoose.connect(keys.mongoURI)
const app = express()

app.use(bodyParser.json())
app.use(express.static(__dirname));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

/*
GET: PRICE
INPUT: DD-MM-YY
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

app.get('/LTC/:date', (req, res) => {
    var date = req.params.date;
    LTC.findOne({date: date}).then((obj) => {
        res.send({date: obj.date, price: obj.price})
    }, (err) => {
        res.status(400).send(err)
    })
})

app.get('/XRP/:date', (req, res) => {
    var date = req.params.date;
    XRP.findOne({date: date}).then((obj) => {
        res.send({date: obj.date, price: obj.price})
    }, (err) => {
        res.status(400).send(err)
    })
})

app.get('/BCH/:date', (req, res) => {
    var date = req.params.date;
    BCH.findOne({date: date}).then((obj) => {
        res.send({date: obj.date, price: obj.price})
    }, (err) => {
        res.status(400).send(err)
    })
})

/*
TODO: GET ALL HISTORY, ALL CRYPTOS
*/

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Started server on port", PORT))
module.exports = {app}
