const express = require('express')
const NFT_DATA = require('../Models/NFT')
const router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const data = await NFT_DATA.find({})
        res.json(data)
    }catch(err){
        res.send('Error' + err)
    }
})
router.post('/',async(req,res)=>{
    try{
        const data = await NFT_DATA.find({})
        const doc = {email: "preethamgade11@gmail.com"}
        const result = await NFT_DATA.insertOne(doc)
        res.json({result,data})
    }catch(err){
        res.send('Error' + err)
    }
})

module.exports = router