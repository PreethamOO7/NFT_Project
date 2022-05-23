const mongoose = require('mongoose')

const NFTSchema = new mongoose.Schema({
    email : String
})

module.exports = mongoose.model('NFT',NFTSchema)