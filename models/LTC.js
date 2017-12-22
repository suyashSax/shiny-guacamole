const mongoose = require('mongoose')
const { Schema } = mongoose

const ltcSchema = new Schema({
    date: String,
    price: Number
})

mongoose.model('LTC', ltcSchema)
