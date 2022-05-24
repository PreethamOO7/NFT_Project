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
    const data = new NFT_DATA({
        email : req.body.email
    })
    try{
       const a1 = await data.save()
        res.json(a1)
    }catch(err){
        res.send('Error' + err)
    }
})

module.exports = router