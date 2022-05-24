const mongoose = require('mongoose')

const NFTSchema = new mongoose.Schema({
    email : String,
    public_key : String,
    OTP : String,
    Delivery_address: {
        Name : String,
        address1: String,
        address2: String,
        City: String,
        Country: String,
        ZipCode: Number,
        Phone_Number: Number
    }
})

module.exports = mongoose.model('NFT',NFTSchema)