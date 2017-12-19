const mongoose = require('mongoose')
const { Schema } = mongoose

const ethSchema = new Schema({
    date: String,
    price: Number
})

mongoose.model('ETH', ethSchema)
