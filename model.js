const mongoose = require('mongoose')
const { Schema } = mongoose

const priceSchema = new Schema({
    date: String,
    btc: Number
})

mongoose.model('Prices', priceSchema)
