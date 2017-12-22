const mongoose = require('mongoose')
const { Schema } = mongoose

const xrpSchema = new Schema({
    date: String,
    price: Number
})

mongoose.model('XRP', xrpSchema)
