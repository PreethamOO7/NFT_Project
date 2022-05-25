const mongoose = require('mongoose')

const NFTSchema = new mongoose.Schema({
    email : String,
    public_key : String,
    OTP : String,
    NFTdetails: {
        tokenId: Number,
        tokenURI: String,
        imageurl: String,
        name: String,
        attributes: Array
    },
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