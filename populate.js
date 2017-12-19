const mongoose = require('mongoose')
const axios = require('axios')
const moment = require('moment')

const keys = require('./config/keys')
require('./models/BTC')
require('./models/ETH')

const BTC = mongoose.model('BTC')
const ETH = mongoose.model('ETH')

var today = moment().subtract(1, "days")
var todaysDate  = today.format('YYYY-MM-DD')

mongoose.connect(keys.mongoURI)

// POPULATE DATABASE - BTC

axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=' + '2010-07-17' + '&end=' + todaysDate)
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
    .catch((err) => {
        console.log("Error")
})

// POPULATE DATABASE - ETHER

var etherPrices = require('./python/ether.json');

Object.entries(etherPrices).forEach(([key, val]) => {
    var date = moment.unix(key).format("YYYY-MM-DD")
    ETH.findOne({date: date}).then((existingKey) => {
        if (existingKey){
            // Do nothing, key exists
        }
        else {
            new ETH({
                date: date,
                price: val
            }).save()
        }
    })
})
