/*
- This script downloads historic price data for top 5 cryptos and dumps to the mLab database
- This data is small in size, so we can simply run the script every midnight to update the previous day's price
*/

const mongoose = require('mongoose')
const axios = require('axios')
const moment = require('moment')

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

// BTC (Bitcoin)
// Starting: 13-04-12

axios.get('https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=alltime&format=json')
    .then((res) => {
        var data = res.data
        data.forEach((obj) => {
            var key = moment(obj.time).format('DD-MM-YY')
            var val = obj.average
            BTC.findOne({date: key}).then((existingKey) => {
                if (!existingKey){
                    new BTC({
                        date: key,
                        price: val
                    }).save()
                }
            })
        })
    })
    .catch((err) => console.log(err))

// ETH (Ethereum)
// Starting: 07-04-16

axios.get('https://apiv2.bitcoinaverage.com/indices/global/history/ETHUSD?period=alltime&format=json')
    .then((res) => {
        var data = res.data
        data.forEach((obj) => {
            var key = moment(obj.time).format('DD-MM-YY')
            var val = obj.average
            ETH.findOne({date: key}).then((existingKey) => {
                if (!existingKey){
                    new ETH({
                        date: key,
                        price: val
                    }).save()
                }
            })
        })
    })
    .catch((err) => console.log(err))

// LTC (Litecoin)
// Starting: 07-04-16

axios.get('https://apiv2.bitcoinaverage.com/indices/global/history/LTCUSD?period=alltime&format=json')
    .then((res) => {
        var data = res.data
        data.forEach((obj) => {
            var key = moment(obj.time).format('DD-MM-YY')
            var val = obj.average
            LTC.findOne({date: key}).then((existingKey) => {
                if (!existingKey){
                    new LTC({
                        date: key,
                        price: val
                    }).save()
                }
            })
        })
    })
    .catch((err) => console.log(err))

// XRP (Ripple)
// Starting: 26-04-17

axios.get('https://apiv2.bitcoinaverage.com/indices/global/history/XRPUSD?period=alltime&format=json')
    .then((res) => {
        var data = res.data
        data.forEach((obj) => {
            var key = moment(obj.time).format('DD-MM-YY')
            var val = obj.average
            XRP.findOne({date: key}).then((existingKey) => {
                if (!existingKey){
                    new XRP({
                        date: key,
                        price: val
                    }).save()
                }
            })
        })
    })
    .catch((err) => console.log(err))

// BCH (Bitcoin Cash)
// Starting: 03-08-17

axios.get('https://apiv2.bitcoinaverage.com/indices/global/history/BCHUSD?period=alltime&format=json')
    .then((res) => {
        var data = res.data
        data.forEach((obj) => {
            var key = moment(obj.time).format('DD-MM-YY')
            var val = obj.average
            BCH.findOne({date: key}).then((existingKey) => {
                if (!existingKey){
                    new BCH({
                        date: key,
                        price: val
                    }).save()
                }
            })
        })
    })
    .catch((err) => console.log(err))
