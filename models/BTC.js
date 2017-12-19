const mongoose = require('mongoose')
const { Schema } = mongoose

const btcSchema = new Schema({
    date: String,
    price: Number
})

mongoose.model('BTC', btcSchema)
