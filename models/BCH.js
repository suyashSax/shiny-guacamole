const mongoose = require('mongoose')
const { Schema } = mongoose

const bchSchema = new Schema({
    date: String,
    price: Number
})

mongoose.model('BCH', bchSchema)
