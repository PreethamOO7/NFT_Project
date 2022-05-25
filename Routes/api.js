const express = require('express')
const NFT_DATA = require('../Models/NFT')
const router = express.Router()
const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator')
const request = require('request')

router.get('/',async(req,res)=>{
    try{
        const data = await NFT_DATA.find({})
        res.json(data)
    }catch(err){
        res.send('Error' + err)
    }
})
router.post('/postdata',async(req,res)=>{
    const data = new NFT_DATA({
        email : req.body.email,
        public_key : req.body.public_key
    })
    try{
       const a1 = await data.save()
        res.json(a1)
    }catch(err){
        res.status(400).send('Error' + err)
    }
})

router.post('/mint',async(req,res)=>{
    try{
        const email = req.body.email
        const public_key = req.body.public_key
        const data = await NFT_DATA.find({"public_key":public_key})
        if(data.length >= 1){
            res.status(400).send('public key already exists')
        }else{
            const dash = new NFT_DATA({
                email : req.body.email,
                public_key : req.body.public_key
            })
            const transporter = nodemailer.createTransport({
                service : "hotmail",
                auth:{
                    user : "preethamgade11@outlook.com",
                    pass: "@Fiff1998"
                }
            })
            const options = {
                from : "preethamgade11@outlook.com",
                to : email,
                subject : "Token Minted",
                text: "The Token has been minted under the address " +  public_key
            }
            transporter.sendMail(options, function(err,info){
                if(err){
                    console.log(err)
                    return
                }
                console.log("sent:" + info.response)
            })
            const a1 = await dash.save()
            res.status(200).json(dash)
        }
    }catch(err){
        res.status(400).send('Error' + err)
    }
})

router.post('/generateotp',async(req,res)=>{
    try{
        const email = req.body.email
        const public_key = req.body.public_key
        const data = await NFT_DATA.find({"public_key":public_key})
        const otp = otpGenerator.generate(6, { digits:true,upperCaseAlphabets: true, specialChars: false, lowerCaseAlphabets: false })
        const transporter = nodemailer.createTransport({
            service : "hotmail",
            auth:{
                user : "preethamgade11@outlook.com",
                pass: "@Fiff1998"
            }
        })
        const options = {
            from : "preethamgade11@outlook.com",
            to : email,
            subject : "OTP",
            text: "The OTP generated is " +  otp
        }
        transporter.sendMail(options, function(err,info){
            if(err){
                console.log(err)
                return
            }
            console.log("sent:" + info.response)
        })
        data[0].OTP = otp
        data[0].save()
        res.json({otp,data})
    }catch(err){
        res.status(400).send('Error' + err)
    }
})

router.post('/verifyOTP',async(req,res)=>{
    try{
        const email = req.body.email
        const public_key = req.body.public_key
        const OTP = req.body.OTP
        const data = await NFT_DATA.find({"public_key":public_key})
        const original_otp = data[0].OTP
        if(OTP != original_otp){
            res.status(400).send('Wrong OTP')
        }else{
            res.status(200).send('Verification Successful')
        }
    }catch(err){
        res.status(400).send('Error' + err)
    }
})

// router.post('/DeliveryAddress',async(req,res)=>{
//     try{
//         const email = req.body.email
//         const public_key = req.body.public_key
//         const Delivery_address = req.body.Delivery_address
//         const data = await NFT_DATA.find({"public_key":public_key})
//         data[0].Delivery_address = Delivery_address
//         data[0].save()
//         res.status(200).send(data)
//     }catch(err){
//         res.status(400).send('Error' + err)
//     }
// })

router.post('/RedeemMail',async(req,res)=>{
    try{
        const email = req.body.email
        const public_key = req.body.public_key
        const Delivery_address = req.body.Delivery_address
        const data = await NFT_DATA.find({"public_key":public_key})
        data[0].Delivery_address = Delivery_address
        data[0].save()
        const transporter = nodemailer.createTransport({
            service : "hotmail",
            auth:{
                user : "preethamgade11@outlook.com",
                pass: "@Fiff1998"
            }
        })
        const options = {
            from : "preethamgade11@outlook.com",
            to : email,
            subject : "Item Redeemed",
            text: "The item has been redeemed by the address " +  public_key
        }
        transporter.sendMail(options, function(err,info){
            if(err){
                console.log(err)
                return
            }
            console.log("sent:" + info.response)
        })
        res.status(200).send('Mail sent')
    }catch(err){
        res.status(400).send('Error' + err)
    }
})

router.post('/savenftdetails',async(req,res)=>{
    try{
        const tokenId = req.body.tokenId
        const public_key = req.body.public_key
        const data = await NFT_DATA.find({"public_key":public_key})
        var url = "https://api.coolcatsnft.com/cat/" + tokenId
        data[0].NFTdetails.tokenId = tokenId
        data[0].NFTdetails.tokenURI = url
        request(url, { json: true }, (err, ans, body) => {
            if (err) { return console.log(err); }
            data[0].NFTdetails.imageurl = body.image
            data[0].NFTdetails.name = body.name
            data[0].NFTdetails.attributes = body.attributes
            data[0].save()
        })
        res.status(200).send('ok')
    }catch(err){
        res.status(400).send('Error' + err)
    }
})
module.exports = router