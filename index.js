const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const axios = require('axios')

require('./model')
const Price = mongoose.model('Prices')

mongoose.connect(keys.mongoURI)
const app = express()


/* POPULATE DATABASE

axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=' + '2010-07-17' + '&end=' + '2017-12-16')
    .then((result) => {
        var obj = result.data.bpi
        Object.entries(obj).forEach(([key, val]) => {
            Price.findOne({date: key}).then((existingKey) => {
                if (existingKey){

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
app.listen(PORT)
console.log("Started server on port", PORT)
